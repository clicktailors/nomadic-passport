import React, { useState } from "react";
import Form from "./components/Form";
import Error from "../Error";
import { useFormSubmit } from "../../../hooks/useFormSubmit";
import { LOGGING } from "../../../lib/logging";

const PaymentForm = ({
	onPaymentSuccess,
}: {
	onPaymentSuccess: (result: any) => void;
}) => {
	// const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const fields = {
		"Payment Information": [
			{
				type: "text",
				name: "cardNumber",
				placeholder: "Card Number",
				label: "Card Number",
			},
			{
				type: "text",
				name: "expirationDate",
				placeholder: "MM/YY",
				label: "Expiration Date",
			},
			{
				type: "text",
				name: "cvc",
				placeholder: "CVC",
				label: "CVC",
			},
			{
				type: "text",
				name: "amount",
				placeholder: "Amount",
				label: "Amount",
			},
		],
	};

	const { handleSubmit, submitError } = useFormSubmit("buyer");

	const onSubmit = async (formData: any) => {
		setIsSubmitting(true);
		try {
			const result = await handleSubmit(formData);
			LOGGING && console.log("Payment submission result:", result);
			if (result.success) {
				onPaymentSuccess(result);
			}
		} catch (error) {
			// Error is already logged and set in the hook
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{submitError && <Error error={submitError} />}
			<Form
				fields={fields}
				onSubmit={onSubmit}
				submitButtonText={
					isSubmitting ? "Processing..." : "Submit Payment"
				}
				isSubmitting={isSubmitting}
			/>
		</>
	);
};

export default PaymentForm;
