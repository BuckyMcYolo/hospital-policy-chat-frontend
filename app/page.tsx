import { Button } from "@/components/ui/button"
import { DarkModeToggle } from "@/components/misc/darkModeToggle"
import { Separator } from "@/components/ui/separator"
import ChatInput from "@/components/chat/ChatInput"
import Chat from "@/components/chat/ChatSection"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Home() {
	return (
		<main className="bg-white dark:bg-black flex min-h-screen flex-col px-6 md:px-16 pt-4 pb-2">
			<header className="w-full sticky top-0 z-50 bg-white dark:bg-black  rounded-lg">
				<div className="w-full flex items-center justify-between pb-2 px-2">
					<h1 className="text-lg">Chat with Hospital Policies</h1>
					<DarkModeToggle />
				</div>
				<Separator />
			</header>
			<section className="flex flex-col w-full h-[calc(100vh-5rem)] pt-4">
				<TooltipProvider>
					<Chat />
				</TooltipProvider>
			</section>
		</main>
	)
}
