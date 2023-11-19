import React from "react";
import GlobalSearch from "../search/GlobalSearch";
import Theme from "./Theme";
import MobileNav from "./MobileNav";

function Navbar() {
	return (
		<nav className="flex-between background-light900_dark200 sticky top-0 w-full gap-5 pt-6 pb-6 px-6 sm:pl-14 shadow-light-300 dark:shadow-none">
			<GlobalSearch />
			<Theme />
			<MobileNav />
		</nav>
	);
}

export default Navbar;
