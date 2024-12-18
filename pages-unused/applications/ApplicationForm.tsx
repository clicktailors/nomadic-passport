import React, { useState, useEffect } from "react";
import Timeline from "../../components/ui/Form/components/Timeline";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { validateForm } from "../../utils/formValidation";
import ErrorMessage from "../../components/ui/ErrorMessage";
import FormStep from "../../components/ui/Form/components/FormStep";
import axios from "axios";
import { LOGGING } from "../../lib/logging";

const ApplicationForm = ({
	steps,
	formType,
	initialFormData,
	onFormSubmit,
}: {
	steps: any;
	formType: any;
	initialFormData: any;
	onFormSubmit: () => void;
}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState(initialFormData);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [highestStepReached, setHighestStepReached] = useState(0);

	const { handleSubmit, submitError, setSubmitError } =
		useFormSubmit(formType);

	const handleStepSubmit = async (stepData: any) => {
		const updatedFormData = { ...formData, ...stepData };
		setFormData(updatedFormData);

		const currentStepFields = Array.isArray(currentStepData.fields)
			? currentStepData.fields
			: currentStepData.fields &&
			  typeof currentStepData.fields === "object"
			? Object.values(currentStepData.fields).flat()
			: [];

		const stepErrors = validateForm(currentStepFields, updatedFormData);

		const filteredErrors = Object.entries(stepErrors).reduce(
			(acc, [key, value]) => {
				const field = currentStepFields.find(
					(f: { name: string }) => f.name === key
				);
				if (field && !field.required && !updatedFormData[key]) {
					return acc;
				}
				return { ...acc, [key]: value };
			},
			{}
		);

		if (Object.keys(filteredErrors).length === 0) {
			const nextStep = currentStep + 1;
			if (nextStep === steps.length) {
				setIsSubmitting(true);
				try {
					const response = await axios.post("/api/submit-form", {
						formType,
						...updatedFormData,
					});
					if (response.data.success) {
						setSubmissionSuccess(true);
					} else {
						setSubmitError(
							response.data.message ||
								"An error occurred during submission."
						);
					}
				} catch (error) {
					console.error("Error submitting form:", error);
					setSubmitError(
						"An error occurred while submitting the form. Please try again."
					);
				} finally {
					setIsSubmitting(false);
				}
			} else {
				setCurrentStep(nextStep);
				setHighestStepReached(Math.max(highestStepReached, nextStep));
			}
		} else {
			LOGGING && console.log("Validation errors:", filteredErrors);
			setSubmitError("Please fill in all required fields correctly.");
		}
	};

	const handlePaymentSuccess = async (paymentResult: {
		paymentIntentId: any;
		paymentMethodId: any;
		amount: any;
		success: boolean;
		error?: string;
	}) => {
		if (paymentResult.success) {
			const updatedFormData = {
				...formData,
				paymentIntentId: paymentResult.paymentIntentId,
				paymentMethodId: paymentResult.paymentMethodId,
				amount: paymentResult.amount,
			};
			setFormData(updatedFormData);
			const nextStep = currentStep + 1;
			if (nextStep === steps.length) {
				await handleStepSubmit(updatedFormData);
			} else {
				setCurrentStep(nextStep);
				setHighestStepReached(Math.max(highestStepReached, nextStep));
			}
			onFormSubmit(); // Call this after successful submission
		} else {
			setSubmitError(
				`Payment failed: ${paymentResult.error || "Unknown error"}`
			);
		}
	};

	const handleStepClick = (step: number) => {
		if (step <= highestStepReached) {
			setCurrentStep(step);
		}
	};

	const currentStepData =
		steps && steps.length > 0 ? steps[currentStep] || {} : {};

	useEffect(() => {
		const currentStepData = steps[currentStep] || {};
		const currentStepFields = currentStepData.fields
			? Array.isArray(currentStepData.fields)
				? currentStepData.fields
				: typeof currentStepData.fields === "object"
				? Object.values(currentStepData.fields).flat()
				: []
			: [];

		const updatedFormData = { ...formData };
		let hasChanges = false;

		currentStepFields.forEach((field: { name: string }) => {
			if (!(field.name in formData)) {
				updatedFormData[field.name] = "";
				hasChanges = true;
			}
		});

		if (hasChanges) {
			setFormData(updatedFormData);
		}
	}, [currentStep]);

	if (submissionSuccess) {
		return (
			<div className="text-center">
				<h2 className="text-2xl font-bold mb-4">
					Application Submitted Successfully!
				</h2>
				<p>
					Thank you for your application. We will review it and get
					back to you soon.
				</p>
			</div>
		);
	}

	return (
		<>
			{steps && steps.length > 0 && (
				<>
					<Timeline
						currentStep={currentStep}
						steps={steps.map((step: { title: any }) => step.title)}
						onStepClick={handleStepClick}
						completedSteps={Array.from(
							{ length: highestStepReached + 1 },
							(_, i) => i
						)}
					/>
					<ErrorMessage error={submitError || ""} />
					{currentStepData && currentStepData.component ? (
						<currentStepData.component
							{...currentStepData.props}
							onPaymentSuccess={handlePaymentSuccess}
							formData={formData}
						/>
					) : (
						<FormStep
							currentStepData={currentStepData}
							handleStepSubmit={handleStepSubmit}
							currentStep={currentStep}
							steps={steps}
							isSubmitting={isSubmitting}
							formData={formData}
						/>
					)}
				</>
			)}
		</>
	);
};

export default ApplicationForm;
