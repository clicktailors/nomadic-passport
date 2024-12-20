import PostPreview from "./PostPreview";
import Container from "../ui/Container";
import Section from "../ui/Section";

type SpacingType = "none" | "sm" | "md" | "lg" | "xl";

export default function MoreStories({ posts, spacing = "lg" }: { posts: any[], spacing?: SpacingType }) {
	return (
		<Section spacing={spacing}>
			<Container>
				{/* Section header */}
				<div className="mx-auto max-w-2xl lg:text-center mb-12">
					<h2 className="font-semibold leading-7 text-primary">
						Continue Reading
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
						More Stories
					</p>
					<p className="mt-4 text-lg leading-8 text-base-content/70">
						Discover more of our articles and insights.
					</p>
				</div>

				{/* Posts grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
					{posts.map(({ node }) => (
						<PostPreview
							key={node.slug}
							title={node.title}
							coverImage={node.featuredImage}
							date={node.date}
							author={node.author}
							slug={node.slug}
							excerpt={node.excerpt}
						/>
					))}
				</div>
			</Container>
		</Section>
	);
}
