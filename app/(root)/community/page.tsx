import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

async function page({ searchParams }: SearchParamsProps) {
	const result = await getAllUsers({
		filter: searchParams.filter,
		page: searchParams.page ? +searchParams.page : 1,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">All Users</h1>
			<div className="mt-11 flex justify-end gap-5 max-sm:flex-col sm:items-center">
				<Filter
					filters={UserFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
					placeholder="Select a Filter"
				/>
			</div>

			<section className="mt-12 flex flex-wrap gap-4">
				{result.users.length > 0 ? (
					result.users.map((user) => <UserCard key={user._id} user={user} />)
				) : (
					<div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
						<p>No users yet</p>
						<Link href="/sign-in" className="mt-2 font-bold text-accent-blue">
							Join to be the first!
						</Link>
					</div>
				)}
			</section>
			<div className="mt-10">
				<Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={result?.isNext}
				/>
			</div>
		</>
	);
}

export default page;
