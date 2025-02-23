import React, { useState, FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { Check } from 'lucide-react';

const DonatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const donationType = searchParams.get('type') || 'money';
  const [showQR, setShowQR] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    foodName: '',
    category: 'veg',
    quantity: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get existing donations
    const existingDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    const stats = JSON.parse(localStorage.getItem('donationStats') || '{"moneyDonated": 0, "foodDonated": 0}');
    
    if (donationType === 'money') {
      stats.moneyDonated += parseInt(formData.amount);
      existingDonations.push({
        type: 'money',
        amount: formData.amount,
        name: formData.name,
        email: formData.email,
        date: new Date().toISOString()
      });
      setShowQR(true);
    } else {
      stats.foodDonated += 1;
      existingDonations.push({
        type: 'food',
        foodName: formData.foodName,
        category: formData.category,
        quantity: formData.quantity,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        date: new Date().toISOString()
      });
      localStorage.setItem('donations', JSON.stringify(existingDonations));
      localStorage.setItem('donationStats', JSON.stringify(stats));
      navigate('/tracking');
    }
    
    localStorage.setItem('donations', JSON.stringify(existingDonations));
    localStorage.setItem('donationStats', JSON.stringify(stats));
  };

  const handlePaymentComplete = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowQR(false);
      setPaymentSuccess(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        {donationType === 'money' ? 'Donate Money' : 'Donate Food'}
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {donationType === 'money' ? (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Food Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.foodName}
                    onChange={(e) => setFormData({...formData, foodName: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Address
                  </label>
                  <textarea
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>
              </>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              {donationType === 'money' ? 'Proceed to Payment' : 'Submit Donation'}
            </button>
          </div>
        </form>

        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
              {paymentSuccess ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Thank you for your generous donation.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-center">Scan QR Code to Pay</h3>
                  <div className="flex justify-center mb-4">
                    <QRCode
                      value={`upi://pay?pa=example@upi&pn=FoodShare&am=${formData.amount}&cu=INR`}
                      size={256}
                      level="H"
                    />
                  </div>
                  <p className="text-center text-gray-600 mb-4">
                    Amount: ₹{formData.amount}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handlePaymentComplete}
                      className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
                    >
                      Done with Payment
                    </button>
                    <button
                      onClick={() => setShowQR(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonatePage;