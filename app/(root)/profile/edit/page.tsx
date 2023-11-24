import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { getServerSession } from "next-auth";
import React from "react";

async function page({ params }: ParamsProps) {
	const userAuthData = await getServerSession(authOptions);

	if (!userAuthData || !userAuthData.user) return null;

	const mongoUser = await getUserById({ userId: userAuthData.user._id });

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
			<div className="mt-9">
				<Profile
					authUserId={userAuthData.user._id}
					user={JSON.stringify(mongoUser)}
				/>
			</div>
		</>
	);
}

export default page;
