export default function PostTitle({ children }: { children: string }) {
	return (
		<h1
			className="text-6xl md:text-7xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none my-12 text-left"
			dangerouslySetInnerHTML={{ __html: children }}
		/>
	);
}
