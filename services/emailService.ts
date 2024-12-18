import sgMail from "@sendgrid/mail";
import { FROM_EMAIL } from "../lib/constants";
import { LOGGING } from "../lib/logging";
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
LOGGING && console.log("SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);

export async function sendContactEmail(formData: {
  firstName: string;
  lastName: string;
	email: string;
	phoneNumber?: string;
	message: string;
}) {
	const { firstName, lastName, email, message } = formData;
	const phoneNumber = formData.phoneNumber
		? `Phone Number: ${formData.phoneNumber}`
		: "";

	const msg = {
		to: FROM_EMAIL || "",
		from: FROM_EMAIL || "",
		subject: `Contact Form Submission from ${firstName} ${lastName}`,
		text: `${message}`,
		html: `
      <h3>${firstName} ${lastName} <${email}> sent you a message:</h3>
      <p><strong>${message}</strong></p>
      ${phoneNumber}
    `,
	};

	try {
		LOGGING && console.log("Sending email:", msg);
		await sgMail.send(msg);
		return { success: true, message: "Email sent successfully!" };
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}

export async function sendApplicationNotification(formType: string, formData: any) {
  const msg = {
    to: process.env.EMAIL_USER,
    from: FROM_EMAIL,
    subject: `New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Application Submitted`,
    html: `
      <h2>New ${formType} application submitted:</h2>
      <pre>${JSON.stringify(formData, null, 2)}</pre>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: "Notification email sent successfully!" };
  } catch (error) {
    console.error("Error sending notification email:", error);
    throw error;
  }
}

export async function sendNewsletterEmail(formData: { email: string }) {
  const { email } = formData;

  const msg = {
    to: email,
    from: FROM_EMAIL,
    subject: "Welcome to Our Newsletter!",
    html: `
      <h2>Welcome to Our Newsletter!</h2>
      <p>Thank you for subscribing to our newsletter. You'll receive updates on our latest properties and news.</p>
    `,
  };

	try {
		await sgMail.send(msg);
		return { success: true, message: "Email sent successfully!" };
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}
