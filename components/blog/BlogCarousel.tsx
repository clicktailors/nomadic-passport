import PostPreview from "./PostPreview";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function BlogCarousel({ posts }: { posts: any[] }) {
	return (
		<Section>
			<Container>
				<div className="relative">
					<h2 className="mb-8 text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
						Latest Posts
					</h2>

					<div className="carousel carousel-center w-full gap-4 md:gap-8 py-4 overflow-x-auto">
						{posts.map(({ node }) => (
							<div
								key={node.slug}
								className="carousel-item w-[280px] md:w-[350px]"
							>
								<PostPreview
									title={node.title}
									coverImage={node.featuredImage}
									date={node.date}
									author={node.author}
									slug={node.slug}
									excerpt={node.excerpt}
								/>
							</div>
						))}
					</div>

					<div className="absolute right-0 top-0 space-x-1">
						<button
							onClick={() => {
								const carousel =
									document.querySelector(".carousel");
								carousel?.scrollBy({
									left: -300,
									behavior: "smooth",
								});
							}}
							className="btn btn-circle btn-ghost"
							aria-label="Scroll left"
						>
							<ChevronLeftIcon className="w-6 h-6" />
						</button>
						<button
							onClick={() => {
								const carousel =
									document.querySelector(".carousel");
								carousel?.scrollBy({
									left: 300,
									behavior: "smooth",
								});
							}}
							className="btn btn-circle btn-ghost"
							aria-label="Scroll right"
						>
							<ChevronRightIcon className="w-6 h-6" />
						</button>
					</div>
				</div>
			</Container>
		</Section>
	);
}
