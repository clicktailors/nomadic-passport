import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParallaxEffect, handleSmoothScroll } from "../../../hooks/effects";
import { styles } from "../../../lib/styles";

import Section from "../../ui/Section";
import Container from "../../ui/Container";

export default function Hero({ content }: { content: any }) {
	const { hero } = styles;

	return (
		<Section>
			<Container>
				<div className="hero min-h-[60vh] mt-12">
					{/* Glowing gradient background with radial fade */}
					<motion.div
						className={`${styles.blur} ${styles.blurColor}`}
					></motion.div>

					<div className={hero.main}>
						{/* Hero text */}
						<div className={hero.textArea}>
							<h1
								className={`${hero.header} mb-8 ${
									content.header2 ? "flex flex-col" : ""
								}`}
							>
								{content.header}
								{content.header2 && (
									<>
										<br />
										<span className="text-primary font-mono text-4xl">
											{content.header2}
										</span>
									</>
								)}
							</h1>
							<p className={hero.subheader}>
								{content.subheader}
							</p>

							{/* Buttons */}
							<div className="flex flex-row gap-4 lg:flex-row">
								<button className={hero.button}>
									<Link
										href={content.buttonLink}
										// onClick={handleSmoothScroll}
										className="flex items-center gap-2"
									>
										{content.buttonIcon}
										{content.button}
									</Link>
								</button>
								<button
									className={`btn btn-outline btn-primary`}
								>
									<Link
										href={content.buttonSecondaryLink}
										// onClick={handleSmoothScroll}
										className="flex items-center gap-2"
									>
										{content.buttonSecondaryIcon}
										{content.buttonSecondary}
									</Link>
								</button>
							</div>
						</div>

						{/* Hero image */}
						<div className="w-full lg:w-1/2 relative h-96 lg:h-96">
							<Image
								src={content.image}
								alt="Hero"
								layout="fill"
								objectFit="contain"
								className={hero.image}
							/>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
}
