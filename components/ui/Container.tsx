import React, { ReactNode } from "react";
import { cn } from "../../utils/cn";

export default function Container({
	children,
	className = "",
	smallNav = false,
}: {
	children: ReactNode;
	className?: string;
	smallNav?: boolean;
}) {
	return (
		<div
			className={cn(
				`container lg:max-w-4xl md:max-w-2xl mx-auto ${
					!smallNav && "px-6"
				} ${className}`
			)}
		>
			{children}
		</div>
	);
}
