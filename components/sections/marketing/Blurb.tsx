interface BlurbContent {
	sectionTitle?: string;
	sectionHeading?: string;
	sectionSummary?: string;
}

export default function Blurb({ blurb = {} }: { blurb: BlurbContent }) {
	const {
		sectionTitle = "",
		sectionHeading = "",
		sectionSummary = "",
	} = blurb;
	return (
		<div className="mx-auto max-w-2xl lg:text-center">
			{sectionTitle && (
				<h2 className="text-primary font-semibold leading-7">
					{sectionTitle}
				</h2>
			)}
			{sectionHeading && (
				<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
					{sectionHeading}
				</p>
			)}
			{sectionSummary && (
				<p className="mt-6 text-lg leading-8">{sectionSummary}</p>
			)}
		</div>
	);
}
