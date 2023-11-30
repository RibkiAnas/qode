import { authOptions } from "@/app/options";
import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Ask a question | Qode",
};

async function AskQuestionPage() {
	const userData = await getServerSession(authOptions);

	if (!userData) return null;
	if (!userData.user) return null;
	//	@ts-ignore
	if (!userData.user._id) redirect("/sign-in");

	//	@ts-ignore
	const mongoUser = await getUserById({ userId: userData.user._id });

	return (
		<div>
			<h1 className="h1-bold text-dark100_light900">Ask a question</h1>
			<div className="mt-9">
				<Question mongoUserId={JSON.stringify(mongoUser._id)} />
			</div>
		</div>
	);
}

export default AskQuestionPage;
