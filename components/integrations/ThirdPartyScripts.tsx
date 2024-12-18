"use client";

import Script from "next/script";
import { thirdPartyScripts, thirdPartyMetaTags } from "../../lib/third-party";

export default function ThirdPartyScripts() {
	return (
		<>
			{thirdPartyScripts.map((script) => (
				<Script
					key={script.id}
					id={script.id}
					strategy={script.strategy}
					src={script.src}
					dangerouslySetInnerHTML={
						script.innerHTML
							? { __html: script.innerHTML }
							: undefined
					}
					async={script.async}
					defer={script.defer}
					nonce={script.nonce}
				/>
			))}
		</>
	);
}
