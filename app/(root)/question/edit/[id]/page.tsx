import { authOptions } from "@/app/options";
import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { getServerSession } from "next-auth";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Edit question | Qode",
};

async function page({ params }: ParamsProps) {
	const authUser = await getServerSession(authOptions);
	if (!authUser) return null;

	//	@ts-ignore
	const mongoUser = await getUserById({ userId: authUser.user?._id });

	const result = await getQuestionById({ questionId: params.id });

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Edit Question</h1>
			<div className="mt-9">
				<Question
					type="Edit"
					mongoUserId={mongoUser._id.toJSON()}
					questionDetails={JSON.stringify(result)}
				/>
			</div>
		</>
	);
}

export default page;
