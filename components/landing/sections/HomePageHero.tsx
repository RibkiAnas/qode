"use client";
import React from "react";
import { Button, Highlight } from "@/components/landing/Button";

import { Hero, HeroSubtitle, HeroTitle } from "@/components/landing/Hero";
import { ChevronRightIcon } from "lucide-react";
import HeroImage from "../HeroImage";
import { useSession } from "next-auth/react";

function HomePageHero() {
	const { data: userData } = useSession();

	return (
		<Hero>
			<Button
				className="translate-y-[-1rem] animate-fade-in opacity-0"
				href="/"
				variant="secondary"
				size="small"
			>
				<span>Qode 2023 Release</span> <Highlight>→</Highlight>
			</Button>
			<HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
				Every developer has a tab open
				<br className="hidden md:block" /> to Qode
			</HeroTitle>
			<HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
				A community-based space to find and contribute answers to technical
				challenges,
				<br className="hidden md:block" /> and one of the most popular websites
				in the world.
			</HeroSubtitle>
			<Button
				className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]"
				href="/app"
				variant="primary"
				size="large"
			>
				{userData ? <span>App </span> : <span>Get Started </span>}
				<Highlight>
					<ChevronRightIcon />
				</Highlight>
			</Button>
			<HeroImage />
		</Hero>
	);
}

export default HomePageHero;
