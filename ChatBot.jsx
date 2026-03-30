import React, { useState } from 'react';
import axios from 'axios';

export default function ChatBot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askAI = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/ask', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer('Lỗi khi gọi AI');
    }
  }

  return (
    <div className="w-96 bg-white p-4 rounded shadow flex flex-col">
      <h2 className="font-bold mb-2">AI Assistant</h2>
      <textarea
        className="border p-2 rounded mb-2"
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="bg-green-500 text-white p-2 rounded mb-2" onClick={askAI}>Ask AI</button>
      <div className="flex-1 overflow-auto">{answer}</div>
    </div>
  );
}
