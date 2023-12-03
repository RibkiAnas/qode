import React from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

function Footer() {
	return (
		<div className=" pt-4 sm:pt-10 lg:pt-12">
			<footer className="mx-auto max-w-[120rem]  px-4 md:px-8">
				<div className="flex flex-col items-center justify-between gap-4 border-y border-transparent-white py-6 md:flex-row">
					{/* nav - start */}
					<nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
						<a
							href="#features"
							className="text-grey transition-colors hover:text-off-white"
						>
							Features
						</a>
						<Link
							href="/about"
							className="text-grey transition-colors hover:text-off-white"
						>
							About
						</Link>
					</nav>
					{/* nav - end */}
					{/* social - start */}
					<div className="flex gap-4">
						<a
							href="https://twitter.com/AnasRibki"
							target="_blank"
							className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
						>
							<TwitterIcon />
						</a>
						<a
							href="https://www.linkedin.com/in/anas-ribki"
							target="_blank"
							className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
						>
							<LinkedinIcon />
						</a>
						<a
							href="https://github.com/RibkiAnas"
							target="_blank"
							className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
						>
							<GithubIcon />
						</a>
					</div>
					{/* social - end */}
				</div>
				<div className="py-8 text-center text-sm text-gray-400">
					© 2023 - Present Qode. All rights reserved.
				</div>
			</footer>
		</div>
	);
}

export default Footer;
