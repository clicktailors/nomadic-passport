import React, { useState } from "react";
import Head from "next/head";
import Intro from "../../../components/sections/core/Intro";
import Layout from "../../../pages/layout";
import Container from "../../../components/ui/Container";
import { SITE_NAME } from "../../../lib/constants";
import Form from "../../../components/ui/Form/components/Form";
import { useFormSubmit } from "../../../hooks/useFormSubmit";
import { LOGGING } from "../../../lib/logging";

const SellerApplication = () => {
	const pageTitle = "Seller Application";
	const pageDescription =
		"Fill out the form below to apply for a seller account. Once you have filled out the form, you will be redirected to the payment page to complete the application process.";
	const [isSubmitting, setIsSubmitting] = useState(false);

	const fields = {
		"Contact Information": [
			{
				type: "text",
				name: "name",
				placeholder: "Name",
				label: "Name",
			},
			{
				type: "text",
				name: "phoneNumber",
				placeholder: "Phone Number",
				label: "Phone Number",
			},
			{
				type: "email",
				name: "email",
				placeholder: "Email Address",
				label: "Email Address",
			},
			{
				type: "text",
				name: "propertyAddress",
				placeholder: "Property Address",
				label: "Property Address",
			},
			{
				type: "text",
				name: "bestTimeToCall",
				placeholder: "Best Time to Call",
				label: "Best Time to Call",
			},
			{
				type: "text",
				name: "availableDatesToCall",
				placeholder: "Available Dates to Call",
				label: "Available Dates to Call",
			},
		],
		// "Property Details": [
		// 	{
		// 		type: "text",
		// 		name: "ownershipDuration",
		// 		placeholder: "How long have you owned the house?",
		// 		label: "How long have you owned the house?",
		// 	},
		// 	{
		// 		type: "dropdown",
		// 		options: ["Yes", "No"],
		// 		name: "isPaidOff",
		// 		placeholder: "Is the house paid off?",
		// 		label: "Is the house paid off?",
		// 	},
		// 	{
		// 		type: "text",
		// 		name: "paymentPreference",
		// 		placeholder:
		// 			"Would you consider a cash price or owner financing?",
		// 		label: "Would you consider a cash price or owner financing?",
		// 	},
		// 	{
		// 		type: "text",
		// 		name: "houseAge",
		// 		placeholder: "How old is the house?",
		// 		label: "How old is the house?",
		// 	},
		// 	{
		// 		type: "text",
		// 		name: "houseSize",
		// 		placeholder: "How big is the house (square footage)?",
		// 		label: "How big is the house (square footage)?",
		// 	},
		// 	{
		// 		type: "text",
		// 		name: "bedrooms",
		// 		placeholder: "How many bedrooms?",
		// 		label: "How many bedrooms?",
		// 	},
		// 	{
		// 		type: "text",
		// 		name: "bathrooms",
		// 		placeholder: "How many bathrooms?",
		// 		label: "How many bathrooms?",
		// 	},
		// 	{
		// 		type: "textarea",
		// 		name: "recentModifications",
		// 		placeholder:
		// 			"Have there been any modifications, repairs, or remodels in the last 3 years? If so, please describe:",
		// 		label: "Have there been any modifications, repairs, or remodels in the last 3 years? If so, please describe:",
		// 	},
		// ],
	};

	const { handleSubmit, submitError } = useFormSubmit("seller");

	const onSubmit = async (formData: any) => {
		setIsSubmitting(true);
		try {
			const result = await handleSubmit(formData);
			LOGGING && console.log("Form submission result:", result);
			// Handle success (e.g., show success message, redirect)
		} catch (error) {
			// Error is already logged and set in the hook
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			<Container>
				<Intro pageTitle={pageTitle} description={pageDescription} />
				{submitError && (
					<div className="text-red-500 mb-4">{submitError}</div>
				)}
				<Form
					fields={fields}
					onSubmit={onSubmit}
					submitButtonText={
						isSubmitting ? "Submitting..." : "Submit Application"
					}
					isSubmitting={isSubmitting}
				/>
			</Container>
		</Layout>
	);
};

export default SellerApplication;
