import { Html, Head, Main, NextScript } from "next/document";
import ThirdPartyMetaTags from "../components/integrations/ThirdPartyMetaTags";
import FacebookNoscript from "../components/integrations/facebook/noscript";
import Integrations from "../components/integrations/integrations";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<ThirdPartyMetaTags />
				<FacebookNoscript />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
