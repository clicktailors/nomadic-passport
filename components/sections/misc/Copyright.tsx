import { COMPANY_NAME } from "../../../lib/constants";
import Credits from "./Credits";
import ThemeSwitcher from "../../ui/ThemeSwitcher";
import Link from "next/link";

const Copyright = () => (
	<aside className="text-center">
		<ThemeSwitcher />
		<p className="text-xs">
			{`All rights reserved by `}
			<br />
			<span className="text-xs">{COMPANY_NAME}</span>
		</p>
		<p className="text-xs">Copyright © 2024</p>
		<p className="text-xs">
			{`Designed by `}
			<Link className="text-xs text-primary" href="https://clicktailors.com">
				ClickTailors
			</Link>
		</p>
		<Credits />
	</aside>
);

export default Copyright;