import cn from "classnames";
import Image from "next/image";

export default function HeroImage({ img }: { img: string }) {
	const image = (
		<Image
			width={300}
			height={500}
			alt={`Image of a key`}
			src={img}
			className={cn(
				"rounded-xl h-[500px] w-[300px]"
			)}
			priority
		/>
	);
	return <div className="sm:mx-0">{image}</div>;
}
