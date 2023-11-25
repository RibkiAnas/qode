"use client";
import React from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
	HelpCircleIcon,
	HomeIcon,
	StarIcon,
	TagIcon,
	UserIcon,
	UsersIcon,
} from "lucide-react";
const NavContent = () => {
	const pathname = usePathname();
	return (
		<section className="flex h-full flex-col gap-5 pt-16">
			<ul className="no-scrollbar flex h-[70svh] flex-col space-y-3 overflow-y-auto scroll-smooth p-1">
				{sidebarLinks.map((item) => {
					const isActive =
						(pathname.includes(item.route) && item.route.length > 1) ||
						pathname === item.route;
					return (
						<SheetClose asChild key={item.route}>
							<li className="relative">
								<Link
									href={item.route}
									className={`${
										isActive
											? "primary-gradient rounded text-light-900"
											: "text-dark300_light900"
									} flex items-center justify-start gap-4 rounded bg-transparent p-4`}
								>
									{item.label === "Home" && <HomeIcon className="h-5 w-5" />}
									{item.label === "Community" && (
										<UsersIcon className="h-5 w-5" />
									)}
									{item.label === "Collections" && (
										<StarIcon className="h-5 w-5" />
									)}
									{/* {item.label === "Find Jobs" && (
										<Briefcase className="h-5 w-5" />
									)} */}
									{item.label === "Tags" && <TagIcon className="h-5 w-5" />}
									{item.label === "Profile" && <UserIcon className="h-5 w-5" />}
									{item.label === "Ask a question" && (
										<HelpCircleIcon className="h-5 w-5" />
									)}
									<p className={`${isActive ? "base-bold" : "base-medium"}`}>
										{item.label}
									</p>
								</Link>
							</li>
						</SheetClose>
					);
				})}
			</ul>
		</section>
	);
};
const MobileNav = () => {
	const { data: userData } = useSession();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Image
					src="/assets/icons/hamburger.svg"
					alt="menu"
					width={36}
					height={36}
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="background-light900_dark200 border-none"
			>
				<div className="flex items-center gap-1">
					<Link
						href="/"
						className="flex items-center justify-center rounded bg-primary-500 p-1.5 focus:outline-none focus:ring-1 focus:ring-[#e2995f] focus:ring-offset-2 focus:ring-offset-gray-900"
					>
						<svg
							className="h-6 w-6 stroke-current text-white"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M9.25 12L4.75 15L12 19.25L19.25 15L14.6722 12"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Link>
					<p className="h2-bold  text-dark100_light900 font-spaceGrotesk">
						Q<span className="text-primary-500">ode</span>
					</p>
				</div>
				<div>
					<SheetClose asChild>
						<NavContent />
					</SheetClose>
					{!userData?.user ? (
						<div className="absolute bottom-3 flex w-[85%] flex-col gap-3 pt-3">
							<SheetClose asChild>
								<Link href="/sign-in">
									<Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
										<span className="primary-text-gradient">Log In</span>
									</Button>
								</Link>
							</SheetClose>
						</div>
					) : null}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
