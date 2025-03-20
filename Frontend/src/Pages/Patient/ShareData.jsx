import React, { useState } from 'react';

const ShareData = () => {
  // Simulated list of doctors
  const [doctors] = useState([
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
    { id: 3, name: 'Dr. Emily Johnson' },
  ]);

  // State for selected doctor and shared data
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [sharedData, setSharedData] = useState({
    bloodGroup: false,
    medicalHistory: false,
    allergies: false,
    medications: false,
  });

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSharedData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect selected data
    const selectedFields = Object.keys(sharedData).filter((key) => sharedData[key]);

    if (!selectedDoctor || selectedFields.length === 0) {
      alert('Please select a doctor and at least one data field to share.');
      return;
    }

    // Simulate sharing data (replace with API call)
    console.log('Sharing data with:', selectedDoctor);
    console.log('Selected fields:', selectedFields);

    // Reset form
    setSelectedDoctor('');
    setSharedData({
      bloodGroup: false,
      medicalHistory: false,
      allergies: false,
      medications: false,
    });

    alert('Data shared successfully!');
  };

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Share Your Data with a Doctor</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-medium">Select Doctor</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Data Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Data to Share</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="bloodGroup"
                checked={sharedData.bloodGroup}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Blood Group</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="medicalHistory"
                checked={sharedData.medicalHistory}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Medical History</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="allergies"
                checked={sharedData.allergies}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Allergies</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="medications"
                checked={sharedData.medications}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Current Medications</span>
            </label>
          </div>
        </div>

        {/* Share Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Share Data
        </button>
      </form>
    </div>
  );
};

export default ShareData;