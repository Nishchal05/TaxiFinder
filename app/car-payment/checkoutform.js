import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

const CheckOutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 
    setLoading(true); 

    if (!stripe || !elements) {
      setError('Stripe has not loaded');
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }

      const res = await fetch('/api/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
      });

      const result = await res.json();
      const clientSecret = result;

      if (!clientSecret) {
        setError('Failed to retrieve client secret');
        setLoading(false);
        return;
      }

    
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/', 
        },
        clientSecret: clientSecret, 
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false); 
        return;
      }

      

    } catch (err) {
      setError(err.message);
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <h2 className="m-5 font-bold">Amount to pay: {amount/100}</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-blue-600 mb-4">Processing payment...</div>} 
      
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button 
          type="submit"
          className="w-full bg-black text-white p-2 rounded-lg mt-2 flex justify-center"
          disabled={loading} 
        >
          {loading ? <Loader2 className=' animate-spin'/>: "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
