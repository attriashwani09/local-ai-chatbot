function MessageBubble({ role, text }) {
  const isUser = role === 'user';

  return (
    <div className={`message-row ${isUser ? 'user-row' : 'bot-row'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;