import React, { useState } from 'react';

const Chatbot = () => {
  // State for chat messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Simulated bot responses (replace with actual AI integration like Dialogflow or Microsoft Bot Framework)
  const getBotResponse = (message) => {
    const responses = {
      hello: "Hello! How can I assist you today?",
      appointment: "You can book an appointment by visiting the 'Appointments' page.",
      medication: "Please consult your doctor for specific medication advice.",
      default: "I'm sorry, I didn't understand that. Can you please rephrase?",
    };

    if (message.toLowerCase().includes('hello')) return responses.hello;
    if (message.toLowerCase().includes('appointment')) return responses.appointment;
    if (message.toLowerCase().includes('medication')) return responses.medication;
    return responses.default;
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add the user's message to the chat
    const userMessage = { sender: 'user', text: newMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate the bot's response after a short delay
    setTimeout(() => {
      const botMessage = { sender: 'bot', text: getBotResponse(newMessage) };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);

    // Clear the input field
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 text-center">
        <h2 className="text-lg font-semibold">Chat with Bot</h2>
        <p className="text-sm text-red-500">Warning: The bot's responses are not 100% accurate.</p>
      </header>

      {/* Chat Window */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Start chatting with the bot!</p>
        )}
      </div>

      {/* Message Input Box */}
      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chatbot;