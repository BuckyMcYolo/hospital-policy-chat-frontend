import type { Metadata } from "next"
import { Inter, Rubik } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import PasswordDialog from "@/components/misc/passwordDialog"
import { cookies } from "next/headers"
import { TooltipProvider } from "@/components/ui/tooltip"
import Nav from "@/components/nav/Nav"

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
	const cookieStore = cookies()
	const loginCookies = cookieStore.get(process.env.PASSWORD_COOKIE_NAME!)
	const isLoggedIn = !!loginCookies?.value
	return (
		<html suppressHydrationWarning lang="en">
			<body className={rubik.className}>
				<ThemeProvider
					attribute="class"
					disableTransitionOnChange
					defaultTheme="system"
					enableSystem
				>
					{!isLoggedIn ? (
						<PasswordDialog />
					) : (
						<TooltipProvider>
							<div suppressHydrationWarning>
								<Nav>{children}</Nav>
							</div>
						</TooltipProvider>
					)}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
