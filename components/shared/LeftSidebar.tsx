"use client";
import { cn } from "@/lib/utils";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
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
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "../ui/menubar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

function LeftSidebar() {
	const { data: userData } = useSession();
	const pathname = usePathname();
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	const router = useRouter();

	const toggleSidebar = () => {
		setIsCollapsed((prev) => !prev);
	};
	return (
		<>
			<div
				className={cn(
					"fixed items-center justify-center left-[200px] top-[3rem]  p-1 rounded bg-dark-300 focus:outline-none focus:ring-1 cursor-pointer focus:ring-gray-500 z-50 flex max-sm:hidden",
					isCollapsed ? "left-[110px]" : ""
				)}
				onClick={toggleSidebar}
			>
				{isCollapsed ? (
					<ArrowRightIcon className="h-3 w-3 stroke-current text-light-700" />
				) : (
					<ArrowLeftIcon className="h-3 w-3 stroke-current text-light-700" />
				)}
			</div>
			<div
				className={cn(
					"bg-dark-200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto overflow-x-hidden border-r shadow-light-300 dark:shadow-none max-sm:hidden ease-in-out",
					isCollapsed ? "w-24" : ""
				)}
			>
				<div className="px-6 pt-10">
					<div
						className={cn(
							"relative z-20 flex items-center text-lg font-medium",
							isCollapsed ? "justify-center" : ""
						)}
					>
						<Link
							href="/"
							className="flex items-center justify-center rounded bg-primary-500 p-1.5 "
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={cn(
									"text-light-900 h-6 w-6",
									isCollapsed ? "m-0" : ""
								)}
							>
								<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
							</svg>
						</Link>

						<p
							className={cn(
								"h2-bold  text-light-900 font-spaceGrotesk ml-2",
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
								//	@ts-ignore
								if (userData?.user?._id) {
									//	@ts-ignore
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
										{/* {item.label === "Find Jobs" && (
											<Briefcase className="h-5 w-5" />
										)} */}
										{item.label === "Tags" && <TagIcon className="h-5 w-5" />}
										{item.label === "Profile" && (
											<UserIcon className="h-5 w-5" />
										)}
										{item.label === "Ask a question" && (
											<HelpCircleIcon className="h-5 w-5" />
										)}
									</div>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Link
													href={item.route}
													className={cn(
														"flex items-center justify-start w-full gap-4 p-2 pl-10 text-xs rounded hover:primary-gradient",
														isCollapsed ? "p-5" : ""
													)}
												>
													<p
														className={cn(
															"base-medium",
															isCollapsed ? "hidden" : ""
														)}
													>
														{item.label}
													</p>
												</Link>
											</TooltipTrigger>
											<TooltipContent
												className={cn(
													"bg-dark-200 text-dark100_light900",
													isCollapsed ? "" : "hidden"
												)}
												side="left"
											>
												<p>{item.label}</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</li>
							);
						})}
					</ul>
				</div>
				{userData?.user ? (
					<div className="flex items-center justify-between bg-dark-200 py-4 pl-6">
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
							<div
								className={cn(
									"flex flex-col pl-3",
									isCollapsed ? "hidden" : ""
								)}
							>
								<div className="text-sm text-light-700">
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
											"text-gray-400 bg-dark-300 rounded focus:outline-none focus:ring-1 cursor-pointer focus:ring-gray-500 dark:focus:text-white",
											isCollapsed ? "hidden" : ""
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
				) : (
					<div
						className={cn(
							"flex  flex-col gap-3 p-3",
							isCollapsed ? "w-full" : "w-64"
						)}
					>
						<Button
							className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
							onClick={() => {
								if (!userData) router.push("/sign-in?callbackUrl=/app");
							}}
						>
							{isCollapsed ? (
								<LogInIcon className="h-5 w-5  text-light-700" />
							) : (
								<span className="primary-text-gradient">Log In</span>
							)}
						</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default LeftSidebar;
