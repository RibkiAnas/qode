"use client";
import { cn } from "@/lib/utils";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	Briefcase,
	ChevronsUpDown,
	HelpCircleIcon,
	HomeIcon,
	LogInIcon,
	LogOutIcon,
	SettingsIcon,
	StarIcon,
	TagIcon,
	UserIcon,
	UsersIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "../ui/menubar";

function LeftSidebar() {
	const { data: userData } = useSession();
	const pathname = usePathname();
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	const toggleSidebar = () => {
		setIsCollapsed((prev) => !prev);
	};
	return (
		<>
			<div
				className={cn(
					"fixed items-center justify-center left-[200px] top-[3rem]  p-1 rounded background-light800_dark300 focus:outline-none focus:ring-1 cursor-pointer focus:ring-gray-500 z-50 hidden sm:flex",
					isCollapsed ? "left-[110px]" : ""
				)}
				onClick={toggleSidebar}
			>
				{isCollapsed ? (
					<ArrowRightIcon className="text-dark400_light700 h-3 w-3 stroke-current" />
				) : (
					<ArrowLeftIcon className="text-dark400_light700 h-3 w-3 stroke-current" />
				)}
			</div>
			<div
				className={cn(
					"background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto overflow-x-hidden border-r shadow-light-300 dark:shadow-none max-sm:hidden",
					isCollapsed ? "w-24" : ""
				)}
			>
				<div className="px-6 pt-10">
					<div
						className={cn(
							"flex items-center gap-1",
							isCollapsed ? "justify-center" : ""
						)}
					>
						<Link
							href="/"
							className="flex items-center justify-center rounded bg-primary-500 p-1.5 focus:outline-none focus:ring-1 focus:ring-[#e2995f] focus:ring-offset-2 focus:ring-offset-gray-900"
						>
							<svg
								className="h-5 w-5 stroke-current text-white"
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
						<p
							className={cn(
								"h2-bold  text-dark100_light900 font-spaceGrotesk",
								isCollapsed ? "hidden" : ""
							)}
						>
							Q<span className="text-primary-500">ode</span>
						</p>
					</div>
				</div>
				<div className="px-6 pt-7">
					<hr className="border-gray-700" />
				</div>
				<div className="h-full px-6 pt-4">
					<ul className="flex flex-col gap-6">
						{sidebarLinks.map((item) => {
							const isActive =
								(pathname.includes(item.route) && item.route.length > 1) ||
								pathname === item.route;

							if (item.route === "/profile") {
								if (userData?.user?._id) {
									item.route = `${item.route}/${userData?.user._id}`;
								} else {
									return null;
								}
							}
							return (
								<li
									key={item.label}
									className={cn(
										"relative text-gray-500 hover:text-light-900 focus-within:text-light-900",
										isActive ? "primary-gradient rounded text-light-900" : ""
									)}
								>
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										{item.label === "Home" && <HomeIcon className="h-5 w-5" />}
										{item.label === "Community" && (
											<UsersIcon className="h-5 w-5" />
										)}
										{item.label === "Collections" && (
											<StarIcon className="h-5 w-5" />
										)}
										{item.label === "Find Jobs" && (
											<Briefcase className="h-5 w-5" />
										)}
										{item.label === "Tags" && <TagIcon className="h-5 w-5" />}
										{item.label === "Profile" && (
											<UserIcon className="h-5 w-5" />
										)}
										{item.label === "Ask a question" && (
											<HelpCircleIcon className="h-5 w-5" />
										)}
									</div>
									<Link
										href={item.route}
										className={cn(
											"flex items-center justify-start w-full gap-4 p-2 pl-10 text-xs rounded hover:primary-gradient",
											isCollapsed ? "p-5" : ""
										)}
									>
										<p
											className={cn("base-medium", isCollapsed ? "hidden" : "")}
										>
											{item.label}
										</p>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{userData?.user ? (
					<div className="background-light900_dark200 flex items-center justify-between py-4 pl-6">
						<div className="flex items-center">
							<div className="absolute z-50 h-8 w-8 rounded-full before:absolute before:bottom-0 before:right-0 before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:ring-1 before:ring-white"></div>
							<Avatar
								className="h-9 w-9
								"
							>
								<AvatarImage src={userData?.user?.picture} alt="User Image" />
								<AvatarFallback>
									{userData.user.name?.slice(0, 1)}
								</AvatarFallback>
							</Avatar>
							<div
								className={cn(
									"flex flex-col pl-3",
									isCollapsed ? "hidden" : ""
								)}
							>
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
									<button
										className={cn(
											"text-gray-400 background-light800_dark300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:text-white",
											isCollapsed ? "hidden" : ""
										)}
									>
										<ChevronsUpDown className="h-4 w-4 stroke-current" />
									</button>
								</MenubarTrigger>
								<MenubarContent className="absolute bottom-0 right-[-13rem] min-w-[120px]  rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
									<MenubarItem
										className="flex cursor-pointer items-center gap-4 px-2.5 py-2 text-gray-500 focus:bg-light-800 dark:focus-within:text-light-900  dark:hover:text-light-900 dark:focus:bg-dark-400"
										inset
									>
										<SettingsIcon className="h-5 w-5" />
										<Link
											href={`profile/${userData.user._id}`}
											className="flex w-full items-center justify-start  rounded text-xs  focus:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
											onClick={() => signOut()}
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
											className="flex w-full items-center justify-start  rounded text-xs  focus:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
											onClick={() => signOut()}
										>
											Sign out
										</button>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
					</div>
				) : (
					<div className="flex w-full flex-col gap-3 p-3">
						<Link href="/sign-in">
							<Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
								{isCollapsed ? (
									<LogInIcon className="text-dark400_light700 h-5  w-5" />
								) : (
									<span className="primary-text-gradient">Log In</span>
								)}
							</Button>
						</Link>
					</div>
				)}
			</div>
		</>
	);
}

export default LeftSidebar;
