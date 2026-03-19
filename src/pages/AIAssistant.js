import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AI.css';

const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Hello! I am your AI assistant. How can I help you with patient data today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I'm analyzing the telemetry data for ICU-04...", sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div className="ai-container">
      <header className="ai-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h2>AI Assistant</h2>
      </header>

      <div className="chat-window glass-card">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            <div className="bubble">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask about patient status..." 
        />
        <button className="btn btn-primary" onClick={send}>Send</button>
      </div>
    </div>
  );
};

export default AIAssistant;
