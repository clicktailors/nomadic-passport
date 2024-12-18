import Link from "next/link";

export default function Credits() {
	const credits = [
		{
			name: "Real Estate Vectors",
			link: "https://www.vecteezy.com/free-vector/real-estate",
		},
		{
			name: "ClickTailors",
			link: "https://clicktailors.com",
		},
		{
			name: "FreePik",
			link: "https://www.freepik.com",
		},
	];

	const links = credits.map((credit) => (
		<Link className="text-xs" key={credit.link} href={credit.link}>
			{credit.name}
		</Link>
	));

	const CardModal = ({ links }: { links: React.ReactNode }) => {
		return (
			<div className="dropdown dropdown-top">
				<div tabIndex={0} role="button" className="text-xs">
					Credits
				</div>
				<ul
					tabIndex={0}
					className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-2"
				>
					{links}
				</ul>
			</div>
		);
	};
	return <CardModal links={links} />;
}
