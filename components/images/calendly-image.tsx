import cn from "classnames";
import Image from "next/image";

export default function CalendlyImage() {
	const image = (
		<Image
			width={2000}
			height={1000}
			alt={`Image of Calendly`}
			src={"/media/calendly-image.webp"}
			className={cn(
				"shadow-small hover:shadow-medium transition-shadow duration-200 rounded-xl"
			)}
			priority
		/>
	);
	return <div className="sm:mx-0">{image}</div>;
}
