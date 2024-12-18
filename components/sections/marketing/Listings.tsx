import { useState, useEffect } from "react";
import Carousel from "../../ui/Images/Carousel";

const importImage = async (path: string) => {
	try {
		const image = await import(`../raw/sample-listing-images/${path}`);
		return image.default;
	} catch (error) {
		console.warn(`Failed to load image: ${path}`);
		return null;
	}
};

export default function Listings() {
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		const loadImages = async () => {
			const imagePromises = Array.from({ length: 13 }, (_, i) =>
				importImage(`${i + 1}.jpg`)
			);
			const loadedImages = await Promise.all(imagePromises);
			setImages(loadedImages.filter(Boolean).map((img) => img.src));
		};

		loadImages();
	}, []);

	if (images.length === 0) {
		return null; // Or return a placeholder component
	}

	return (
		<div className="justify-center flex flex-col gap-3 my-24">
			<h2 className="my-8 text-3xl font-bold tracking-tight sm:text-4xl text-center">
				Some of our Homes
			</h2>
			<Carousel images={images} />
		</div>
	);
}
