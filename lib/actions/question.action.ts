"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import {
	CreateQuestionParams,
	DeleteQuestionParams,
	EditQuestionParams,
	GetQuestionByIdParams,
	GetQuestionsParams,
	QuestionVoteParams,
	RecommendedParams,
} from "./shared.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionsParams) {
	try {
		connectToDatabase();

		const { filter } = params;

		const query: FilterQuery<typeof Question> = {};

		let sortOptions = {};

		switch (filter) {
			case "newest":
				sortOptions = { createdAt: -1 };
				break;
			case "frequent":
				sortOptions = { views: -1 };
				break;
			case "unanswered":
				query.answers = { $size: 0 };
				break;
		}

		const questions = await Question.find({})
			.populate({ path: "tags", model: Tag })
			.populate({ path: "author", model: User })
			.sort(sortOptions);

		return { questions };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function createQuestion(params: CreateQuestionParams) {
	try {
		connectToDatabase();

		const { title, content, tags, author, path } = params;
		const question = await Question.create({
			title,
			content,
			author,
		});
		const tagDocuments = [];
		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{ name: { $regex: new RegExp(`^${tag}$`, "i") } },
				{ $setOnInsert: { name: tag }, $push: { questions: question._id } },
				{ upsert: true, new: true }
			);
			tagDocuments.push(existingTag._id);
		}

		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocuments } },
		});

		revalidatePath(path);
	} catch (error) {}
}

export async function getQuestionById(params: GetQuestionByIdParams) {
	try {
		connectToDatabase();
		const { questionId } = params;
		const question = await Question.findById(questionId)
			.populate({ path: "tags", model: Tag, select: "_id name" })
			.populate({
				path: "author",
				model: User,
				select: "_id name picture",
			});

		return question;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function upvoteQuestion(params: QuestionVoteParams) {
	try {
		connectToDatabase();
		const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

		let updateQuery = {};
		if (hasupVoted) {
			updateQuery = { $pull: { upvotes: userId } };
		} else if (hasdownVoted) {
			updateQuery = {
				$pull: { downvotes: userId },
				$push: { upvotes: userId },
			};
		} else {
			updateQuery = { $addToSet: { upvotes: userId } };
		}

		const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
			new: true,
		});

		if (!question) {
			throw new Error("Question not found");
		}

		// Increament user's reputation by +1/-1 for upvoting/revoking an upvote to the question

		// Increament  question author's reputation by +10/-10 for recieving +10/-10 points for recieving an upvote/downvote to the question

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function downvoteQuestion(params: QuestionVoteParams) {
	try {
		connectToDatabase();

		const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
		let updateQuery = {};

		if (hasdownVoted) {
			updateQuery = { $pull: { downvotes: userId } };
		} else if (hasupVoted) {
			updateQuery = {
				$pull: { upvotes: userId },
				$push: { downvotes: userId },
			};
		} else {
			updateQuery = { $addToSet: { downvotes: userId } };
		}

		const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
			new: true,
		});

		if (!question) {
			throw new Error("Question not found");
		}

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteQuestion(params: DeleteQuestionParams) {
	try {
		connectToDatabase();
		const { questionId, path } = params;
		await Question.deleteOne({ _id: questionId });
		await Answer.deleteMany({ question: questionId });
		await Interaction.deleteMany({ question: questionId });
		await Tag.updateMany(
			{ questions: questionId },
			{
				$pull: {
					questions: questionId,
				},
			}
		);

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function editQuestion(params: EditQuestionParams) {
	try {
		connectToDatabase();
		const { questionId, title, content, path } = params;
		const question = await Question.findById(questionId).populate("tags");
		if (!question) {
			throw new Error("Question not found");
		}
		question.title = title;
		question.content = content;
		await question.save();

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getHotQuestions(params: GetQuestionsParams) {
	try {
		connectToDatabase();

		const hotQuestions = await Question.find({})
			.sort({ views: -1, upvotes: -1 })
			.limit(5);

		return hotQuestions;
	} catch (error) {
		console.error("Error getting recommended questions:", error);
		throw error;
	}
}
