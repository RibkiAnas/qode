import Link from "next/link";

import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import EditDeleteAction from "../shared/EditDeleteAction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/options";
// import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
	authUserId?: string | null;
	_id: string;
	question: {
		_id: string;
		title: string;
	};
	author: {
		_id: string;
		name: string;
		picture: string;
	};
	upvotes: number;
	createdAt: Date;
}

const AnswersCard = async ({
	authUserId,
	_id,
	question,
	author,
	upvotes,
	createdAt,
}: Props) => {
	const showActionButtons = authUserId && authUserId === author._id.toString();
	const userData = await getServerSession(authOptions);

	return (
		<div className="card-wrapper rounded-[10px] px-11 py-9">
			<div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
				<span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
					{getTimestamp(createdAt)}
				</span>
				<h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
					<Link href={`/question/${question?._id}/#${_id}`}>
						{question?.title}
					</Link>
				</h3>

				{userData ? (
					<>
						{showActionButtons && (
							<EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
						)}
					</>
				) : null}
			</div>

			<div className="flex-between mt-6 w-full flex-wrap gap-3">
				<Metric
					imgUrl={author.picture}
					alt="user avatar"
					value={author.name}
					title={` • asked ${getTimestamp(createdAt)}`}
					href={`/profile/${author._id}`}
					textStyles="body-medium text-dark400_light700"
					isAuthor
				/>

				<div className="flex-center gap-3">
					<Metric
						imgUrl="/assets/icons/like.svg"
						alt="like icon"
						value={formatAndDivideNumber(upvotes)}
						title=" Votes"
						textStyles="small-medium text-dark400_light800"
					/>
				</div>
			</div>
		</div>
	);
};

export default AnswersCard;
