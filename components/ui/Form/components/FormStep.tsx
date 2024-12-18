import React from "react";
import Form from "./Form";

const FormStep: React.FC<{
	currentStepData: { fields: any[] };
	handleStepSubmit: (data: any) => Promise<void>;
	currentStep: number;
	steps: any[];
	isSubmitting: boolean;
	formData: any;
}> = ({
	currentStepData,
	handleStepSubmit,
	currentStep,
	steps,
	isSubmitting,
	formData,
}) => {
	const isLastStep = currentStep === steps.length - 1;

	const onSubmit = async (data: any) => {
		await handleStepSubmit(data);
	};

	return (
		<Form
			fields={currentStepData.fields}
			onSubmit={onSubmit}
			submitButtonText={isLastStep ? "Submit Application" : "Next"}
			isSubmitting={isSubmitting}
			initialData={formData}
		/>
	);
};

export default FormStep;
