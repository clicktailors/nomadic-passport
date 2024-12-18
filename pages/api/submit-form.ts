import type { NextApiRequest, NextApiResponse } from "next";
import { createOrUpdateContact } from "../../services/hubspotService";
import { sendContactEmail } from "../../services/emailService";
import { processPayment } from "../../services/paymentService";
import { submitToTenantScreening } from "../../services/tenantScreeningService";
import { sendApplicationNotification, sendNewsletterEmail } from "../../services/emailService";
import { LOGGING } from "../../lib/logging";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { formType, ...formData } = req.body;
			LOGGING && console.log("Received formType:", formType);
			LOGGING && console.log("formData", formData);
			let response: any = {};

			// Common operations for all form types
			if (formData.email) {
				const hubspotResponse = await createOrUpdateContact(formData);
				response.hubspot = hubspotResponse;
				LOGGING && console.log("hubspotResponse", hubspotResponse);
			}

			// Specific operations based on form type
			switch (formType) {
				case "contact":
					const emailResponse = await sendContactEmail(formData);
					response.email = emailResponse;
					break;
				case "newsletter":
					// const newsletterResponse = await sendNewsletterEmail(formData);
					// response.newsletter = newsletterResponse;
					// break;
					LOGGING && console.log("newsletter subscribed");
					break;
				case "buyer":
					LOGGING && console.log("Buyer form data:", formData);
					if (formData.paymentIntentId) {
						LOGGING && console.log("Processing payment with paymentIntentId:", formData.paymentIntentId);
						const paymentResponse = await processPayment(
							formData.paymentIntentId,
							formData.email
						);
						response.payment = paymentResponse;

						if (!paymentResponse.success) {
							return res.status(400).json({
								success: false,
								message: "Payment failed",
								error: paymentResponse.error,
							});
						}
						// If payment is successful, proceed with tenant screening
						LOGGING && console.log("Payment successful, submitting to tenant screening");
						const screeningResponse = await submitToTenantScreening(formData);
						response.screening = screeningResponse;
					} else if (formData.paymentMethodId) {
						LOGGING && console.log("Payment already processed with paymentMethodId:", formData.paymentMethodId);
						// Proceed with tenant screening
						const screeningResponse = await submitToTenantScreening(formData);
						response.screening = screeningResponse;
					} else {
						console.error("No payment information provided");
						throw new Error("Payment information is required for buyer applications.");
					}
					// Send notification email for buyer application
					await sendApplicationNotification("buyer", formData);
					break;
				case "seller":
					// Send notification email for seller application
					await sendApplicationNotification("seller", formData);
					// LOGGING && console.log("Sending seller notification email");
					break;
				default:
					throw new Error("Invalid form type");
			}

			res.status(200).json({
				success: true,
				message: "Form submitted successfully",
				response,
			});
		} catch (error) {
			console.error("Error processing form submission:", error);
			if (error instanceof Error) {
				res.status(500).json({
					message: "Error submitting form",
					error: error.message,
				});
			} else {
				res.status(500).json({ message: "An unknown error occurred" });
			}
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}