import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Mail, Phone, CreditCard, CheckCircle } from 'lucide-react';
import { BookingRequest, ServiceType } from '../../types';

const BookingAssistant: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<Partial<BookingRequest>>({
    serviceType: undefined,
    preferredDate: undefined,
    location: '',
    message: '',
    budget: undefined,
  });
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const serviceTypes: ServiceType[] = [
    {
      id: 'portrait',
      name: 'Portrait Photography',
      description: 'Professional portrait sessions for individuals, couples, or families',
      basePrice: 200,
      duration: 2,
      category: 'portrait',
      requirements: ['Outdoor or studio location', 'Wardrobe consultation'],
      deliverables: ['20-30 edited photos', 'Online gallery', 'Print rights']
    },
    {
      id: 'event',
      name: 'Event Photography',
      description: 'Wedding, corporate, and special event coverage',
      basePrice: 500,
      duration: 6,
      category: 'event',
      requirements: ['Event details', 'Timeline', 'Special requests'],
      deliverables: ['200+ edited photos', 'Online gallery', 'Print rights', 'USB drive']
    },
    {
      id: 'commercial',
      name: 'Commercial Photography',
      description: 'Product, business, and marketing photography',
      basePrice: 800,
      duration: 4,
      category: 'commercial',
      requirements: ['Brand guidelines', 'Product samples', 'Usage rights'],
      deliverables: ['50+ edited photos', 'Multiple formats', 'Usage rights', 'Fast turnaround']
    },
    {
      id: 'documentary',
      name: 'Documentary Photography',
      description: 'Storytelling through authentic moments and real-life events',
      basePrice: 400,
      duration: 4,
      category: 'documentary',
      requirements: ['Story outline', 'Access permissions', 'Timeline'],
      deliverables: ['100+ edited photos', 'Story narrative', 'Online gallery']
    }
  ];

  const steps = [
    { number: 1, title: 'Service Selection', description: 'Choose your photography service' },
    { number: 2, title: 'Date & Location', description: 'Select date and location preferences' },
    { number: 3, title: 'Client Information', description: 'Provide your contact details' },
    { number: 4, title: 'Review & Confirm', description: 'Review your booking details' }
  ];

  const handleServiceSelect = (service: ServiceType) => {
    setBookingData(prev => ({ ...prev, serviceType: service }));
    setCurrentStep(2);
  };

  const handleDateSelect = (date: string) => {
    setBookingData(prev => ({ ...prev, preferredDate: new Date(date) }));
  };

  const handleLocationChange = (location: string) => {
    setBookingData(prev => ({ ...prev, location }));
  };

  const handleBudgetChange = (budget: number) => {
    setBookingData(prev => ({ ...prev, budget }));
  };

  const handleMessageChange = (message: string) => {
    setBookingData(prev => ({ ...prev, message }));
  };

  const handleClientInfoChange = (field: string, value: string) => {
    setClientInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Here you would typically send the booking request to your backend
    console.log('Booking submitted:', { ...bookingData, ...clientInfo });
    setCurrentStep(5); // Success step
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose Your Service</h2>
              <p className="text-gray-600">Select the type of photography service you need</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceTypes.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="card cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 border-transparent hover:border-primary-200 p-6"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-gray-600 mt-2">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">${service.basePrice}</p>
                      <p className="text-sm text-gray-500">{service.duration}h session</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                      <ul className="space-y-1">
                        {service.deliverables?.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {service.requirements?.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full btn-primary">
                      Select This Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Date & Location</h2>
              <p className="text-gray-600">When and where would you like your session?</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleDateSelect(e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location or 'Studio' for studio session"
                    value={bookingData.location || ''}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Budget Range (Optional)
                  </label>
                  <select
                    onChange={(e) => handleBudgetChange(Number(e.target.value))}
                    className="input-field"
                  >
                    <option value="">Select budget range</option>
                    <option value="200">$200 - $400</option>
                    <option value="500">$500 - $800</option>
                    <option value="800">$800 - $1200</option>
                    <option value="1200">$1200+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  placeholder="Tell us about your vision, special requirements, or any questions you have..."
                  value={bookingData.message || ''}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  className="form-textarea"
                  rows={6}
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="btn-primary"
                disabled={!bookingData.preferredDate}
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
              <p className="text-gray-600">We'll use this to contact you about your booking</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={clientInfo.name}
                  onChange={(e) => handleClientInfoChange('name', e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={clientInfo.email}
                  onChange={(e) => handleClientInfoChange('email', e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={clientInfo.phone}
                  onChange={(e) => handleClientInfoChange('phone', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="btn-primary"
                disabled={!clientInfo.name || !clientInfo.email}
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Booking</h2>
              <p className="text-gray-600">Please review your details before confirming</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Service:</span> {bookingData.serviceType?.name}</p>
                  <p><span className="font-medium">Duration:</span> {bookingData.serviceType?.duration} hours</p>
                  <p><span className="font-medium">Base Price:</span> ${bookingData.serviceType?.basePrice}</p>
                  <p><span className="font-medium">Date:</span> {bookingData.preferredDate?.toLocaleDateString()}</p>
                  <p><span className="font-medium">Location:</span> {bookingData.location || 'To be discussed'}</p>
                  {bookingData.budget && (
                    <p><span className="font-medium">Budget Range:</span> ${bookingData.budget}+</p>
                  )}
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {clientInfo.name}</p>
                  <p><span className="font-medium">Email:</span> {clientInfo.email}</p>
                  {clientInfo.phone && (
                    <p><span className="font-medium">Phone:</span> {clientInfo.phone}</p>
                  )}
                </div>
              </div>
              
              {bookingData.message && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Requests</h3>
                  <p className="text-gray-600">{bookingData.message}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">
                Thank you for choosing ZESA Photography. We've received your booking request and will contact you within 24 hours to confirm the details.
              </p>
            </div>
            
            <div className="card max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• We'll review your request and check availability</li>
                <li>• You'll receive a confirmation email with details</li>
                <li>• We'll schedule a consultation call if needed</li>
                <li>• Final details will be confirmed 48 hours before your session</li>
              </ul>
            </div>
            
            <button
              onClick={() => {
                setCurrentStep(1);
                setBookingData({});
                setClientInfo({ name: '', email: '', phone: '' });
              }}
              className="btn-primary"
            >
              Book Another Session
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      {currentStep < 5 && (
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <div className="ml-4 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-20 h-0.5 mx-6 ${
                    currentStep > step.number ? 'bg-primary-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="card p-8">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default BookingAssistant;
