import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/patient/dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Patient Dashboard
            </Link>
          </li>
          <li>
            <Link to="/patient/appointments" className="block p-2 hover:bg-gray-700 rounded">
              Appointments
            </Link>
          </li>
          <li>
            <Link to="/patient/messages" className="block p-2 hover:bg-gray-700 rounded">
              Messages
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block p-2 hover:bg-gray-700 rounded">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/patient/chabot" className="block p-2 hover:bg-gray-700 rounded">
              Chatbot
            </Link>
          </li>
          <li>
            <Link to="/patient/maps" className="block p-2 hover:bg-gray-700 rounded">
              Maps
            </Link>
          </li>
          <li>
            <Link to="/login" className="block p-2 hover:bg-gray-700 rounded">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="block p-2 hover:bg-gray-700 rounded">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;