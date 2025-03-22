  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

  // Custom hook to update the map center dynamically
  function SetViewOnLocation({ coords }) {
    const map = useMap();
    useEffect(() => {
      if (coords) {
        map.setView([coords.latitude, coords.longitude], 13); // Center the map on the user's location
      }
    }, [coords, map]);
    return null;
  }

  const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
      // Fetch user's current location using Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting user location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);

    useEffect(() => {
      // Fetch doctors' locations from the backend
      const fetchDoctors = async () => {
        try {
          const response = await axios.get('http://localhost:5163/api/Auth/doctor'); // Adjust endpoint as needed
          setDoctors(response.data);
          setFilteredDoctors(response.data); // Initialize filtered doctors with all doctors
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };

      fetchDoctors();
    }, []);

    // Handle search input changes
    const handleSearch = (e) => {
      const query = e.target.value.toLowerCase();
      setSearchQuery(query);

      // Filter doctors based on the search query (name, specialization, or hospital name)
      const filtered = doctors.filter((doctor) =>
        doctor.Name.toLowerCase().includes(query) ||
        doctor.Specialization.toLowerCase().includes(query) ||
        doctor.HospitalName.toLowerCase().includes(query)
      );

      setFilteredDoctors(filtered);
    };

    return (
      <div style={{ height: '100vh', width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>
        {/* Title and Search Field */}
        <div className="p-4 bg-white shadow-md">
          <h2 className="text-2xl font-semibold text-center">Find Your Doctor</h2>
          <input
            type="text"
            placeholder="Search by name, specialty, or hospital..."
            value={searchQuery}
            onChange={handleSearch}
            className="mt-4 w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Map Container */}
        <div style={{ height: 'calc(100vh - 120px)', width: '100%' }}> {/* Subtract header height */}
          <MapContainer
            center={userLocation ? [userLocation.latitude, userLocation.longitude] : [27.7172, 85.324]} // Default to Kathmandu
            zoom={25}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
            {/* Dynamically center the map on the user's location */}
            {userLocation && <SetViewOnLocation coords={userLocation} />}
            {/* Add a marker for the user's location */}
            {userLocation && (
              <Marker position={[userLocation.latitude, userLocation.longitude]}>
                <Popup>You are here!</Popup>
              </Marker>
            )}
            {/* Add markers for filtered doctors */}
            {filteredDoctors.map((doctor, index) => (
              <Marker key={index} position={[doctor.Latitude, doctor.Longitude]}>
                <Popup>
                  <div>
                    <h3 className="font-bold">{doctor.Name}</h3>
                    <p>{doctor.Specialization}</p>
                    <p>{doctor.HospitalName}</p>
                    <p>Latitude: {doctor.Latitude.toFixed(4)}</p>
                    <p>Longitude: {doctor.Longitude.toFixed(4)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    );
  };

  export default Map;