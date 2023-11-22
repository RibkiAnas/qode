"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
	GetAllUsersParams,
	GetSavedQuestionsParams,
	GetUserByIdParams,
	GetUserStatsParams,
	ToggleSaveQuestionParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import { log } from "console";

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

export async function getSavedQuestion(params: GetSavedQuestionsParams) {
	try {
		connectToDatabase();

		const { searchQuery, filter, page = 1, pageSize = 20, userId } = params;

		const query: FilterQuery<typeof Question> = searchQuery
			? { title: { $regex: new RegExp(searchQuery, "i") } }
			: {};

		const user = await User.findOne({ userId }).populate({
			path: "saved",
			match: query,
			options: {
				sort: { createdAt: -1 },
			},
			populate: [
				{ path: "tags", model: Tag, select: "_id name" },
				{ path: "author", model: User, select: "_id name picture" },
			],
		});
		if (!user) {
			throw new Error("User not found");
		}
		const savedQuestion = user.saved;

		return { questions: savedQuestion };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getUserInfo(params: GetUserByIdParams) {
	try {
		connectToDatabase();
		const { userId } = params;
		const user = await User.findOne({ _id: userId });
		if (!user) {
			throw new Error("User not found");
		}
		const totalQuestions = await Question.countDocuments({ author: user._id });
		const totalAnswers = await Answer.countDocuments({ author: user._id });

		// const [questionUpvotes] = await Question.aggregate([
		//   { $match: { author: user._id } },
		//   {
		//     $project: {
		//       _id: 0,
		//       upvotes: { $size: "$upvotes" },
		//     },
		//   },
		//   {
		//     $group: {
		//       _id: null,
		//       totalUpvotes: { $sum: "$upvotes" },
		//     },
		//   },
		// ]);
		// const [answerUpvotes] = await Answer.aggregate([
		//   { $match: { author: user._id } },
		//   {
		//     $project: {
		//       _id: 0,
		//       upvotes: { $size: "$upvotes" },
		//     },
		//   },
		//   {
		//     $group: {
		//       _id: null,
		//       totalUpvotes: { $sum: "$upvotes" },
		//     },
		//   },
		// ]);
		// const [questionViews] = await Answer.aggregate([
		//   { $match: { author: user._id } },

		//   {
		//     $group: {
		//       _id: null,
		//       totalViews: { $sum: "$views" },
		//     },
		//   },
		// ]);
		// const criteria = [
		//   { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
		//   { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
		//   {
		//   type: "QUESTION_UPVOTES" as BadgeCriteriaType,
		//     count: questionUpvotes?.totalUpvotes || 0,
		//   },
		//   {
		//     type: "ANSWER_UPVOTES" as BadgeCriteriaType,
		//     count: answerUpvotes?.totalUpvotes || 0,
		//   },
		//   {
		//     type: "TOTAL_VIEWS" as BadgeCriteriaType,
		//     count: questionViews?.totalViews || 0,
		//   },
		// ];
		// const badgeCounts=assignBadges({criteria})
		return { user, totalAnswers, totalQuestions };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getUserQuestions(params: GetUserStatsParams) {
	try {
		connectToDatabase();
		const { userId, page = 1, pageSize = 10 } = params;

		const totalQuestions = await Question.countDocuments({ author: userId });

		const userQuestions = await Question.find({ author: userId })
			.sort({
				views: -1,
				upvotes: -1,
			})
			.limit(pageSize)
			.populate("tags", "_id name")
			.populate("author", "_id name picture");

		return { totalQuestions, questions: userQuestions };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getUserAnswers(params: GetUserStatsParams) {
	try {
		connectToDatabase();
		const { userId, page = 1, pageSize = 10 } = params;

		const totalAnswers = await Answer.countDocuments({ author: userId });

		const userAnswers = await Answer.find({ author: userId })
			.sort({
				upvotes: -1,
			})
			.limit(pageSize)
			.populate("question", "_id title")
			.populate("author", "_id name picture");

		return { totalAnswers, answers: userAnswers };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
