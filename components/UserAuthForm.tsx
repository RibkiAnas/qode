/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { GithubIcon, LoaderIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Button
				className="background-light850_dark100 text-dark100_light900"
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={() => {
					setIsLoading(true);
					// @ts-ignore
					signIn("github", { callbackUrl });
				}}
			>
				{isLoading ? (
					<LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<GithubIcon className="mr-2 h-4 w-4" />
				)}{" "}
				Github
			</Button>
		</div>
	);
}

export default UserAuthForm;
