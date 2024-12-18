import { Icon } from "@iconify-icon/react";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";

export const SiteLogo = ({
	className,
	size,
}: {
	className: string;
	size: string;
}) => {
	return (
		<div className={`flex items-center ${className}`}>
			<CursorArrowRaysIcon className="size-8 text-primary mr-2" />
		</div>
	);
};

export const XIcon = () => {
	return (
		<Icon
			icon="fa6-brands:x-twitter"
			width="24"
			height="24"
			className="fill-current"
		/>
	);
};

export const InstagramIcon = () => {
	return (
		<Icon
			icon="fa6-brands:instagram"
			width="24"
			height="24"
			className="fill-current"
		/>
	);
};

export const YouTubeIcon = () => {
	return (
		<Icon
			icon="fa6-brands:youtube"
			width="24"
			height="24"
			className="fill-current"
		/>
	);
};

export const MediumIcon = () => {
	return (
		<Icon
			icon="fa6-brands:medium"
			width="24"
			height="24"
			className="fill-current"
		/>
	);
};

export const FacebookIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className="fill-current"
		>
			<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
		</svg>
	);
};

export const SunIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
			clipRule="evenodd"
		/>
	</svg>
);

export const MoonIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
	</svg>
);

export const SystemIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
			clipRule="evenodd"
		/>
	</svg>
);

export const emailSVG = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="w-4 h-4 opacity-70"
	>
		<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
		<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
	</svg>
);

export const usernameSVG = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="w-4 h-4 opacity-70"
	>
		<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
	</svg>
);
