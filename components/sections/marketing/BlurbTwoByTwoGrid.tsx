import React from "react";
import Blurb from "./Blurb";
import TwoByTwoGrid from "./TwoByTwoGrid";
import { convertToId } from "../../../utils/formatters";
import Section from "../../ui/Section";
import Container from "../../ui/Container";
import * as icons from "@heroicons/react/24/outline";

export interface BlurbTwoByTwoGridContent {
	blurb: {
		sectionTitle: string;
		sectionHeading: string;
		sectionSummary: string;
	};
	features: Array<{
		name: string;
		description: string;
		icon: keyof typeof icons;
	}>;
}

export default function BlurbTwoByTwoGrid({
	content,
}: {
	content: BlurbTwoByTwoGridContent;
}) {
	const { blurb, features } = content;
	const sectionTitle = blurb?.sectionTitle || "Default Section Title";

	return (
		<Section>
			<Container>
				<div id={convertToId(sectionTitle)}>
					<Blurb blurb={blurb} />
					<TwoByTwoGrid features={features} />
				</div>
			</Container>
		</Section>
	);
}
