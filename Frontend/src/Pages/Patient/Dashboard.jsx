import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Welcome to Your Dashboard</h2>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-medium">Quick Stats</h3>
        <p>Upcoming Appointments: 3</p>
      </div>
    </div>
  );
};

export default Dashboard;