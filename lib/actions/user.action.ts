"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllUsersParams, ToggleSaveQuestionParams } from "./shared.types";
import { revalidatePath } from "next/cache";

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

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
	try {
		connectToDatabase();

		const { userId, questionId, path } = params;

		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		const isQuestionSaved = user.saved.includes(questionId);
		if (isQuestionSaved) {
			await User.findByIdAndUpdate(
				userId,
				{
					$pull: { saved: questionId },
				},
				{ new: true }
			);
		} else {
			await User.findByIdAndUpdate(
				userId,
				{
					$addToSet: { saved: questionId },
				},
				{ new: true }
			);
		}
		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
