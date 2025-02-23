import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Pizza } from 'lucide-react';

const HomePage = () => {
  const stats = JSON.parse(localStorage.getItem('donationStats') || '{"moneyDonated": 0, "foodDonated": 0}');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <img 
          src="/images/kids.png" 
          alt="Children receiving food donations" 
          className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
        />
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Make a Difference Today
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join us in our mission to reduce food waste and help those in need
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">Donate Money</h2>
          <p className="text-gray-600 text-center mb-6">
            Your financial contribution helps us maintain our food collection and distribution network
          </p>
          <div className="text-center">
            <Link
              to="/donate?type=money"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              Donate Now
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-4">
            <Pizza className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">Donate Food</h2>
          <p className="text-gray-600 text-center mb-6">
            Help us collect surplus food and distribute it to those who need it most
          </p>
          <div className="text-center">
            <Link
              to="/donate?type=food"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              Donate Food
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">Total Money Donated</h3>
          <p className="text-4xl font-bold text-green-600 text-center">
            ₹{stats.moneyDonated.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">Food Donations</h3>
          <p className="text-4xl font-bold text-green-600 text-center">
            {stats.foodDonated} Items
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;