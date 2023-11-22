import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswersCard from "../cards/AnswersCard";

interface Props extends SearchParamsProps {
	userId: string;
	authUserId?: string;
}

async function AnswersTab({ searchParams, userId, authUserId }: Props) {
	const result = await getUserAnswers({
		userId,
		page: searchParams.page ? +searchParams.page : 1,
	});

	return (
		<>
			{result.answers.map((item) => (
				<AnswersCard
					key={item._id}
					authUserId={authUserId}
					_id={item.id}
					question={item.question}
					author={item.author}
					upvotes={item.upvotes.length}
					createdAt={item.createdAt}
				/>
			))}
		</>
	);
}

export default AnswersTab;
