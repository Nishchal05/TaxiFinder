import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe=new Stripe(process.env.SECRET_STRIPE_KEY!,{
    typescript:true,
    apiVersion:"2023-10-16"
})
export async function POST(reqest:any) {
    const data:any=await reqest.json();
    const amount=data.amount;
    try{
        const paymentIntent=await stripe.paymentIntents.create({
            amount:Number(amount)*100,
            currency:'USD'
        })
        return NextResponse.json(paymentIntent.client_secret,{status:200})
    }
    catch(error){
        console.error(error);
    }
}