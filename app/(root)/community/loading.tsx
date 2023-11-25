import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
	return (
		<>
			<h1 className="h1-bold text-dark100_light900">All Users</h1>
			<div className="mt-11 flex justify-end max-sm:flex-col sm:items-center">
				<Skeleton className="h-14 min-h-[56px] sm:min-w-[170px]" />
			</div>
			<div className="mt-12 flex flex-wrap gap-4">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
					<Skeleton
						key={item}
						className="shadow-light100_darknone h-60 w-full max-xs:min-w-full xs:w-[260px]"
					/>
				))}
			</div>
		</>
	);
};

export default Loading;
