import { FieldType } from "../components/ui/Form/components/Form";

export interface FormErrors {
	[key: string]: string;
}

export const validateForm = (
	fields: FieldType[] | { [category: string]: FieldType[] },
	formData: any
): FormErrors => {
	const errors: FormErrors = {};
	const validateFields = (fieldsArray: FieldType[]) => {
		fieldsArray.forEach((field) => {
			if (!formData[field.name] && field.type !== "weekdays") {
				errors[field.name] = "This field is required";
			} else if (
				field.type === "email" &&
				!isValidEmail(formData[field.name])
			) {
				errors[field.name] = "Please enter a valid email address";
			} else if (
				field.type === "tel" &&
				!isValidPhoneNumber(formData[field.name])
			) {
				errors[field.name] = "Please enter a valid phone number";
			} else if (field.type === "weekdays") {
				const selectedDays = JSON.parse(formData[field.name]);
				if (!Object.values(selectedDays).some((day) => day === true)) {
					errors[field.name] = "Please select at least one day";
				}
			}
		});
	};

	if (Array.isArray(fields)) {
		validateFields(fields);
	} else {
		Object.values(fields).forEach(validateFields);
	}

	return errors;
};

const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber: string): boolean => {
	const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
	return phoneRegex.test(phoneNumber);
};
