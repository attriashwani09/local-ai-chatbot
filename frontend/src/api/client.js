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
  return data.reply;
}