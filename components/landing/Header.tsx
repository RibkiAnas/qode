"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Button } from "./Button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
	ChevronRightIcon,
	GithubIcon,
	LinkedinIcon,
	TwitterIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Header() {
	const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
	const router = useRouter();
	const { data: userData } = useSession();

	useEffect(() => {
		const html = document.querySelector("html");
		if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
	}, [hamburgerMenuIsOpen]);

	useEffect(() => {
		const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);

		window.addEventListener("orientationchange", closeHamburgerNavigation);
		window.addEventListener("resize", closeHamburgerNavigation);

		return () => {
			window.removeEventListener("orientationchange", closeHamburgerNavigation);
			window.removeEventListener("resize", closeHamburgerNavigation);
		};
	}, [setHamburgerMenuIsOpen]);

	return (
		<header className="fixed left-0 top-0 z-50 w-full border-b border-transparent-white backdrop-blur-[12px]">
			<Container className="flex h-[var(--navigation-height)]">
				<Link href="/" className="flex items-center text-xl">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={cn("text-light-900 h-7 w-7 mr-4")}
					>
						<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
					</svg>
					Qode
				</Link>
				<div
					className={cn(
						"transition-[visibility] md:visible",
						hamburgerMenuIsOpen ? "visible" : "delay-500 invisible"
					)}
				>
					<nav
						className={cn(
							"fixed flex flex-col top-[var(--navigation-height)] left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto background-light850_dark100 transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none",
							hamburgerMenuIsOpen
								? "translate-x-0 opacity-100 background-light850_dark100"
								: "translate-x-[-100vw] opacity-0"
						)}
					>
						<ul
							className={cn(
								"flex h-full flex-col md:flex-row md:items-center [&_li]:ml-6 [&_li]:border-grey-dark md:[&_li]:border-none ease-in [&_a:hover]:text-grey [&_a]:flex [&_a]:h-[var(--navigation-height)] [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-[1.2rem] [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 [&_a]:md:transition-colors"
							)}
						>
							<li>
								<Link
									href="#features"
									onClick={() => {
										if (hamburgerMenuIsOpen) setHamburgerMenuIsOpen(false);
									}}
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									onClick={() => setHamburgerMenuIsOpen(false)}
								>
									About
								</Link>
							</li>
						</ul>
						<div className="flex items-center justify-between p-8 md:hidden">
							{userData ? (
								<Button
									variant="primary"
									className="pr-2 text-[1.4rem]"
									href="/app"
									onClick={() => setHamburgerMenuIsOpen(false)}
								>
									App
									<ChevronRightIcon className="ml-2" />
								</Button>
							) : (
								<Button
									variant="primary"
									className="text-[1.4rem]"
									onClick={() => {
										router.push("/sign-in?callbackUrl=/");
									}}
								>
									Log in
								</Button>
							)}
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
						</div>
					</nav>
				</div>

				<div className="ml-auto hidden h-full  items-center md:flex">
					{userData ? (
						<Button
							variant="primary"
							className="pr-2 text-[1.4rem]"
							href="/app"
						>
							App
							<ChevronRightIcon className="ml-2" />
						</Button>
					) : (
						<Button
							variant="primary"
							className="text-[1.4rem]"
							onClick={() => {
								router.push("/sign-in?callbackUrl=/");
							}}
						>
							Log in
						</Button>
					)}
				</div>
				<button
					className="absolute right-0 m-6 md:hidden"
					onClick={() => setHamburgerMenuIsOpen((open) => !open)}
				>
					<span className="sr-only">Toggle menu</span>
					<HamburgerMenuIcon className="h-7 w-7" />
				</button>
			</Container>
		</header>
	);
}

export default Header;
