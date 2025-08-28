import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { useState, useEffect } from "react";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  // Check if this is a new chat with an initial message
  const [chatHistory, setChatHistory] = useState([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isProcessingInitial, setIsProcessingInitial] = useState(false);

  useEffect(() => {
    console.log("ChatPage: Initializing with chatId:", chatId);
    
    // Check if this is a new chat route
    if (chatId === "new") {
      console.log("ChatPage: Setting up new chat");
      setIsNewChat(true);
      setIsProcessingInitial(false);
      setChatHistory([
        {
          role: "assistant",
          parts: [{ text: "Hello! I'm Pheydrus-GPT. How can I help you today?" }],
          img: null
        }
      ]);
      return;
    }
    
    // Check if there's an initial message for this chat
    const initialMessage = sessionStorage.getItem(`chat_${chatId}_initial`);
    console.log("ChatPage: Initial message found:", initialMessage ? `"${initialMessage}"` : "None");
    
    if (initialMessage) {
      // This is a new chat with an initial message
      console.log("ChatPage: Setting up new chat with initial message");
      setIsNewChat(true);
      setIsProcessingInitial(true); // Show loading state
      setChatHistory([
        {
          role: "user",
          parts: [{ text: initialMessage }],
          img: null
        }
      ]);
      
      // Clear the initial message from sessionStorage
      sessionStorage.removeItem(`chat_${chatId}_initial`);
      console.log("ChatPage: Cleared initial message from sessionStorage");
    } else if (chatId === "sample-chat-1") {
      // This is the sample chat with dummy history
      console.log("ChatPage: Setting up sample chat with dummy history");
      setIsNewChat(false);
      setIsProcessingInitial(false);
      setChatHistory([
        {
          role: "user",
          parts: [{ text: "Can you help me draft an email to our clients about the new product launch?" }],
          img: null
        },
        {
          role: "assistant",
          parts: [{ text: "Absolutely! I'd be happy to help you draft an email for the product launch. Let me create a professional, engaging email that highlights the key benefits and creates excitement. Here's a draft:\n\n**Subject: Exciting News: Introducing Our Latest Innovation**\n\nDear Valued Clients,\n\nI hope this email finds you well. I'm thrilled to share some exciting news with you today.\n\nWe're launching our newest product that we believe will revolutionize how you work. This innovation addresses the key challenges you've shared with us and delivers solutions that exceed expectations.\n\n**Key Features:**\n• Enhanced performance and efficiency\n• User-friendly interface\n• Advanced security measures\n• Seamless integration with existing systems\n\nWould you like me to customize this further or help with any other content creation needs?" }],
          img: null
        }
      ]);
    } else {
      // This is an existing chat or no initial message
      console.log("ChatPage: Setting up existing chat with default greeting");
      setIsNewChat(false);
      setIsProcessingInitial(false);
      setChatHistory([
        {
          role: "assistant",
          parts: [{ text: "How can I help you today?" }],
          img: null
        }
      ]);
    }
    
    console.log("ChatPage: Initialization complete. isNewChat:", isNewChat);
  }, [chatId]);

  // Function to add new messages to chat
  const addMessage = (role, text) => {
    console.log("ChatPage: Adding new message:", { role, text: text.substring(0, 50) + (text.length > 50 ? "..." : "") });
    const newMessage = {
      role,
      parts: [{ text }],
      img: null
    };
    setChatHistory(prev => [...prev, newMessage]);
    console.log("ChatPage: Message added to chat history");
  };

  // Function to handle initial message completion
  const handleInitialMessageComplete = () => {
    console.log("ChatPage: Initial message processing completed");
    setIsProcessingInitial(false);
  };

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {chatHistory.map((message, i) => (
            <div key={i}>
              {message.img && (
                <img
                  src={message.img}
                  alt="Chat attachment"
                  height="300"
                  width="400"
                  style={{ height: "300px", width: "400px" }}
                />
              )}
              <div
                className={
                  message.role === "user" ? "message user" : "message"
                }
              >
                <Markdown>{message.parts[0].text}</Markdown>
              </div>
            </div>
          ))}

          {/* Show loading indicator for initial message processing */}
          {isProcessingInitial && (
            <div className="message">
              <div style={{ fontStyle: 'italic', color: '#666' }}>
                🚀 Processing your initial message...
              </div>
            </div>
          )}

          <NewPrompt 
            data={{ _id: chatId, history: chatHistory, isNewChat }} 
            onAddMessage={addMessage}
            onInitialMessageComplete={handleInitialMessageComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
