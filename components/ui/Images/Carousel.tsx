import Image from "next/image";

export default function Carousel({ images }: { images: string[] }) {
	return (
		<div className="carousel carousel-center w-full rounded-xl gap-3">
			{images.map((image: string, index: number) => (
				<div className="carousel-item" key={index}>
					<Image
						className="rounded-xl"
						src={image}
						alt="Carousel Image"
						width={500}
						height={200}
					/>
				</div>
			))}
		</div>
	);
}
