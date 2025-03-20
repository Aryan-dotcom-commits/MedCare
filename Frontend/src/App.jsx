import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

// Patient Pages
import PatientDashboard from './Pages/Patient/Dashboard';
import PatientProfile from './Pages/Patient/Profile';
import PatientAppointments from './Pages/Patient/Appointment';
import PatientMessages from './Pages/Patient/Messages';
import Chatbot from './Pages/Patient/Chatbot';
import Maps from './Pages/Patient/Map';
import ShareData from './Pages/Patient/ShareData';
// Doctor Pages
import DoctorDashboard from './Pages/Doctor/Dashboard';
import DoctorPatientsList from './Pages/Doctor/PatientList';

import DoctorMessages from './Pages/Doctor/Messages';

// Auth Pages
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import ForgotPassword from './Pages/auth/ForgotPassword';
import NotFound from './Pages/NotFound';


function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <div className="p-4 overflow-y-auto">
            <Routes>
              {/* Patient Routes */}
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/profile" element={<PatientProfile />} />
              <Route path="/patient/appointments" element={<PatientAppointments />} />
              <Route path="/patient/messages" element={<PatientMessages />} />
              <Route path="patient/chabot" element={<Chatbot />} />
              <Route path="/patient/maps" element={<Maps />} />
              <Route path="/patient/share-data" element={<ShareData />}/>

              {/* Doctor Routes */}
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/patients" element={<DoctorPatientsList />} />
              <Route path="/doctor/messages" element={<DoctorMessages />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;