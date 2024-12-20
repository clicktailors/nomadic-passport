import React, { useState } from "react";
import Form from "../../ui/Form/components/Form";
import { useFormSubmit } from "../../../hooks/useFormSubmit";
import Lottie from "../../images/animations/lottie";
import Section from "../../ui/Section";
import Container from "../../ui/Container";

export default function Newsletter() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [titleMessage, setTitleMessage] = useState({
		title: "Subscribe to Our Newsletter!",
		body: "Sign up to our newsletter to get the latest news and updates.",
	});

	const newsletterAnimation =
		"https://lottie.host/ebc0a280-efc9-43a4-9be1-be0cdef674d1/VrnZT7yV9p.lottie";

	const [isFading, setIsFading] = useState(false);

	const fields = [
		{
			type: "email",
			name: "email",
			label: "Email Address",
			placeholder: "john.doe@example.com",
			required: true,
		},
	];

	const { handleSubmit, submitError, setSubmitError } =
		useFormSubmit("newsletter");

	const onSubmit = async (formData: any) => {
		setIsSubmitting(true);
		try {
			await handleSubmit(formData);
			setIsFading(true);
			setIsSubscribed(true);
			setTimeout(() => {
				setTitleMessage({
					title: "Thank You For Joining Our Newsletter!",
					body: "You will receive an email when we publish new content.",
				});
				setIsFading(false);
			}, 500);
		} catch (error) {
			setSubmitError("Error subscribing. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Section>
			<Container>
				<div className="flex flex-col items-center max-w-2xl mx-auto">
					{/* Section title */}
					<div className="mx-auto max-w-2xl lg:text-center mb-8">
						<h2 className="font-semibold leading-7 text-primary">
							Stay Updated
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
							Join Our Newsletter
						</p>
						<p className="mt-4 text-lg leading-8 text-base-content/70">
							Get the latest updates, news, and insights delivered directly to your inbox.
						</p>
					</div>

					{/* Animation */}
					<div className="w-full max-w-sm mb-12">
						<div className="relative w-full" style={{ paddingBottom: "50%" }}>
							<div className="absolute inset-0 flex items-center justify-center">
								<Lottie
									button={false}
									src={newsletterAnimation}
									loop={true}
									autoplay={true}
								/>
							</div>
						</div>
					</div>

					{/* Message */}
					<div
						className={`w-full text-center mb-6 transition-opacity duration-500 ${
							isFading ? "opacity-0" : "opacity-100"
						}`}
					>
						<h3 className="text-xl font-bold mb-2">
							{titleMessage.title}
						</h3>
						<p className="text-sm text-base-content/70">
							{titleMessage.body}
						</p>
					</div>

					{/* Form */}
					<div className="w-full max-w-sm">
						<Form
							fields={fields}
							onSubmit={onSubmit}
							submitButtonText={
								isSubmitting ? "Subscribing..." : "Subscribe"
							}
							isSubmitting={isSubmitting}
							successMessage="Subscribed successfully!"
							errorMessage="Error subscribing. Please try again."
							submitSuccess={isSubscribed}
							submitError={submitError}
						/>
					</div>
				</div>
			</Container>
		</Section>
	);
}
