import React, { ReactNode } from "react";
import { styles } from "../../lib/styles";

interface SectionProps {
	id?: string;
	children: ReactNode;
	// fullWidth?: boolean;
	className?: string;
}

export default function Section({
	id,
	children,
	// fullWidth = false,
	className = "",
}: SectionProps) {
	return (
		<section
			id={id}
			// className={`w-full ${fullWidth ? "" : "px-6"} ${className}`}
			className={`w-full ${styles.yMargin} ${className}`}
		>
			{children}
		</section>
	);
}
