import Section from "../ui/Section";
import Container from "../ui/Container";
import { cn } from "../../utils/cn";

export default function PostBody({ content }: { content: string }) {
	return (
		<Section id="post-body">
			<Container>
				<div
					className={cn(
						"prose prose-lg max-w-none",
						"prose-headings:font-bold",
						"prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4",
						"prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4",
						"prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-4",
						"prose-p:my-6 prose-p:leading-relaxed",
						"prose-a:underline hover:prose-a:no-underline",
						"prose-blockquote:border-l-4 prose-blockquote:border-gray-500",
						"prose-blockquote:bg-gray-200 prose-blockquote:italic",
						"prose-blockquote:ml-0 prose-blockquote:py-4 prose-blockquote:px-6",
						"prose-pre:whitespace-pre prose-pre:overflow-x-auto",
						"prose-pre:p-4 prose-pre:text-sm prose-pre:leading-tight",
						"prose-pre:border prose-pre:border-gray-400 prose-pre:bg-gray-100",
						"prose-img:rounded-xl prose-img:my-2",
						"[&_.wp-block-button]:btn [&_.wp-block-button]:btn-primary",
						"[&_.wp-block-button_a]:text-primary-content",
						"[&_.wp-block-button__link]:text-primary-content",
						"[&_.wp-block-image]:rounded-xl",
						"[&_.wp-block-video_video]:rounded-xl"
					)}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</Container>
		</Section>
	);
}
