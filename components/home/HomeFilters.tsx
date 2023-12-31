"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { cn, formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const HomeFilters = () => {
	const searchParams = useSearchParams();
	const [active, setActive] = useState("");
	const router = useRouter();

	const handleTypeClick = (item: string) => {
		if (active === item) {
			setActive("");
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "filter",
				value: null,
			});
			router.push(newUrl, { scroll: false });
		} else {
			setActive(item);
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "filter",
				value: item.toLowerCase(),
			});
			router.push(newUrl, { scroll: false });
		}
	};

	return (
		<div className="mt-10 hidden flex-wrap gap-3 md:flex">
			{HomePageFilters.map((item) => (
				<Button
					key={item.value}
					onClick={() => handleTypeClick(item.value)}
					className={cn(
						"body-medium rounded-lg px-6 py-3 capitalize shadow-none",
						active === item.value
							? " bg-dark-400 text-primary-500 hover:bg-dark-400"
							: "bg-dark-300 text-light-500 hover:bg-dark-300"
					)}
				>
					{item.name}
				</Button>
			))}
		</div>
	);
};

export default HomeFilters;
