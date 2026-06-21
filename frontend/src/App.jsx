import { useChat } from './hooks/useChat.js';
import ChatWindow from './components/ChatWindow.jsx';
import FileUploader from './components/FileUploader.jsx';
import './App.css';

function App() {
  const { messages, isLoading, handleSend } = useChat();

  function handleUploadSuccess(result) {
    console.log('File uploaded:', result);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Local AI Chatbot</h1>
        <p>Running fully offline with Llama 3</p>
        <FileUploader onUploadSuccess={handleUploadSuccess} />
      </header>

      <ChatWindow messages={messages} isLoading={isLoading} onSend={handleSend} />
    </div>
  );
}

export default App;
