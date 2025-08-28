import { Link } from "react-router-dom";
import "./chatList.css";

const ChatList = () => {
  // Dummy data for UI development - single chat with history
  const dummyChats = [
    { 
      _id: "sample-chat-1", 
      title: "Content Creation Help",
      lastMessage: "Can you help me draft an email?"
    }
  ];

  // Generate a unique chat ID for new chats
  const generateNewChatId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `chat_${timestamp}_${random}`;
  };

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Check Connection</Link>
      <Link to="/dashboard/chats/new">Start a New Chat</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {dummyChats.map((chat) => (
          <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
            <div className="chat-item">
              <div className="chat-title">{chat.title}</div>
              <div className="chat-preview">{chat.lastMessage}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
