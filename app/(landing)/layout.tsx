import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="background-light850_dark100 text-dark100_light900 mx-auto min-h-screen w-full overflow-hidden scroll-smooth">
			<Header />
			<main className="bg-page-gradient pt-[var(--navigation-height)]">
				{children}
			</main>
			<Footer />
		</div>
	);
}

export default layout;
