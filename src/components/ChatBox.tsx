"use client";

import { useEffect, useState } from "react";

interface ChatBoxProps {
  adId: string;
  userId: string;
  otherUserId: string;
}

export default function ChatBox({ adId, userId, otherUserId }: ChatBoxProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function loadChat() {
    const res = await fetch(`/api/chat?ad=${adId}&user=${userId}`);
    const data = await res.json();
    setMessages(data?.messages || []);
  }

  async function sendMessage() {
    if (!input) return;

    await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        ad: adId,
        sender: userId,
        receiver: otherUserId,
        message: input,
      }),
    });

    setInput("");
    loadChat();
  }

  useEffect(() => {
    loadChat();
  }, []);

  return (
    <div className="border rounded-lg p-3 h-80 flex flex-col">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-[70%] ${
              m.sender === userId
                ? "bg-blue-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {m.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          className="border p-2 flex-1 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
