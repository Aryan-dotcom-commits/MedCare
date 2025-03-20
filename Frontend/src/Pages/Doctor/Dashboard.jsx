import React, { useState } from 'react';

const Dashboard = () => {
  // Simulated data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      date: '2023-10-15',
      time: '10:00 AM',
      status: 'Scheduled',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2023-10-16',
      time: '02:30 PM',
      status: 'Scheduled',
    },
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      bloodGroup: 'A+',
      medicalHistory: 'No major illnesses.',
      lastVisit: '2023-10-10',
    },
    {
      id: 2,
      name: 'Jane Smith',
      bloodGroup: 'B+',
      medicalHistory: 'Asthma',
      lastVisit: '2023-10-05',
    },
  ]);

  const [quickStats, setQuickStats] = useState({
    totalPatients: 50,
    completedConsultations: 30,
    pendingAppointments: 5,
  });

  // State for toggling between view and edit modes for an appointment
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  // Temporary state for editing an appointment
  const [updatedAppointment, setUpdatedAppointment] = useState({
    date: '',
    time: '',
    status: '',
  });

  // Handle input changes for editing an appointment
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAppointment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle updating an appointment
  const handleUpdateAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, ...updatedAppointment }
          : appointment
      )
    );
    setEditingAppointmentId(null);
  };

  // Handle deleting an appointment
  const handleDeleteAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Doctor Dashboard</h2>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-md text-center">
          <p className="text-lg font-semibold">{quickStats.totalPatients}</p>
          <p className="text-sm text-gray-600">Total Patients</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md text-center">
          <p className="text-lg font-semibold">{quickStats.completedConsultations}</p>
          <p className="text-sm text-gray-600">Completed Consultations</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md text-center">
          <p className="text-lg font-semibold">{quickStats.pendingAppointments}</p>
          <p className="text-sm text-gray-600">Pending Appointments</p>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Patient Name</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="py-2 px-4">{appointment.patientName}</td>
                  <td className="py-2 px-4">
                    {editingAppointmentId === appointment.id ? (
                      <input
                        type="date"
                        name="date"
                        value={updatedAppointment.date}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      appointment.date
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingAppointmentId === appointment.id ? (
                      <input
                        type="time"
                        name="time"
                        value={updatedAppointment.time}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      appointment.time
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingAppointmentId === appointment.id ? (
                      <select
                        name="status"
                        value={updatedAppointment.status}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded ${
                          appointment.status === 'Scheduled'
                            ? 'bg-yellow-200 text-yellow-800'
                            : appointment.status === 'Completed'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    {editingAppointmentId === appointment.id ? (
                      <>
                        <button
                          onClick={() => handleUpdateAppointment(appointment.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingAppointmentId(null)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingAppointmentId(appointment.id);
                            setUpdatedAppointment({
                              date: appointment.date,
                              time: appointment.time,
                              status: appointment.status,
                            });
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No upcoming appointments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Patient List Section */}
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-4">Patient List</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Blood Group</th>
              <th className="py-2 px-4">Medical History</th>
              <th className="py-2 px-4">Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id} className="border-b">
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.bloodGroup}</td>
                  <td className="py-2 px-4">{patient.medicalHistory}</td>
                  <td className="py-2 px-4">{patient.lastVisit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;