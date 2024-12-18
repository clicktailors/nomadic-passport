import Section from "../../ui/Section";
import Container from "../../ui/Container";
import Logo from "../../ui/Icons/Logo";

export default function Intro({
	pageTitle,
	icon,
	description,
	center = false,
}: {
	pageTitle: string;
	icon?: React.ReactNode;
	description?: string;
	center?: boolean;
}) {
	return (
		<Section id="intro">
			<Container>
				<h1
					className={`tracking-tighter text-6xl md:text-7xl font-bold leading-tight text-base ${
						center && "text-center"
					}`}
				>
					{/* Icon */}
					{icon && <span className="mr-4">{icon}</span>}
					{/* Title */}
					{pageTitle}
				</h1>
				{/* Description */}
				{description && (
					<p className="text-md text-base-content/80 mt-6 text-center max-w-lg">
						{description}
					</p>
				)}
			</Container>
		</Section>
	);
}
