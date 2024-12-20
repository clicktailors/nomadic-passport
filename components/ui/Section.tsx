import React, { ReactNode } from "react";
import { styles } from "../../lib/styles";

interface SectionProps {
	id?: string;
	children: ReactNode;
	className?: string;
	spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

export default function Section({
	id,
	children,
	className = "",
	spacing = "lg",
}: SectionProps) {
	const spacingClasses = {
		none: "",
		sm: "py-8 md:py-12",
		md: "py-12 md:py-16",
		lg: "py-16 md:py-24",
		xl: "py-24 md:py-32"
	};

	return (
		<section
			id={id}
			className={`w-full ${spacingClasses[spacing]} ${className}`}
		>
			{children}
		</section>
	);
}
