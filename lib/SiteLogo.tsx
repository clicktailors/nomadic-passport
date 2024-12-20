import { SiteLogo as Logo } from "../components/images/tsx/icons";

interface SiteLogoProps {
	size?: string;
	inverted?: boolean;
	className?: string;
}

export const SiteLogo = ({ size = "size-8", inverted = false, className = "" }: SiteLogoProps) => {
	return <Logo size={size} className={className} />;
};
