import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { BUYER_APPLICATION_FEE } from '../../lib/stripeAmounts';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// const CONNECTED_STRIPE_ACCOUNT_ID = process.env.CONNECTED_STRIPE_ACCOUNT_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const amount = BUYER_APPLICATION_FEE;
      const applicationFeeAmount = Math.round(amount * 0.1);

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        // application_fee_amount: applicationFeeAmount,
        // transfer_data: {
        //   destination: CONNECTED_STRIPE_ACCOUNT_ID ?? '',
        // },
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err: any) {
      console.error('Error creating payment intent:', err);
      res.status(500).json({ statusCode: 500, message: (err as Error).message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}