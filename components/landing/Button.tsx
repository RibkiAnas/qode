import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line no-use-before-define
type ButtonBaseProps = VariantProps<typeof buttonClasses> & {
	children: React.ReactNode;
};

interface ButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	href?: never;
}

type ButtonProps = ButtonBaseProps &
	(ButtonAsAnchorProps | ButtonAsButtonProps);

const buttonClasses = cva("relative inline-flex items-center rounded-full", {
	variants: {
		variant: {
			primary: [
				"hover:text-shadow transition-[shadow,text-shadow] hover:shadow-primary",
				"primary-gradient [&_.highlight]:ml-2",
			],
			secondary: [
				"backdrop-filter-[12px] border border-transparent-white bg-white bg-opacity-10 text-off-white transition-colors ease-in hover:bg-opacity-20",
				"[&_.highlight:first-child]:-ml-2 [&_.highlight:first-child]:mr-2 [&_.highlight:last-child]:-mr-2 [&_.highlight:last-child]:ml-2 [&_.highlight]:rounded-full [&_.highlight]:bg-transparent-white [&_.highlight]:px-2",
			],
		},
		size: {
			small: "h-7 px-3 text-xs",
			medium: "h-9 px-4 text-sm",
			large: "text-md h-12 px-6",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "medium",
	},
});

export const Highlight = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => <span className={cn("highlight", className)}>{children}</span>;

export const Button = ({ children, variant, size, ...props }: ButtonProps) => {
	const classes = buttonClasses({ variant, size, className: props.className });

	if ("href" in props && props.href !== undefined) {
		return (
			<Link {...props} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<button {...props} className={classes}>
			{children}
		</button>
	);
};
