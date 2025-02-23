import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';

const DonationTrackingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  useEffect(() => {
    // Simulate progress updates
    const timer1 = setTimeout(() => setCurrentStep(2), 3000);
    const timer2 = setTimeout(() => setCurrentStep(3), 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const steps = [
    {
      title: 'Food Picked Up',
      description: 'Our team has collected your food donation',
      time: '10 minutes ago'
    },
    {
      title: 'Reached NGO',
      description: 'Food has been delivered to the distribution center',
      time: '5 minutes ago'
    },
    {
      title: 'Served to Children',
      description: 'Your donation is making children happy',
      time: 'Just now'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tracking Your Donation</h1>
        <p className="text-xl text-gray-600">Thank you for your generous contribution!</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep > index ? 'bg-green-600' : 'bg-gray-200'
                }`}>
                  {currentStep > index ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className="text-gray-500">{index + 1}</span>
                  )}
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  {currentStep > index && (
                    <p className="text-sm text-gray-500 mt-1">{step.time}</p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-4 top-8 h-16 w-px bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">See Your Impact</h2>
        <p className="text-gray-600 mb-6">
          View photos of the children enjoying nutritious meals, thanks to generous donors like you!
        </p>
        <Link
          to="/gallery"
          className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200"
        >
          View Gallery
          <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default DonationTrackingPage; 