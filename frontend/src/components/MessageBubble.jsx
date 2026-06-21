function MessageBubble({ role, text, sources }) {
  const isUser = role === 'user';
  const hasSources = sources && sources.length > 0;

  return (
    <div className={`message-row ${isUser ? 'user-row' : 'bot-row'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        {text}
        {hasSources && (
          <div className="message-sources">
            📄 Source: {sources.map((s) => `${s.fileName} (chunk ${s.chunkIndex + 1})`).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;