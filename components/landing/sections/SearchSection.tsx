"use client";
import React from "react";
import { Features } from "../Feature";

function SearchSection() {
	return (
		<Features color="255,112,0" colorDark="128,56,0">
			<Features.Main
				title={
					<>
						Global search
						<br />
						you&apos;ll enjoy using
					</>
				}
				image="/assets/images/search-section.png"
				text="Global search is a powerful tool that can help you find the information you need on Qode. Try it out and see what you can discover!"
			/>
			<Features.Cards
				features={[
					{
						image: "/assets/images/updownvotes.png",
						imageClassName:
							"top-[47%] md:top-[34%] right-[12px] md:right-[24px] rounded-lg w-[150%]",
						title: "Rate and save content",
						text: "Upvote increases score and reputation, Downvote decreases them. Save to collection for later access.",
					},
					{
						image: "/assets/images/answer.png",
						imageClassName:
							"top-[45%] rounded-lg left-[12px] md:top-[34%] md:left-[24px] w-[110%]",
						title: "Answer questions",
						text: "Share your knowledge and expertise by answering questions with other users on Qode.",
					},
				]}
			/>
		</Features>
	);
}

export default SearchSection;
