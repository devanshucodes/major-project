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
    <div className="container-custom">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-8">
        {donationType === 'money' ? 'Donate Money' : 'Donate Food'}
      </h1>

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid-responsive">
            <div>
              <label className="form-label">Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                required
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {donationType === 'money' ? (
              <div className="col-span-full">
                <label className="form-label">Amount (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="form-input"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="form-label">Food Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.foodName}
                    onChange={(e) => setFormData({...formData, foodName: e.target.value})}
                  />
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <select
                    required
                    className="form-input"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Quantity</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>

                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="col-span-full">
                  <label className="form-label">Pickup Address</label>
                  <textarea
                    required
                    className="form-input"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>
              </>
            )}
          </div>

          <div className="pt-4 text-center">
            <button type="submit" className="btn-primary">
              {donationType === 'money' ? 'Proceed to Payment' : 'Submit Donation'}
            </button>
          </div>
        </form>

        {showQR && (
          <div className="modal-mobile">
            <div className="modal-content-mobile">
              {paymentSuccess ? (
                <div className="text-center success-animation">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Thank you for your generous donation.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-center">Scan QR Code to Pay</h3>
                  <div className="qr-container">
                    <QRCode
                      value={`upi://pay?pa=7007281292@pthdfc&pn=FoodShare&am=${formData.amount}&cu=INR`}
                      size={window.innerWidth < 380 ? 180 : 220}
                      level="H"
                    />
                  </div>
                  <p className="text-center text-gray-600 mb-4">
                    Amount: ₹{formData.amount}
                  </p>
                  <div className="flex flex-col space-y-3">
                    <button onClick={handlePaymentComplete} className="btn-primary">
                      Done with Payment
                    </button>
                    <button
                      onClick={() => setShowQR(false)}
                      className="w-full px-6 py-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
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