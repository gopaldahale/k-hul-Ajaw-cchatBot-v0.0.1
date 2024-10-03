// src/Chatbot.js
import React, { useState } from "react";
import OpenAI from 'openai';
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState(""); // User input
  const [messages, setMessages] = useState([]); // Message history

  // Handle user input submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Append user's message to the chat
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    // Call OpenAI API
    const response = await getOpenAIResponse(input);
    
    // Append OpenAI's response to the chat
    setMessages([...newMessages, { text: response, sender: "bot" }]);
    setInput(""); // Clear input field
  };

  // Call OpenAI API
  const getOpenAIResponse = async (userInput) => {
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-4o", // Or "gpt-3.5-turbo" depending on your plan
        prompt: userInput,
        messages: [
            {"role": "user", "content": "write a haiku about ai"}
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].text.trim();
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "bot-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
