export interface ThirdPartyScript {
	id: string;
	src?: string;
	strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload";
	innerHTML?: string;
	async?: boolean;
	defer?: boolean;
	nonce?: string;
}

export interface ThirdPartyMetaTag {
	id: string;
	name?: string;
	property?: string;
	content: string;
}

export const thirdPartyScripts: ThirdPartyScript[] = [
	// {
	// 	id: "facebook-pixel",
	// 	strategy: "beforeInteractive",
	// 	src: "https://connect.facebook.net/en_US/fbevents.js",
	// 	innerHTML: `
	// 		try {
	// 			window.fbq = window.fbq || function() {
	// 				(window.fbq.q = window.fbq.q || []).push(arguments)
	// 			};
	// 			window._fbq = window._fbq || window.fbq;
	// 			window.fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
	// 			window.fbq('track', 'PageView');
	// 		} catch (error) {
	// 			console.debug("Facebook Pixel initialization unavailable");
	// 		}
	// 	`,
	// },
];

export const thirdPartyMetaTags: ThirdPartyMetaTag[] = [
	{
		id: "pinterest-verification",
		name: "p:domain_verify",
		content: "52ef2a40792e1120add9c27ecc08a51c",
	},
	{
		id: "facebook-domain-verification",
		name: "facebook-domain-verification",
		content: process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || "",
	},
];
