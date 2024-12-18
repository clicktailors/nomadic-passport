import Avatar from "../ui/Images/Avatar";
import Date from "../sections/misc/Date";
import CoverImage from "./CoverImage";
import Link from "next/link";

export default function PostPreview({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug,
}: {
	title: string;
	coverImage: {
		node: {
			sourceUrl: string;
		};
	};
	date: string;
	excerpt: string;
	author: any;
	slug: string;
}) {
	return (
		<div>
			<div className="mb-5">
				{coverImage && (
					<CoverImage
						title={title}
						coverImage={coverImage}
						slug={slug}
					/>
				)}
			</div>
			<h3 className="text-3xl mb-3 leading-snug">
				<Link
					href={`/blog/posts/${slug}`}
					className="hover:underline"
					dangerouslySetInnerHTML={{ __html: title }}
				></Link>
			</h3>
			<div className="text-sm text-gray-500 mb-4">
				<Date dateString={date} />
			</div>
			<div className="text-lg leading-relaxed mb-4">
				{excerpt.replace(/<[^>]*>/g, "").substring(0, 200)}...
				<Link href={`/blog/posts/${slug}`}> Read More</Link>
			</div>
			<Avatar author={author} />
		</div>
	);
}
