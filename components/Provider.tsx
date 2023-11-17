"use client";

import { ThemeProvider } from "@/context/ThemeProvider";
import { SessionProvider } from "next-auth/react";

function Provider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</SessionProvider>
	);
}

export default Provider;
