"use client"; 

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import CheckOutForm from './checkoutform';
import React, { Suspense } from 'react';

const Page = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage stripePromise={stripePromise} />
    </Suspense>
  );
}

const PaymentPage = ({ stripePromise }) => {
  const searchParams = useSearchParams();
  const amount = searchParams?.get('amount') || 0;
  
  const options = {
    mode: 'payment',
    amount: Math.round(amount * 100),
    currency: 'usd'
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm amount={Math.round(amount * 100)} />
    </Elements>
  );
};

export default Page;
