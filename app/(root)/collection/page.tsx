import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";
import React from "react";

async function page() {
	const userData = await getServerSession(authOptions);

	if (!userData?.user) return null;

	const result = await getSavedQuestion({
		userId: userData?.user._id,
	});
	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
			<div className="mt-11 flex justify-end gap-5 max-sm:flex-col sm:items-center">
				<Filter
					filters={QuestionFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
					placeholder="Select a Filter"
				/>
			</div>
			<div className="mt-10 flex w-full flex-col gap-6">
				{result.questions.length > 0 ? (
					result.questions.map((question: any) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : (
					<NoResult
						title="There’s no question saved to show"
						description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
						link="/ask-question"
						linkTitle="Ask a Question"
					/>
				)}
			</div>
		</>
	);
}

export default page;
