import Avatar from "../ui/Images/Avatar";
import Date from "../sections/misc/Date";
import CoverImage from "./CoverImage";
import Link from "next/link";
import Section from "../ui/Section";
import Container from "../ui/Container";

interface HeroPostProps {
	title: string;
	coverImage: {
		node: {
			sourceUrl: string;
		};
	};
	date: string;
	excerpt: string;
	author?: {
		node: {
			name: string;
			firstName?: string;
			lastName?: string;
			avatar?: {
				url: string;
			};
		};
	};
	slug: string;
}

export default function HeroPost({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug,
}: HeroPostProps) {
	const Heading = () => {
		return (
			<div>
				<h3 className="mb-4 text-4xl font-bold lg:text-6xl leading-tight">
					<Link
						href={`/blog/posts/${slug}`}
						className="hover:underline"
						dangerouslySetInnerHTML={{ __html: title }}
					/>
				</h3>
				<div className="mb-4 md:mb-0 text-sm text-gray-500">
					<Date dateString={date} />
				</div>
			</div>
		);
	};

	const Image = () => {
		return (
			<div className="mb-8 md:mb-16">
				{coverImage && (
					<CoverImage
						title={title}
						coverImage={coverImage}
						slug={slug}
					/>
				)}
			</div>
		);
	};

	const TextArea = () => {
		return (
			<div>
				<div
					className="text-lg leading-relaxed mb-4"
					dangerouslySetInnerHTML={{ __html: excerpt }}
				/>
				<Avatar author={author} />
			</div>
		);
	};

	return (
		<Section>
			<Container>
				<Image />
				<Heading />
				<TextArea />
			</Container>
		</Section>
	);
}
