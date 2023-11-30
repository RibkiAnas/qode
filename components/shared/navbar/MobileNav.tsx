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
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
	ChevronsUpDown,
	HelpCircleIcon,
	HomeIcon,
	LogOutIcon,
	SettingsIcon,
	StarIcon,
	TagIcon,
	UserIcon,
	UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
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
	const router = useRouter();

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
				<div
					className={cn("relative z-20 flex items-center text-lg font-medium")}
				>
					<Link
						href="/"
						className="flex items-center justify-center rounded bg-primary-500 p-1.5 focus:outline-none focus:ring-1 focus:ring-[#e2995f] focus:ring-offset-2 focus:ring-offset-gray-900"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={cn("text-light-900 h-6 w-6")}
						>
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
						</svg>
					</Link>

					<p
						className={cn(
							"h2-bold  text-dark100_light900 font-spaceGrotesk ml-2"
						)}
					>
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
								<Button
									className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
									onClick={() => {
										if (!userData) router.push("/sign-in?callbackUrl=/");
									}}
								>
									<span className="primary-text-gradient">Log In</span>
								</Button>
							</SheetClose>
						</div>
					) : (
						<div className="background-light900_dark200 flex items-center justify-between py-4 pl-6">
							<div className="flex items-center">
								<div className="absolute z-50 h-8 w-8 rounded-full before:absolute before:bottom-0 before:right-0 before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:ring-1 before:ring-white"></div>
								<Avatar
									className="h-9 w-9
								"
								>
									<AvatarImage
										src={userData?.user?.image || ""}
										alt="User Image"
									/>
									<AvatarFallback>
										{userData.user.name?.slice(0, 1)}
									</AvatarFallback>
								</Avatar>
								<div className={cn("flex flex-col pl-3")}>
									<div className="text-dark400_light700 text-sm">
										{userData?.user?.name}
									</div>
									<span className="text-xs font-light tracking-tight text-gray-500">
										{userData?.user?.email}
									</span>
								</div>
							</div>
							<Menubar className="relative border-none bg-transparent shadow-none">
								<MenubarMenu>
									<MenubarTrigger>
										<div
											className={cn(
												"text-gray-400 background-light800_dark300 rounded focus:outline-none focus:ring-1 cursor-pointer focus:ring-gray-500 dark:focus:text-white"
											)}
										>
											<ChevronsUpDown className="h-4 w-4 stroke-current" />
										</div>
									</MenubarTrigger>
									<MenubarContent className="absolute bottom-0 right-[-13rem] min-w-[120px]  rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
										<MenubarItem
											className="flex cursor-pointer items-center gap-4 px-2.5 py-2 text-gray-500 focus:bg-light-800 dark:focus-within:text-light-900  dark:hover:text-light-900 dark:focus:bg-dark-400"
											inset
										>
											<SettingsIcon className="h-5 w-5" />
											<Link
												//	@ts-ignore
												// href={`/profile/${userData.user._id}`}
												href="/profile/edit"
												className="flex w-full items-center justify-start  rounded text-xs"
											>
												Manage account
											</Link>
										</MenubarItem>
										<MenubarItem
											className="flex cursor-pointer items-center gap-4 px-2.5 py-2
										text-gray-500 focus:bg-light-800 dark:focus-within:text-light-900  dark:hover:text-light-900 dark:focus:bg-dark-400"
											inset
										>
											<LogOutIcon className="h-5 w-5" />
											<button
												className="flex w-full items-center justify-start  rounded text-xs"
												onClick={() => signOut()}
											>
												Sign out
											</button>
										</MenubarItem>
									</MenubarContent>
								</MenubarMenu>
							</Menubar>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
