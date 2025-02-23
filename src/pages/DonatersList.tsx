import React from 'react';

const DonatersList = () => {
  const donations = JSON.parse(localStorage.getItem('donations') || '[]');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Our Generous Donors</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Money Donations</h2>
          <div className="space-y-4">
            {donations
              .filter(d => d.type === 'money')
              .map((donation, index) => (
                <div
                  key={index}
                  className="p-4 bg-green-50 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{donation.name}</span>
                    <span className="text-green-600 font-semibold">₹{donation.amount}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(donation.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Food Donations</h2>
          <div className="space-y-4">
            {donations
              .filter(d => d.type === 'food')
              .map((donation, index) => (
                <div
                  key={index}
                  className="p-4 bg-green-50 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{donation.name}</span>
                    <span className="text-green-600 font-semibold">
                      {donation.category === 'veg' ? '🥗' : '🍖'} {donation.foodName}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Quantity: {donation.quantity}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(donation.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatersList;