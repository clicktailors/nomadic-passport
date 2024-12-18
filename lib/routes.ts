interface Route {
	name: string;
	path: string;
	footerOnly?: boolean;
}

const routes: Route[] = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Blog",
		path: "/blog",
	},
	{
		name: "Contact",
		path: "/contact",
	},
	{
		name: "Privacy Policy",
		path: "/privacy-policy",
		footerOnly: true,
	},
	{
		name: "Terms of Service",
		path: "/terms-of-service",
		footerOnly: true,
	},
];

export default routes;
