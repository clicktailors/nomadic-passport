import PostPreview from "./PostPreview";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type SpacingType = "none" | "sm" | "md" | "lg" | "xl";

export default function BlogCarousel({ 
	posts, 
	spacing = "lg" 
}: { 
	posts: any[]; 
	spacing?: SpacingType;
}) {
	return (
		<Section spacing={spacing}>
			<Container>
				<div className="relative">
					{/* Section header */}
					<div className="mx-auto max-w-2xl lg:text-center mb-8">
						<h2 className="font-semibold leading-7 text-primary">
							From Our Blog
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
							Latest Posts
						</p>
						<p className="mt-4 text-lg leading-8 text-base-content/70">
							Stay up to date with our latest news, updates, and insights.
						</p>
					</div>

					{/* Carousel */}
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

					{/* Navigation buttons */}
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
