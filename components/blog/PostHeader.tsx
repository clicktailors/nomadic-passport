import Avatar from "../ui/Images/Avatar";
import Date from "../sections/misc/Date";
import CoverImage from "./CoverImage";
import PostTitle from "./PostTitle";
import Categories from "./Categories";
import Section from "../ui/Section";
import Container from "../ui/Container";
export default function PostHeader({
	title,
	coverImage,
	date,
	author,
	categories,
}: {
	title: string;
	coverImage: { node: { sourceUrl: string } };
	date: string;
	author: any;
	categories: any;
}) {
	return (
		<Section>
			<Container>
				<div className="max-w-4xl mx-auto flex flex-col items-start justify-center gap-12 grid-cols-12">
					<div className="md:mb-12">
						{" "}
						<PostTitle>{title}</PostTitle>
						<Avatar author={author} />
						<div className="mb-6 text-sm">
							Posted <Date dateString={date} />
							<Categories categories={categories} />
						</div>
					</div>
					<div className="mb-8 md:mb-16 sm:mx-0 align-middle mx-auto">
						{" "}
						{coverImage && (
							<CoverImage title={title} coverImage={coverImage} />
						)}
					</div>
				</div>
			</Container>
		</Section>
	);
}
