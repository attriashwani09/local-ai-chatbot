import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { fetchDocuments, deleteDocument } from '../api/client.js';

const DocumentList = forwardRef(function DocumentList(props, ref) {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingFile, setDeletingFile] = useState(null);

  async function loadDocuments() {
    setIsLoading(true);
    try {
      const docs = await fetchDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to load documents:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useImperativeHandle(ref, () => ({
    refresh: loadDocuments
  }));

  useEffect(() => {
    loadDocuments();
  }, []);

  async function handleDelete(fileName) {
    setDeletingFile(fileName);
    try {
      await deleteDocument(fileName);
      await loadDocuments();
    } catch (error) {
      console.error('Failed to delete document:', error.message);
    } finally {
      setDeletingFile(null);
    }
  }

  if (documents.length === 0 && !isLoading) {
    return <div className="document-list-empty">No documents uploaded yet</div>;
  }

  return (
    <div className="document-list">
      {documents.map((doc) => (
        <div key={doc.fileName} className="document-item">
          <span className="document-name">📄 {doc.fileName}</span>
          <span className="document-chunks">{doc.chunkCount} chunks</span>
          <button
            className="document-delete-btn"
            onClick={() => handleDelete(doc.fileName)}
            disabled={deletingFile === doc.fileName}
          >
            {deletingFile === doc.fileName ? '...' : '🗑️'}
          </button>
        </div>
      ))}
    </div>
  );
});

export default DocumentList;