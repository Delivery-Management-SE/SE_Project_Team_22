import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'some-websocket-hook'; // This is a placeholder for a real WebSocket hook

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useWebSocket('wss://your-websocket-server'); // Connect to your WebSocket server

  useEffect(() => {
    // Listen for messages from the WebSocket
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Send a message through the WebSocket
    const message = { user, text: newMessage, timestamp: new Date() };
    socket.send(JSON.stringify(message));

    setNewMessage(""); // Reset input after sending
  };

  return (
    <div className="chat-container p-4">
      <div className="messages overflow-y-auto h-96 mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user === user ? "self-end" : ""} mb-2`}>
            <div className="p-2 bg-blue-200 rounded-lg">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="message-input flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 rounded flex-grow"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
