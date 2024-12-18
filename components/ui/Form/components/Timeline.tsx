import React from "react";
import Link from "next/link";
import { LOGGING } from "../../../../lib/logging";

interface TimelineProps {
	currentStep: number;
	completedSteps: number[];
	onStepClick: (step: number) => void;
	steps: string[];
}

const Timeline: React.FC<TimelineProps> = ({
	currentStep,
	completedSteps,
	onStepClick,
	steps,
}) => {
	LOGGING && console.log(currentStep, completedSteps);
	return (
		<div className="flex flex-col items-center mb-4">
			<ul className="timeline">
				{steps.map((stepTitle, index) => (
					<li key={index}>
						{index > 0 && (
							<hr
								className={`
                                    ${
										completedSteps.includes(index) ||
										index <= currentStep
											? "bg-primary"
											: "bg-gray-300 dark:bg-gray-600"
									}
                                    transition-colors duration-300
                                `}
							/>
						)}
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className={`h-5 w-5 ${
									index === currentStep
										? "text-secondary"
										: completedSteps.includes(index)
											? "text-primary"
											: ""
								}`}
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="timeline-end mx-4">
							{completedSteps.includes(index) ||
							index === currentStep ? (
								<span
									onClick={() => onStepClick(index)}
									className="cursor-pointer hover:text-primary transition-colors duration-300"
								>
									{stepTitle}
								</span>
							) : (
								<span>{stepTitle}</span>
							)}
						</div>
						{index < steps.length - 1 && (
							<hr
								className={`
                                    ${
										completedSteps.includes(index + 1) ||
										index < currentStep
											? "bg-primary"
											: "bg-gray-300 dark:bg-gray-600"
									}
                                    transition-colors duration-300
                                `}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Timeline;
