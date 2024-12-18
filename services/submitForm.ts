import axios, { AxiosError } from "axios";
import { LOGGING } from "../lib/logging";
interface FormData {
	[key: string]: string | number | boolean;
}

export default async function submitForm(formType: string, formData: FormData) {
	LOGGING && console.log("formData", formData);
	try {
		const response = await axios.post("/api/submit-form", {
			formType,
			...formData,
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			console.error(
				"Error submitting form:",
				axiosError.response?.data || axiosError.message
      );
      
			// If the error response is an object and has a message property, use that as the error message, otherwise convert to string
			const errorMessage =
				typeof axiosError.response?.data === "object" &&
				axiosError.response?.data !== null &&
				"message" in axiosError.response.data
					? (axiosError.response.data.message as string)
					: axiosError.response?.data?.toString() ||
					  "Error submitting form";
			throw new Error(errorMessage);
		}
		console.error("Error submitting form:", error);
		throw error;
	}
}