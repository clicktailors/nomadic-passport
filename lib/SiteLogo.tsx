import Logo from "../components/ui/Icons/Logo";

interface SiteLogoProps {
	className?: string;
	size?: "size-6" | "size-8" | "size-10" | "size-12";
	inverted?: boolean;
}

export const SiteLogo = ({
	className = "",
	size = "size-6",
	inverted = false,
}: SiteLogoProps) => {
	return (
		<div className={`flex items-center ${className}`}>
			<Logo size={size} />
		</div>
	);
};
