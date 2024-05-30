import Chat from "@/components/chat/ChatSection"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
	return (
		<div className="flex flex-col h-full justify-center items-center">
			<h1 className="text-3xl pb-6 font-semibold underline underline-offset-8 ">
				Available Demos
			</h1>
			<div className="flex flex-col md:flex-row  gap-5">
				<Link href="/policies-and-supplies">
					<Card className="p-4 max-w-96 cursor-pointer hover:border-foreground">
						<CardTitle>Supplies and policies chat</CardTitle>
						<CardDescription className="pt-2">
							Ask questions about your hospital policies and
							supplies locations through text or voice
						</CardDescription>
					</Card>
				</Link>
				<Link href="/policies-and-supplies">
					<Card className="p-4 max-w-96 cursor-pointer hover:border-foreground">
						<CardTitle>Patient chart Q&A</CardTitle>
						<CardDescription className="pt-2">
							Ask questions about a demo patient chart through
							text or voice
						</CardDescription>
					</Card>
				</Link>
			</div>
		</div>
	)
}
