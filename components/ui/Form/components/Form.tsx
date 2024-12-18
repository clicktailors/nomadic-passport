import React, { useState } from "react";
import { validateForm, FormErrors } from "../../../../utils/formValidation";
import Category from "./Category";

const formClasses = "form-control w-full max-w-lg mx-auto mb-20";

export interface FieldType {
	label: string;
	type: string;
	name: string;
	placeholder: string;
	options?: string[];
	required?: boolean;
}

interface FormProps {
	fields: FieldType[] | { [category: string]: FieldType[] };
	requiredFields?: string[];
	onSubmit: (formData: any) => Promise<void>;
	submitButtonText?: string;
	isSubmitting: boolean;
	children?: React.ReactNode;
	initialData?: Record<string, any>;
	successMessage?: string;
	errorMessage?: string;
	submitSuccess?: boolean;
	submitError?: string | null;
}

const Form: React.FC<FormProps> = ({
	fields,
	onSubmit,
	submitButtonText = "Submit",
	isSubmitting,
	initialData,
	successMessage,
	errorMessage,
	submitSuccess,
	submitError,
}) => {
	const [formData, setFormData] = useState<{ [key: string]: string }>(
		initialData || {}
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const getButtonText = () => {
		if (isSubmitting) return "Submitting...";
		if (submitSuccess) return successMessage || "Success!";
		if (submitError) return "Try Again";
		return submitButtonText;
	};

	const getButtonClassName = () => {
		const baseClasses = "btn w-full mt-6";
		if (submitSuccess) return `${baseClasses} btn-success`;
		if (submitError) return `${baseClasses} btn-error`;
		return `${baseClasses} btn-primary`;
	};

	return (
		<form className={formClasses} onSubmit={handleSubmit}>
			{Array.isArray(fields) ? (
				<Category
					fields={fields}
					formData={formData}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>)
					}
					errors={{}}
				/>
			) : (
				fields &&
				Object.entries(fields).map(
					([category, categoryFields]) =>
						categoryFields.length > 0 && (
							<Category
								key={category}
								category={category}
								fields={categoryFields}
								formData={formData}
								onChange={(e) =>
									handleChange(
										e as React.ChangeEvent<HTMLInputElement>
									)
								}
								errors={{}}
							/>
						)
				)
			)}
			<button
				type="submit"
				className={getButtonClassName()}
				disabled={isSubmitting}
			>
				{getButtonText()}
			</button>
		</form>
	);
};

export default Form;
