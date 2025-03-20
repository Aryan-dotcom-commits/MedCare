import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null); // Initialize as null
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login'; // Redirect to login if no token
          return;
        }

        const response = await axios.get('http://localhost:5163/api/Auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return(
      <>
        <div>
          <p className="text-center text-gray-700">Please Login first</p>
          
        </div>
      </>
    ); 
    
    
    ;
  }

  // Handle input changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      // Send updated data to the backend
      await axios.put('http://localhost:5163/api/Auth/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsEditing(false); // Switch back to view mode after saving
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="p-4">
      {/* Header and Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile View Mode */}
      {!isEditing && (
        <div className="bg-white p-6 rounded shadow-md space-y-4">
          <div>
            <p className="font-medium">Name:</p>
            <p>{profileData.userName}</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>{profileData.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p>{profileData.phone || 'Not provided'}</p>
          </div>
          {profileData.role === 'Patient' && (
            <>
              <div>
                <p className="font-medium">Blood Group:</p>
                <p>{profileData.bloodGroup || 'Not provided'}</p>
              </div>
              <div>
                <p className="font-medium">Medical History:</p>
                <p>{profileData.medicalHistory || 'No major illnesses.'}</p>
              </div>
            </>
          )}
          {profileData.role === 'Doctor' && (
            <>
              <div>
                <p className="font-medium">Specialization:</p>
                <p>{profileData.specialization || 'Not provided'}</p>
              </div>
              <div>
                <p className="font-medium">Hospital Name:</p>
                <p>{profileData.hospitalName || 'Not provided'}</p>
              </div>
            </>
          )}
          <div>
            <p className="font-medium">Address:</p>
            <p>{profileData.address || 'Not provided'}</p>
          </div>
        </div>
      )}

      {/* Profile Edit Mode */}
      {isEditing && (
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="userName"
                value={profileData.userName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter your phone number"
              />
            </div>
            {profileData.role === 'Patient' && (
              <div>
                <label className="block text-sm font-medium">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={profileData.bloodGroup || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your blood group (e.g., A+, O-)"
                />
              </div>
            )}
            {profileData.role === 'Patient' && (
              <div>
                <label className="block text-sm font-medium">Medical History</label>
                <textarea
                  name="medicalHistory"
                  value={profileData.medicalHistory || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Describe your medical history"
                />
              </div>
            )}
            {profileData.role === 'Doctor' && (
              <div>
                <label className="block text-sm font-medium">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={profileData.specialization || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your specialization"
                />
              </div>
            )}
            {profileData.role === 'Doctor' && (
              <div>
                <label className="block text-sm font-medium">Hospital Name</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={profileData.hospitalName || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your hospital name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter your address"
              />
            </div>
            <button
              type="submit"
              className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;