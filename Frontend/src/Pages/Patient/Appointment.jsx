import React, { useState } from 'react';

const Appointments = () => {
  // State for appointments list
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      date: '2023-10-15',
      time: '10:00 AM',
      status: 'Scheduled',
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      date: '2023-10-20',
      time: '02:30 PM',
      status: 'Completed',
    },
  ]);

  // State for new appointment form
  const [newAppointment, setNewAppointment] = useState({
    doctorName: '',
    date: '',
    time: '',
    status: 'Scheduled',
  });

  // State for toggling the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique ID for the new appointment
    const newId = appointments.length + 1;

    // Add the new appointment to the list
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      { ...newAppointment, id: newId },
    ]);

    // Reset the form and hide it
    setNewAppointment({
      doctorName: '',
      date: '',
      time: '',
      status: 'Scheduled',
    });
    setIsFormVisible(false);
  };

  // Delete an appointment
  const handleDelete = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="p-4">
      {/* Header and New Appointment Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {isFormVisible ? 'Cancel' : 'New Appointment'}
        </button>
      </div>

      {/* New Appointment Form */}
      {isFormVisible && (
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">New Appointment</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={newAppointment.doctorName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter doctor's name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Time</label>
              <input
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={newAppointment.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              type="submit"
              className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Add Appointment
            </button>
          </form>
        </div>
      )}

      {/* Appointments Table */}
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-4">Your Appointments</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Doctor Name</th>
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
                  <td className="py-2 px-4">{appointment.doctorName}</td>
                  <td className="py-2 px-4">{appointment.date}</td>
                  <td className="py-2 px-4">{appointment.time}</td>
                  <td className="py-2 px-4">
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
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;