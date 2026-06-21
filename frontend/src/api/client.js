const API_BASE_URL = 'http://localhost:5000/api';

export async function sendMessage(message) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error('Failed to get response from server');
  }

  const data = await response.json();
  return { reply: data.reply, sources: data.sources || [] };
}


export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Upload failed');
  }

  return await response.json();
} 


export async function fetchDocuments() {
  const response = await fetch(`${API_BASE_URL}/documents`);

  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }

  const data = await response.json();
  return data.documents;
}

export async function deleteDocument(fileName) {
  const response = await fetch(`${API_BASE_URL}/documents/${encodeURIComponent(fileName)}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete document');
  }

  return await response.json();
}