import type { Metadata } from "next"
import { Inter, Rubik } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })
const rubik = Rubik({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Hospital Policy Chat",
	description: "Chat with a bot to learn about hospital policies.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={rubik.className}>
				<ThemeProvider
					attribute="class"
					disableTransitionOnChange
					defaultTheme="system"
					enableSystem
				>
					{children}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
