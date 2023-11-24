"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ProfileSchema } from "@/lib/validations";
import { updateUser } from "@/lib/actions/user.action";

interface Props {
	authUserId: string;
	user: string;
}

function Profile({ authUserId, user }: Props) {
	const parsedUser = JSON.parse(user);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: parsedUser.name || "",
			username: parsedUser.username || "",
			portfolioWebsite: parsedUser.portfolioWebsite || "",
			location: parsedUser.location || "",
			bio: parsedUser.bio || "",
		},
	});

	async function onSubmit(values: z.infer<typeof ProfileSchema>) {
		setIsSubmitting(true);
		try {
			await updateUser({
				authUserId,
				path: pathname,
				updateData: {
					name: values.name,
					username: values.username,
					portfolioWebsite: values.portfolioWebsite,
					bio: values.bio,
					location: values.location,
				},
			});
			router.back();
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form
				className="mt-9 flex w-full flex-col gap-9"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Name <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Your name"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Username <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Your username"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="portfolioWebsite"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Portfolio Link
							</FormLabel>
							<FormControl>
								<Input
									type="url"
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Your portfolio url"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Location
							</FormLabel>
							<FormControl>
								<Input
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Where are you from?"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Bio <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Textarea
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="What's special about you?"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="mt-7 flex justify-end">
					<Button
						type="submit"
						className="primary-gradient w-fit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save"}
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default Profile;
