"use client";
import React from "react";
import { Button, Highlight } from "../Button";
import { ChevronRightIcon } from "lucide-react";
import { HeroSubtitle, HeroTitle } from "../Hero";
import { useSession } from "next-auth/react";

function BottomHomePage() {
	const { data: userData } = useSession();

	return (
		<>
			<HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
				Every developer has
				<br className="hidden md:block" />a tab open to Qode
			</HeroTitle>
			<HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
				A community-based space to find and contribute answers{" "}
				<br className="hidden md:block" /> to technical challenges, and one of
				the most <br className="hidden md:block" /> popular websites in the
				world.
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
		</>
	);
}

export default BottomHomePage;
