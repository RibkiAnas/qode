import { cn } from "@/lib/utils";
import React from "react";

interface HeroProps {
	children: React.ReactNode;
}

interface HeroElementProps {
	children: React.ReactNode;
	className?: string;
}

export const HeroTitle = ({ children, className }: HeroElementProps) => {
	return (
		<h1
			className={cn(
				"my-6 text-6xl md:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]",
				className
			)}
		>
			{children}
		</h1>
	);
};

export const HeroSubtitle = ({ children, className }: HeroElementProps) => {
	return (
		<p
			className={cn(
				"mb-12 text-[1.8rem] text-primary-text md:text-[2.2rem] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]",
				className
			)}
		>
			{children}
		</p>
	);
};

export const Hero = ({ children }: HeroProps) => {
	return <div className="text-center">{children}</div>;
};
