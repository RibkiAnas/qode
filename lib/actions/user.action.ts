"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllUsersParams } from "./shared.types";

export async function getUserById(params: any) {
	try {
		connectToDatabase();
		const { userId } = params;
		const user = await User.findOne({ _id: userId });
		// console.log(user)
		return user;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getAllUsers(params: GetAllUsersParams) {
	try {
		connectToDatabase();
		// const { searchQuery, filter, page = 1, pageSize = 10 } = params;

		const users = await User.find({}).sort({ createdAt: -1 });

		return { users };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
