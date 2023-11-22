import React from "react";
import GlobalSearch from "../search/GlobalSearch";
import Theme from "./Theme";
import MobileNav from "./MobileNav";

function Navbar() {
	return (
		<nav className="flex-between background-light900_dark200 sticky top-0 z-20 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:pl-14">
			<GlobalSearch />
			<Theme />
			<MobileNav />
		</nav>
	);
}

export default Navbar;
