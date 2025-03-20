import React, { useState } from 'react';

const Messages = () => {
  // Simulated list of doctors
  const [doctors] = useState([
    { id: 1, name: 'Dr. John Doe', avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Dr. Jane Smith', avatar: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Dr. Emily Johnson', avatar: 'https://via.placeholder.com/40' },
  ]);

  // Selected doctor for chat
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Chat messages state (simulated)
  const [messages, setMessages] = useState([]);

  // Input field for new message
  const [newMessage, setNewMessage] = useState('');

  // Handle selecting a doctor
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    // Simulate loading previous messages (replace with API call in real implementation)
    setMessages([
      { sender: 'patient', text: 'Hello, I have a question about my medication.' },
      { sender: 'doctor', text: 'Sure, please let me know your concerns.' },
    ]);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add the new message to the chat
    const message = { sender: 'patient', text: newMessage };
    setMessages((prevMessages) => [...prevMessages, message]);

    // Simulate a doctor's reply after a short delay (replace with real-time backend logic)
    setTimeout(() => {
      const reply = { sender: 'doctor', text: 'Thank you for your message. Let me check and get back to you.' };
      setMessages((prevMessages) => [...prevMessages, reply]);
    }, 1000);

    // Clear the input field
    setNewMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Doctor List */}
      <aside className="w-80 bg-white border-r border-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4">Doctors</h3>
        <ul className="space-y-2">
          {doctors.map((doctor) => (
            <li
              key={doctor.id}
              onClick={() => handleSelectDoctor(doctor)}
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                selectedDoctor?.id === doctor.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              <img src={doctor.avatar} alt={`${doctor.name}'s avatar`} className="w-8 h-8 rounded-full" />
              <span>{doctor.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header - Selected Doctor */}
        <header className="bg-white border-b border-gray-200 p-4">
          {selectedDoctor ? (
            <div className="flex items-center space-x-2">
              <img
                src={selectedDoctor.avatar}
                alt={`${selectedDoctor.name}'s avatar`}
                className="w-10 h-10 rounded-full"
              />
              <h3 className="text-lg font-semibold">{selectedDoctor.name}</h3>
            </div>
          ) : (
            <p className="text-gray-600">Select a doctor to start chatting</p>
          )}
        </header>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {selectedDoctor ? (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === 'patient' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'patient'
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
            <p className="text-center text-gray-600">No conversation selected.</p>
          )}
        </div>

        {/* Message Input Box */}
        <footer className="bg-white border-t border-gray-200 p-4">
          {selectedDoctor && (
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
          )}
        </footer>
      </main>
    </div>
  );
};

export default Messages;