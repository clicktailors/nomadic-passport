import React, { useState, useEffect } from "react";
import Head from "next/head";
import Intro from "../../../components/sections/core/Intro";
import Layout from "../../../pages/layout";
import Container from "../../../components/ui/Container";
import { SITE_NAME } from "../../../lib/constants";
import StripeForm from "../../../components/ui/Form/StripeForm";
import Timeline from "../../../components/ui/Form/components/Timeline";
import { LOGGING } from "../../../lib/logging";
const TestPay: React.FC = () => {
	const pageTitle = "Test Pay";
	const pageDescription = "This is a test payment page.";

	const [currentStep, setCurrentStep] = useState(1);
	const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

	const onPaymentSuccess = async (paymentResult: any) => {
		try {
			setCompletedSteps([...completedSteps, 1]);
			setCurrentStep(2);
			LOGGING && console.log("Payment result:", paymentResult);
			// Simulate form submission
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setCompletedSteps([...completedSteps, 1, 2]);
			// Handle success (e.g., show success message)
		} catch (error) {
			console.error("Error processing payment:", error);
		}
	};

	const handleStepClick = (step: number) => {
		setCurrentStep(step);
	};

	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			<Container>
				<Intro pageTitle={pageTitle} description={pageDescription} />
				<Timeline
					currentStep={currentStep}
					onStepClick={handleStepClick}
					steps={["Payment", "Review", "Confirmation"]}
					completedSteps={completedSteps}
				/>
				<StripeForm amount={1000} onPaymentSuccess={onPaymentSuccess} />
			</Container>
		</Layout>
	);
};

export default TestPay;
