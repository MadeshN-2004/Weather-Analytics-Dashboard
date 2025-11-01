import React from 'react';

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="text-blue-600 mb-2">{icon}</div>
    <div className="text-sm text-gray-600">{label}</div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);

export default StatCard;