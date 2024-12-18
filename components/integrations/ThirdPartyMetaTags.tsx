import { thirdPartyMetaTags } from "../../lib/third-party";

export default function ThirdPartyMetaTags() {
	return (
		<>
			{thirdPartyMetaTags.map((tag) => (
				<meta
					key={tag.id}
					name={tag.name}
					property={tag.property}
					content={tag.content}
				/>
			))}
		</>
	);
}
