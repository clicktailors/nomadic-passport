export default function FacebookNoscript() {
	return (
		<noscript>
			<img
				height="1"
				width="1"
				style={{ display: "none" }}
				src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
				alt=""
			/>
		</noscript>
	);
}
