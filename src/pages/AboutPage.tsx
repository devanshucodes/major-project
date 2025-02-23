import React from 'react';
import { Users, Utensils, Heart, Truck } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About FoodShare</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're on a mission to reduce food waste and hunger through community action
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80"
            alt="Food donation"
            className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            FoodShare began with a simple idea: connecting surplus food with those who need it most. We believe that no one should go hungry while good food goes to waste.
          </p>
          <p className="text-gray-600">
            Through our platform, we've created a community of generous donors and dedicated volunteers who work together to make a difference in people's lives.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <StatCard
          icon={<Users className="h-8 w-8 text-green-600" />}
          title="Community First"
          description="Building strong connections between donors and recipients"
        />
        <StatCard
          icon={<Utensils className="h-8 w-8 text-green-600" />}
          title="Quality Food"
          description="Ensuring safe and nutritious food reaches those in need"
        />
        <StatCard
          icon={<Heart className="h-8 w-8 text-green-600" />}
          title="Zero Hunger"
          description="Working towards a future where no one goes hungry"
        />
        <StatCard
          icon={<Truck className="h-8 w-8 text-green-600" />}
          title="Quick Response"
          description="Efficient collection and distribution network"
        />
      </div>

      <div className="bg-green-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ProcessCard
            number="1"
            title="Donate"
            description="Choose to donate money or surplus food through our platform"
          />
          <ProcessCard
            number="2"
            title="Collect"
            description="Our team collects food donations and verifies monetary contributions"
          />
          <ProcessCard
            number="3"
            title="Distribute"
            description="We ensure your donations reach those who need them most"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ProcessCard = ({ number, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default AboutPage;