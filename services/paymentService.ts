import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Updated to the latest API version
});

export const processPayment = async (paymentIntentId: string, email: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment was not successful');
    }

    // Check if the customer already exists
    let customer;
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      // Create a new customer if one doesn't exist
      customer = await stripe.customers.create({ email });
    }

    // Instead of attaching the payment method, update the PaymentIntent with the customer
    await stripe.paymentIntents.update(paymentIntentId, {
      customer: customer.id,
    });

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      customerId: customer.id,
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};