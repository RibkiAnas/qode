"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
	downvoteQuestion,
	upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
	type: string;
	itemId: string;
	userId: string;
	upvotes: number;
	hasupVoted: boolean;
	downvotes: number;
	hasdownVoted: boolean;
	hasSaved?: boolean;
}

function Votes({
	type,
	itemId,
	userId,
	upvotes,
	hasupVoted,
	downvotes,
	hasdownVoted,
	hasSaved,
}: Props) {
	const pathname = usePathname();
	// const router = useRouter();

	const handleSave = async () => {
		await toggleSaveQuestion({
			userId: JSON.parse(userId),
			questionId: JSON.parse(itemId),
			path: pathname,
		});
	};

	const handleVote = async (action: string) => {
		if (!userId) {
			return;
		}

		if (action === "upvote") {
			if (type === "Question") {
				await upvoteQuestion({
					questionId: JSON.parse(itemId),
					userId: JSON.parse(userId),
					hasupVoted,
					hasdownVoted,
					path: pathname,
				});
			} else if (type === "Answer") {
				await upvoteAnswer({
					answerId: JSON.parse(itemId),
					userId: JSON.parse(userId),
					hasupVoted,
					hasdownVoted,
					path: pathname,
				});
			}

			return;
		}
		if (action === "downvote") {
			if (type === "Question") {
				await downvoteQuestion({
					questionId: JSON.parse(itemId),
					userId: JSON.parse(userId),
					hasupVoted,
					hasdownVoted,
					path: pathname,
				});
			} else if (type === "Answer") {
				await downvoteAnswer({
					answerId: JSON.parse(itemId),
					userId: JSON.parse(userId),
					hasupVoted,
					hasdownVoted,
					path: pathname,
				});
			}
		}
	};

	return (
		<div className="flex gap-5">
			<div className="flex-center gap-2.5">
				<div className="flex-center gap-1.5">
					<Image
						className="cursor-pointer"
						alt="upvote"
						width={18}
						height={18}
						src={
							hasupVoted
								? "/assets/icons/upvoted.svg"
								: "/assets/icons/upvote.svg"
						}
						onClick={() => handleVote("upvote")}
					/>
					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{formatAndDivideNumber(upvotes)}
						</p>
					</div>
				</div>
				<div className="flex-center gap-1.5">
					<Image
						className="cursor-pointer"
						alt="downvote"
						width={18}
						height={18}
						src={
							hasdownVoted
								? "/assets/icons/downvoted.svg"
								: "/assets/icons/downvote.svg"
						}
						onClick={() => handleVote("downvote")}
					/>
					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{formatAndDivideNumber(downvotes)}
						</p>
					</div>
				</div>
			</div>
			{type === "Question" && (
				<Image
					className="cursor-pointer"
					alt="star"
					width={18}
					height={18}
					src={
						hasSaved
							? "/assets/icons/star-filled.svg"
							: "/assets/icons/star-red.svg"
					}
					onClick={handleSave}
				/>
			)}
		</div>
	);
}

export default Votes;
