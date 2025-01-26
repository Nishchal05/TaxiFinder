"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation'
import CheckOutForm from './checkoutform'
import React from 'react'
const Page = () => {
  const searchparams=useSearchParams();
  const amount=searchparams.get('amount');
  const stripePromise=loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY)
  const options={
    mode:'payment',
    amount:Math.round(amount*100),
    currency:'usd'
  }
  return (
    <Elements stripe={stripePromise} options={options}>
<CheckOutForm amount={Math.round(amount*100)}/>
    </Elements>
  )
}

export default Page