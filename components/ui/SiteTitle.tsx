import React from "react";
import Link from "next/link";
import { SITE_NAME } from "../../lib/constants";
import { SiteLogo } from "../../lib/SiteLogo";
import { styles } from "../../lib/styles";
interface SiteTitleProps {
	siteName?: string;
	size?: "text-2xl" | "text-4xl" | "text-5xl" | "text-6xl";
	logoSize?: "size-6" | "size-8" | "size-10" | "size-12";
	inverted?: boolean;
}

const SiteTitle: React.FC<SiteTitleProps> = ({
	siteName = SITE_NAME,
	size = "text-4xl",
	logoSize = "size-6",
	inverted = false,
}) => (
	<div className="flex items-center mx-2 font-semibold text-xl">
		<div className="flex items-center">
			<SiteLogo className="mx-1" size={logoSize} inverted={inverted} />
			<Link href="/">
				<h3
					className={`${size} ${styles.siteTitle} ${
						inverted && "text-lightText"
					}`}
				>
					<span className={styles.siteTitleGradient}>
						{siteName.slice(0, styles.gradientLength)}
					</span>
					{siteName.slice(styles.gradientLength)}.
				</h3>
			</Link>
		</div>
	</div>
);

export default SiteTitle;
