import React from "react";
import Head from "next/head";
import Intro from "../../components/sections/core/Intro";
import Layout from "../layout";
import Container from "../../components/ui/Container";
import { SITE_NAME } from "../../lib/constants";
import ContactForm from "./ContactForm";

const pageTitle = "Get in Touch";
const fields = {
	"Send us a message.": [
		{
			type: "firstName",
			name: "firstName",
			placeholder: "John",
			label: "First Name",
			required: true,
		},
		{
			type: "lastName",
			name: "lastName",
			placeholder: "Doe",
			label: "Last Name",
			required: true,
		},
		{
			type: "tel",
			name: "phone",
			placeholder: "(123) 456-7890",
			label: "Phone Number",
			required: false,
		},
		{
			type: "email",
			name: "email",
			placeholder: "john.doe@example.com",
			label: "Email Address",
			required: true,
		},
		{
			type: "textarea",
			name: "message",
			placeholder: "Hello, I'm interested in a new website!",
			label: "Your message",
			required: true,
		},
	],
};

const Contact = () => {
	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			<Container>
				<Intro pageTitle={pageTitle} center />
				<ContactForm fields={fields} />
			</Container>
		</Layout>
	);
};

export default Contact;
