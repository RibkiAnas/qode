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
			<button
				className={cn(
					"fixed items-center justify-center left-[200px] top-[3rem]  p-1 rounded background-light800_dark300 focus:outline-none focus:ring-1 focus:ring-gray-500 z-50 hidden sm:flex",
					isCollapsed ? "left-[110px]" : ""
				)}
				onClick={toggleSidebar}
			>
				{isCollapsed ? (
					<ArrowRightIcon className="w-3 h-3 text-dark400_light700 stroke-current" />
				) : (
					<ArrowLeftIcon className="w-3 h-3 text-dark400_light700 stroke-current" />
				)}
			</button>
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
							className="bg-primary-500 p-1.5 rounded flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#e2995f] focus:ring-offset-2 focus:ring-offset-gray-900"
						>
							<svg
								className="w-5 h-5 text-white stroke-current"
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
				<div className="px-6 pt-4 h-full">
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
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										{item.label === "Home" && <HomeIcon className="w-5 h-5" />}
										{item.label === "Community" && (
											<UsersIcon className="w-5 h-5" />
										)}
										{item.label === "Collections" && (
											<StarIcon className="w-5 h-5" />
										)}
										{item.label === "Find Jobs" && (
											<Briefcase className="w-5 h-5" />
										)}
										{item.label === "Tags" && <TagIcon className="w-5 h-5" />}
										{item.label === "Profile" && (
											<UserIcon className="w-5 h-5" />
										)}
										{item.label === "Ask a question" && (
											<HelpCircleIcon className="w-5 h-5" />
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
					<div className="pl-6 py-4 background-light900_dark200 flex items-center justify-between">
						<div className="flex items-center">
							<div className="absolute w-8 h-8 z-50 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white"></div>
							<Avatar
								className="w-9 h-9
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
								<div className="text-sm text-dark400_light700">
									{userData?.user?.name}
								</div>
								<span className="text-xs text-gray-500 font-light tracking-tight">
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
										<ChevronsUpDown className="w-4 h-4 stroke-current" />
									</button>
								</MenubarTrigger>
								<MenubarContent className="absolute bottom-0 right-[-13rem] min-w-[120px]  rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
									<MenubarItem
										className="flex cursor-pointer items-center text-gray-500 dark:hover:text-light-900 dark:focus-within:text-light-900 gap-4 px-2.5 py-2  focus:bg-light-800 dark:focus:bg-dark-400"
										inset
									>
										<SettingsIcon className="w-5 h-5" />
										<Link
											href={`profile/${userData.user._id}`}
											className="flex items-center justify-start w-full  text-xs rounded  focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
											onClick={() => signOut()}
										>
											Manage account
										</Link>
									</MenubarItem>
									<MenubarItem
										className="flex cursor-pointer items-center text-gray-500 dark:hover:text-light-900 dark:focus-within:text-light-900
										gap-4 px-2.5 py-2  focus:bg-light-800 dark:focus:bg-dark-400"
										inset
									>
										<LogOutIcon className="w-5 h-5" />
										<button
											className="flex items-center justify-start w-full  text-xs rounded  focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
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
					<div className="flex flex-col gap-3 p-3 w-full">
						<Link href="/sign-in">
							<Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
								{isCollapsed ? (
									<LogInIcon className="w-5 h-5  text-dark400_light700" />
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
