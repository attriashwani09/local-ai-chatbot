import { useState, useRef } from 'react';
import { uploadFile } from '../api/client.js';

function FileUploader({ onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef(null);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMessage('');

    try {
      const result = await uploadFile(file);
      setStatusMessage(`✅ Uploaded: ${result.fileName} (${result.totalChunks} chunks)`);
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
    } catch (error) {
      setStatusMessage(`❌ ${error.message}`);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  }

  function triggerFileSelect() {
    fileInputRef.current?.click();
  }

  return (
    <div className="file-uploader">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt,.csv,.pdf,.xlsx"
        style={{ display: 'none' }}
      />
      <button
        type="button"
        className="upload-button"
        onClick={triggerFileSelect}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : '📎 Upload File'}
      </button>
      {statusMessage && <span className="upload-status">{statusMessage}</span>}
    </div>
  );
}

export default FileUploader;