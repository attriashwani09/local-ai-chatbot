import { useState } from 'react';
import { sendMessage } from '../api/client.js';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(userText) {
    if (!userText || userText.trim() === '') return;

    const userMessage = { role: 'user', text: userText };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const replyText = await sendMessage(userText);
      const botMessage = { role: 'bot', text: replyText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { role: 'bot', text: 'Error: could not reach the server.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return { messages, isLoading, handleSend };
}