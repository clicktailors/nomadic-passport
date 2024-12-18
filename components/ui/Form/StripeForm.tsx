import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {
	loadStripe,
	StripeElementsOptions,
	Appearance,
} from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import { colors } from "../../../lib/colors";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function StripeForm({
	amount,
	onPaymentSuccess,
}: {
	amount: number;
	onPaymentSuccess: (paymentResult: any) => void;
}) {
	const { resolvedTheme } = useTheme();
	const [appearance, setAppearance] = useState<Appearance>({});
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const totalAmount = amount;
	const formattedAmount =
		totalAmount % 100 === 0
			? (totalAmount / 100).toString()
			: (totalAmount / 100).toFixed(2);

	useEffect(() => {
		setAppearance({
			theme: "flat",
			variables: {
				colorPrimary:
					resolvedTheme === "dark"
						? colors.dark.primary
						: colors.light.primary,
				colorBackground:
					resolvedTheme === "dark"
						? colors.dark.background
						: colors.light.background,
				colorText:
					resolvedTheme === "dark"
						? colors.dark.text
						: colors.light.text,
				colorDanger:
					resolvedTheme === "dark"
						? colors.dark.secondary
						: colors.light.secondary,
				fontFamily: "Inter, system-ui, sans-serif",
				spacingUnit: "4px",
				borderRadius: "8px",
			},
			rules: {
				".Input": {
					border:
						resolvedTheme === "dark"
							? "solid " + colors.dark.borderColor
							: "solid " + colors.light.borderColor,
				},
				".Label": {
					color:
						resolvedTheme === "dark"
							? colors.dark.text
							: colors.light.text,
				},
			},
		});
	}, [resolvedTheme]);

	const options: StripeElementsOptions = {
		mode: "payment",
		amount: totalAmount,
		currency: "usd",
		appearance,
	};

	const handlePaymentSuccess = (paymentResult: any) => {
		setPaymentSuccess(true);
		onPaymentSuccess(paymentResult);
	};

	return (
		<div className="w-full max-w-md mx-auto p-6 mb-20">
			<h2 className="text-2xl text-center font-bold">Payment Details</h2>
			<h3 className="text-lg text-center text-base-content/50">
				Application Fee: ${formattedAmount}
			</h3>
			<div className="rounded-box">
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm
						onPaymentSuccess={handlePaymentSuccess}
						showSuccessMessage={paymentSuccess}
					/>
				</Elements>
				<p className="text-center mt-4 text-xs text-base-content opacity-30">
					Powered by Stripe Payments
				</p>
			</div>
		</div>
	);
}

export default StripeForm;
