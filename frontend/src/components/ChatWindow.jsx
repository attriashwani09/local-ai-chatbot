import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble.jsx';

function ChatWindow({ messages, isLoading, onSend }) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function handleSubmit(e) {
    e.preventDefault();
    onSend(inputText);
    setInputText('');
  }

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="empty-state">Start a conversation below 👇</div>
        )}

        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} text={msg.text} sources={msg.sources} />
        ))}

        {isLoading && (
          <div className="message-row bot-row">
            <div className="message-bubble bot-bubble typing-indicator">
              Thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || inputText.trim() === ''}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;