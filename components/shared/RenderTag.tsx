import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

interface Props {
	_id: string;
	name: string;
	totalQuestions?: number;
	showCount?: boolean;
}

function RenderTag({ _id, name, totalQuestions, showCount }: Props) {
	return (
		<Link href={`/tags/${_id}`} className="flex justify-between gap-2">
			<Badge className="subtle-medium rounded-md border-none bg-dark-300 px-4 py-2 uppercase text-light-500">
				{name}
			</Badge>

			{showCount && (
				<p className="small-medium text-dark500_light700">{totalQuestions}</p>
			)}
		</Link>
	);
}

export default RenderTag;
