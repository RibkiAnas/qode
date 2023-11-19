import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="background-light850_dark100">
			<div className="flex">
				<LeftSidebar />
				<section className="flex min-h-screen flex-1 flex-col">
					<Navbar />
					<div className="mx-auto w-full pt-36 pl-6 pr-[18rem] pb-6 max-md:pb-14 sm:pl-14 max-xl:pr-6">
						{children}
					</div>
				</section>
				<RightSidebar />
			</div>
		</main>
	);
}

export default layout;
