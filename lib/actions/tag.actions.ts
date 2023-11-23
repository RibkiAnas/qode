"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
	GetAllTagsParams,
	GetQuestionsByTagIdParams,
	GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
	try {
		connectToDatabase();
		const { userId } = params;
		const user = await User.findById(userId);
		if (!user) throw new Error("User not found");

		return [
			{ _id: "1", name: "tag1" },
			{ _id: "2", name: "tag2" },
		];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getAllTags(params: GetAllTagsParams) {
	try {
		connectToDatabase();

		const { filter, page = 1, pageSize = 10 } = params;

		const skipAmount = (page - 1) * pageSize;

		const query: FilterQuery<typeof Tag> = {};

		let sortOptions = {};
		switch (filter) {
			case "popular":
				sortOptions = { questions: -1 };
				break;
			case "recent":
				sortOptions = { createdAt: -1 };
				break;
			case "name":
				sortOptions = { name: 1 };
				break;
			case "old":
				sortOptions = { createdAt: 1 };
				break;
		}

		const tags = await Tag.find(query)
			.skip(skipAmount)
			.limit(pageSize)
			.sort(sortOptions);

		const totaTags = await Tag.countDocuments(query);
		const isNext = totaTags > skipAmount + tags.length;
		return { tags, isNext };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
	try {
		connectToDatabase();
		const { tagId, page = 1, pageSize = 10, searchQuery } = params;

		const tagFilter: FilterQuery<ITag> = { _id: tagId };

		const tag = await Tag.findOne(tagFilter).populate({
			path: "questions",
			model: Question,
			match: searchQuery
				? { title: { $regex: searchQuery, $options: "i" } }
				: {},
			options: {
				sort: { createdAt: -1 },
			},
			populate: [
				{ path: "tags", model: Tag, select: "_id name" },
				{ path: "author", model: User, select: "_id name picture" },
			],
		});
		if (!tag) {
			throw new Error("tag not found");
		}
		const questions = tag.questions;

		return { tagTitle: tag.name, questions };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getPopularTags() {
	try {
		connectToDatabase();
		const popularTags = await Tag.aggregate([
			{ $project: { name: 1, numberofQuestions: { $size: "$questions" } } },
			{ $sort: { numberofQuestions: -1 } },
			{ $limit: 5 },
		]);

		return popularTags;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
