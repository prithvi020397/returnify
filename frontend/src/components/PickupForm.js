import { useState } from 'react';
import { Package, Calendar, Box, ArrowRight } from 'lucide-react';

const PickupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    date: '',
    timeSlot: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Move to success step
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="border rounded p-4">
        <h2 className="text-2xl mb-4">Schedule Return Pickup</h2>
        
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <input
                type="text"
                placeholder="Street Address"
                className="w-full p-2 border mb-2"
                value={formData.street}
                onChange={(e) => setFormData({...formData, street: e.target.value})}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full p-2 border mb-2"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
              <input
                type="text"
                placeholder="State"
                className="w-full p-2 border mb-2"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="w-full p-2 border mb-2"
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <input
                type="date"
                className="w-full p-2 border mb-2"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              <select
                className="w-full p-2 border"
                value={formData.timeSlot}
                onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
              >
                <option value="">Select Time</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <textarea
              placeholder="Item description..."
              className="w-full p-2 border h-32"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          )}

          {step === 4 && (
            <div className="text-center">
              <h3>Pickup Scheduled!</h3>
              <button
                onClick={() => setStep(1)}
                className="bg-blue-500 text-white p-2 rounded mt-4"
              >
                Schedule Another
              </button>
            </div>
          )}

          {step < 4 && (
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="border p-2 rounded"
                >
                  Back
                </button>
              )}
              <button
                type={step === 3 ? 'submit' : 'button'}
                onClick={() => step < 3 && setStep(step + 1)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {step === 3 ? 'Submit' : 'Next'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PickupForm;