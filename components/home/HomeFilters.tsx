"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const HomeFilters = () => {
	const active = "newest";
	return (
		<div className="mt-10 hidden flex-wrap gap-3 md:flex">
			{HomePageFilters.map((item) => (
				<Button
					key={item.value}
					onClick={() => {}}
					className={cn(
						"body-medium rounded-lg px-6 py-3 capitalize shadow-none",
						active === item.value
							? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
							: "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
					)}
				>
					{item.name}
				</Button>
			))}
		</div>
	);
};

export default HomeFilters;
