import { authOptions } from "@/app/options";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import {
	getQuestions,
	getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home | Qode",
};

async function Home({ searchParams }: SearchParamsProps) {
	const userAuthData = await getServerSession(authOptions);

	// if (!userAuthData) return null;
	// if (!userAuthData.user) return null;

	let result;
	if (searchParams?.filter === "recommended") {
		// @ts-ignore
		if (userAuthData.user._id) {
			result = result = await getRecommendedQuestions({
				// @ts-ignore
				userId: userAuthData.user._id,
				searchQuery: searchParams.q,
				page: searchParams.page ? +searchParams.page : 1,
			});
		} else {
			result = {
				questions: [],
				isNext: false,
			};
		}
	} else {
		result = await getQuestions({
			filter: searchParams.filter,
			page: searchParams.page ? +searchParams.page : 1,
		});
	}

	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All Questions</h1>

				<Link href="/ask-question" className="flex justify-end max-sm:w-full">
					<Button className="magic-button primary-gradient min-h-[46px] px-4 py-3">
						Ask a Question
						<div className="star-1">
							<svg
								xmlnsXlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 784.11 815.53"
								style={{
									shapeRendering: "geometricPrecision",
									textRendering: "geometricPrecision",
									imageRendering: "auto",
									fillRule: "evenodd",
									clipRule: "evenodd",
								}}
								version="1.1"
								xmlSpace="preserve"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs />
								<defs>
									<linearGradient
										id="myGradient"
										x1="0.933"
										y1="0.25"
										x2="0.067"
										y2="0.75"
									>
										<stop offset="0%" stop-color="#ff7000" />
										<stop offset="100%" stop-color="#e2995f" />
									</linearGradient>
								</defs>

								<g id="Layer_x0020_1">
									<metadata id="CorelCorpID_0Corel-Layer" />
									<path
										d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
										style={{
											fill: "url(#myGradient)",
										}}
									/>
								</g>
							</svg>
						</div>
						<div className="star-2">
							<svg
								xmlnsXlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 784.11 815.53"
								style={{
									shapeRendering: "geometricPrecision",
									textRendering: "geometricPrecision",
									imageRendering: "auto",
									fillRule: "evenodd",
									clipRule: "evenodd",
								}}
								version="1.1"
								xmlSpace="preserve"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs />
								<defs>
									<linearGradient
										id="myGradient"
										x1="0.933"
										y1="0.25"
										x2="0.067"
										y2="0.75"
									>
										<stop offset="0%" stop-color="#ff7000" />
										<stop offset="100%" stop-color="#e2995f" />
									</linearGradient>
								</defs>
								<g id="Layer_x0020_1">
									<metadata id="CorelCorpID_0Corel-Layer" />
									<path
										d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
										style={{
											fill: "url(#myGradient)",
										}}
									/>
								</g>
							</svg>
						</div>
						<div className="star-3">
							<svg
								xmlnsXlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 784.11 815.53"
								style={{
									shapeRendering: "geometricPrecision",
									textRendering: "geometricPrecision",
									imageRendering: "auto",
									fillRule: "evenodd",
									clipRule: "evenodd",
								}}
								version="1.1"
								xmlSpace="preserve"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs />
								<defs>
									<linearGradient
										id="myGradient"
										x1="0.933"
										y1="0.25"
										x2="0.067"
										y2="0.75"
									>
										<stop offset="0%" stop-color="#ff7000" />
										<stop offset="100%" stop-color="#e2995f" />
									</linearGradient>
								</defs>
								<g id="Layer_x0020_1">
									<metadata id="CorelCorpID_0Corel-Layer" />
									<path
										d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
										style={{
											fill: "url(#myGradient)",
										}}
									/>
								</g>
							</svg>
						</div>
						<div className="star-4">
							<svg
								xmlnsXlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 784.11 815.53"
								style={{
									shapeRendering: "geometricPrecision",
									textRendering: "geometricPrecision",
									imageRendering: "auto",
									fillRule: "evenodd",
									clipRule: "evenodd",
								}}
								version="1.1"
								xmlSpace="preserve"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs />
								<defs>
									<linearGradient
										id="myGradient"
										x1="0.933"
										y1="0.25"
										x2="0.067"
										y2="0.75"
									>
										<stop offset="0%" stop-color="#ff7000" />
										<stop offset="100%" stop-color="#e2995f" />
									</linearGradient>
								</defs>
								<g id="Layer_x0020_1">
									<metadata id="CorelCorpID_0Corel-Layer" />
									<path
										d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
										style={{
											fill: "url(#myGradient)",
										}}
									/>
								</g>
							</svg>
						</div>
						<div className="star-5">
							<svg
								xmlnsXlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 784.11 815.53"
								style={{
									shapeRendering: "geometricPrecision",
									textRendering: "geometricPrecision",
									imageRendering: "auto",
									fillRule: "evenodd",
									clipRule: "evenodd",
								}}
								version="1.1"
								xmlSpace="preserve"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs />
								<defs>
									<linearGradient
										id="myGradient"
										x1="0.933"
										y1="0.25"
										x2="0.067"
										y2="0.75"
									>
										<stop offset="0%" stop-color="#ff7000" />
										<stop offset="100%" stop-color="#e2995f" />
									</linearGradient>
								</defs>
								<g id="Layer_x0020_1">
									<metadata id="CorelCorpID_0Corel-Layer" />
									<path
										d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
										style={{
											fill: "url(#myGradient)",
										}}
									/>
								</g>
							</svg>
						</div>
						<div className="star-6">
							<svg
								xmlnsXlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 784.11 815.53"
								style={{
									shapeRendering: "geometricPrecision",
									textRendering: "geometricPrecision",
									imageRendering: "auto",
									fillRule: "evenodd",
									clipRule: "evenodd",
								}}
								version="1.1"
								xmlSpace="preserve"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs />
								<defs>
									<linearGradient
										id="myGradient"
										x1="0.933"
										y1="0.25"
										x2="0.067"
										y2="0.75"
									>
										<stop offset="0%" stop-color="#ff7000" />
										<stop offset="100%" stop-color="#e2995f" />
									</linearGradient>
								</defs>
								<g id="Layer_x0020_1">
									<metadata id="CorelCorpID_0Corel-Layer" />
									<path
										d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
										style={{
											fill: "url(#myGradient)",
										}}
									/>
								</g>
							</svg>
						</div>
					</Button>
				</Link>
			</div>
			<div className="mt-11 flex justify-end gap-5 max-sm:flex-col sm:items-center">
				<Filter
					filters={HomePageFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
					containerClasses="hidden max-md:flex"
					placeholder="Select a Filter"
				/>
			</div>
			<HomeFilters />
			<div className="mt-10 flex w-full flex-col gap-6">
				{result.questions.length > 0 ? (
					result.questions.map((question) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : (
					<NoResult
						title="There’s no question to show"
						description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
						link="/ask-question"
						linkTitle="Ask a Question"
					/>
				)}
			</div>
			<div className="mt-10">
				<Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={result?.isNext}
				/>
			</div>
		</>
	);
}

export default Home;
