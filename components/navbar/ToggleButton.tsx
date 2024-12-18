import React from "react";

interface ToggleButtonProps {
	variant: "close" | "hamburger";
	toggleId: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ variant, toggleId }) => {
	let svgPath;
	if (variant === "close") {
		svgPath = (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M6 18L18 6M6 6l12 12"
			></path>
		);
	} else if (variant === "hamburger") {
		svgPath = (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M4 6h16M4 12h16M4 18h16"
			></path>
		);
	}
	return (
		<div className="flex-none sm:hidden">
			<label
				htmlFor={toggleId}
				aria-label={
					variant === "close" ? "close sidebar" : "open sidebar"
				}
				className="btn btn-square border btn-ghost"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block w-6 h-6 stroke-current"
				>
					{svgPath}
				</svg>
			</label>
		</div>
	);
};

export default ToggleButton;
