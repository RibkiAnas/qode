import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import type { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";

connectToDatabase();

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			name: "github",
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
	pages: {
		signIn: "/sign-in",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (account!.type === "oauth") {
				return await signInWithOAuth({ account, profile });
			}

			return true;
		},
		async jwt({ token, trigger, session }) {
			const user = await getUserByEmail({ email: token.email });

			const newToken = { ...token };
			if (user?._id) {
				newToken._id = user._id;
			}

			// console.log(newToken);

			return newToken;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			const newSession = { ...session };
			// @ts-ignore
			newSession.user._id = token._id; // Cast the token to the custom type
			// console.log(newSession);

			return newSession;
		},
	},
};

/* ------------------------------------- */
//	@ts-ignore
async function signInWithOAuth({ account, profile }) {
	const user = await User.findOne({ email: profile.email });
	if (user) {
		return true;
	}
	const newUser = new User({
		name: profile.login,
		username: profile.login,
		email: profile.email,
		picture: profile.avatar_url,
	});

	await newUser.save();

	return true;
}

//	@ts-ignore
async function getUserByEmail({ email }) {
	const user = await User.findOne({ email });
	if (!user) throw new Error("User does not exist");
	return { ...user._doc, _id: user._id.toString() };
}
