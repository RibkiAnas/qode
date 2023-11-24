import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
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

			token.user = user;

			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/*-------------------------------------*/
async function signInWithOAuth({ account, profile }) {
	const user = await User.findOne({ email: profile.email });
	if (user) {
		return true;
	}
	const newUser = new User({
		name: profile.login,
		email: profile.email,
		picture: profile.avatar_url,
	});

	await newUser.save();

	return true;
}

async function getUserByEmail({ email }) {
	const user = await User.findOne({ email }).select("-select");
	if (!user) throw new Error("User does not exist");
	return { ...user._doc, _id: user._id.toString() };
}
