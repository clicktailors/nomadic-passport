import { useEffect, useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
	CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Link from "next/link";

const CheckoutForm = ({
	onPaymentSuccess,
	showSuccessMessage,
}: {
	onPaymentSuccess: (paymentResult: any) => void;
	showSuccessMessage: boolean;
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [clientSecret, setClientSecret] = useState<string | null>(null);

	useEffect(() => {
		// Fetch the client secret from the backend
		const fetchClientSecret = async () => {
			try {
				const response = await axios.post("/api/create-payment-intent");
				setClientSecret(response.data.clientSecret);
			} catch (error) {
				console.error("Error fetching client secret:", error);
			}
		};

		fetchClientSecret();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!stripe || !elements || !clientSecret) {
			return;
		}

		const { error: submitError } = await elements.submit();
		if (submitError) {
			console.error("Form submission error:", submitError);
			onPaymentSuccess({
				success: false,
				error: submitError.message,
			});
			return;
		}

		try {
			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					return_url: `${window.location.origin}/applications/payment-success`,
				},
				redirect: "if_required",
			});

			if (error) {
				console.error("Payment error:", error);
				onPaymentSuccess({
					success: false,
					error: error.message,
				});
			} else if (paymentIntent) {
				onPaymentSuccess({
					success: true,
					paymentIntentId: paymentIntent.id,
					paymentMethodId: paymentIntent.payment_method,
					amount: paymentIntent.amount,
				});
			}
		} catch (error) {
			console.error("Unexpected error:", error);
			onPaymentSuccess({
				success: false,
				error: "An unexpected error occurred. Please try again.",
			});
		}
	};

	return (
		<>
			{showSuccessMessage ? (
				<div className="text-center">
					<h2 className="text-2xl font-bold">Payment Successful!</h2>
					<p className="mt-4">Thank you for your payment.</p>
					<Link href="/" className="btn btn-primary mt-6">
						Return to Home
					</Link>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="space-y-6">
					<PaymentElement className="mb-6" />
					<button
						type="submit"
						className="btn btn-primary btn-block"
						disabled={!stripe || !clientSecret}
					>
						Pay Now
					</button>
				</form>
			)}
		</>
	);
};

export default CheckoutForm;
