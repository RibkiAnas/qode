import React from "react";
// import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

function Navbar() {
	return (
		<nav className="flex-between sticky top-0 z-20 w-full gap-5 bg-dark-200 p-6 dark:shadow-none sm:pl-14">
			<div className="flex w-full items-center justify-center">
				<GlobalSearch />
			</div>
			{/* <Theme /> */}
			<MobileNav />
		</nav>
	);
}

export default Navbar;
