import React from "react";

function page() {
	return (
		<section className="relative">
			<div className="mx-auto my-0 w-full max-w-[calc(1200px_+_34px)] px-8">
				<div className="flex py-28">
					<div className="z-10">
						<h1 className="mb-6 translate-y-[-1rem] animate-fade-in text-6xl opacity-0 [--animation-delay:200ms] md:text-8xl">
							About the Author and the Project
						</h1>
						<div className="text-[#d0d6e0] [&_p]:mb-4">
							<p>
								This project was inspired by my passion and curiosity for
								programming and technology. I have always enjoyed learning new
								skills and solving problems using code. I have also always
								admired the online communities and platforms that allow
								programmers and enthusiasts to share their knowledge and
								experience, and to help each other with their questions and
								challenges. I wanted to create a web application that can
								provide a similar service and experience, but with some unique
								and innovative features and functionalities.
							</p>
							<p>
								I started working on this project in November 2023, as part of
								my Portfolio Project for Holberton School, a software
								engineering school that teaches students how to think and learn
								like a full-stack developer. I chose this project as my
								Portfolio Project because I wanted to showcase my skills and
								abilities in web development, using various technologies and
								tools that I learned and applied during my studies at Holberton
								School.
							</p>
							<p>
								I worked on this project alone, as I wanted to have full control
								and responsibility over the design and implementation of my web
								application. However, I also received and provided some help
								from and to my mentor, peers, and staff at Holberton School, who
								gave me feedback, suggestions, and support throughout the
								development and deployment of my project.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default page;
