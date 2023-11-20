import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function AskQuestionPage() {
	const { user } = await getServerSession(authOptions);

	if (!user._id) redirect("/sign-in");

	const mongoUser = await getUserById({ userId: user._id });

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
