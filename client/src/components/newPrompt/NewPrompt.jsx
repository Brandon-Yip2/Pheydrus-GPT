import { useRef, useState, useEffect } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";

const PROXY_URL = "https://plutofunctionapp-dyfvhpatbmc7dyg5.eastus2-01.azurewebsites.net/api/chat";

const NewPrompt = ({ data, onAddMessage, onInitialMessageComplete }) => {
  const endRef = useRef(null);
  const formRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [threadId, setThreadId] = useState(null);

  // Reset threadId for new chats to ensure fresh conversations
  useEffect(() => {
    if (data?.isNewChat) {
      console.log("NewPrompt: Resetting threadId for new chat");
      setThreadId(null);
      
      // Auto-send the initial message if this is a new chat
      if (data.history && data.history.length > 0) {
        const initialMessage = data.history[0];
        if (initialMessage.role === "user" && initialMessage.parts[0].text) {
          console.log("NewPrompt: Auto-sending initial message:", initialMessage.parts[0].text);
          // Small delay to ensure the component is fully mounted
          setTimeout(() => {
            console.log("NewPrompt: Timeout completed, sending message to proxy");
            sendMessageToProxy(initialMessage.parts[0].text, true); // true = isInitialMessage
          }, 100);
        }
      }
    } else {
      console.log("NewPrompt: Using existing threadId:", threadId);
    }
  }, [data?.isNewChat, data?.history, threadId]);

  const sendMessageToProxy = async (userMessage, isInitialMessage = false) => {
    try {
      console.log("NewPrompt: Starting to send message to proxy");
      console.log("NewPrompt: Message:", userMessage);
      console.log("NewPrompt: Thread ID:", threadId);
      console.log("NewPrompt: Proxy URL:", PROXY_URL);
      console.log("NewPrompt: Is Initial Message:", isInitialMessage);
      
      const resp = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, threadId }),
      });

      console.log("NewPrompt: Proxy response received:", resp.status, resp.statusText);

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const data = await resp.json();
      console.log("NewPrompt: Proxy response data:", data);

      if (data.messages?.data?.length > 0) {
        console.log("NewPrompt: Found messages in response, count:", data.messages.data.length);
        
        // Set threadId for continuous conversation
        if (!threadId) {
          const firstMsg = data.messages.data.find(m => m.thread_id);
          if (firstMsg) {
            console.log("NewPrompt: Setting new thread ID:", firstMsg.thread_id);
            setThreadId(firstMsg.thread_id);
          } else {
            console.log("NewPrompt: No thread_id found in response");
          }
        } else {
          console.log("NewPrompt: Continuing with existing thread ID:", threadId);
        }

        const assistantTexts = data.messages.data
          .filter(m => m.role === "assistant")
          .map(m =>
            m.content.map(c => c.text?.value || "").join("\n")
          );

        console.log("NewPrompt: Assistant responses found:", assistantTexts.length);

        // Add all assistant messages to the chat
        assistantTexts.forEach((text, index) => {
          if (text.trim()) {
            console.log(`NewPrompt: Adding assistant response ${index + 1}:`, text.substring(0, 50) + (text.length > 50 ? "..." : ""));
            onAddMessage("assistant", text);
          }
        });
      } else {
        console.warn("NewPrompt: No messages in proxy response:", data);
        onAddMessage("assistant", "No response from proxy server");
      }
    } catch (err) {
      console.error("NewPrompt: Error calling proxy:", err);
      
      // Provide more specific error messages
      let errorMessage = "Error connecting to proxy server";
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = "Network error - unable to reach proxy server";
      } else if (err.message.includes('HTTP error')) {
        errorMessage = `Server error: ${err.message}`;
      }
      
      console.log("NewPrompt: Displaying error message:", errorMessage);
      onAddMessage("assistant", errorMessage);
    } finally {
      console.log("NewPrompt: Message sending completed");
      setIsProcessing(false);
      
      // Notify parent component if this was the initial message
      if (isInitialMessage && onInitialMessageComplete) {
        console.log("NewPrompt: Notifying parent that initial message is complete");
        onInitialMessageComplete();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    
    console.log("NewPrompt: Form submitted with text:", text);
    
    // Add user message to chat
    console.log("NewPrompt: Adding user message to chat");
    onAddMessage("user", text);
    
    // Clear the input
    e.target.text.value = "";
    console.log("NewPrompt: Input cleared");
    
    // Set processing state
    console.log("NewPrompt: Setting processing state");
    setIsProcessing(true);
    
    // Send message to proxy server
    console.log("NewPrompt: Starting proxy communication");
    await sendMessageToProxy(text);
  };

  return (
    <>
      {/* ADD NEW CHAT */}
      {isProcessing && (
        <div className="message">
          <div style={{ fontStyle: 'italic', color: '#666' }}>
            Pheydrus-GPT is thinking...
          </div>
        </div>
      )}
      
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={() => {}} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button type="submit">
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
