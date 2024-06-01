"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { CornerDownLeft, Mic, TrashIcon } from "lucide-react"
import React from "react"
import { useChat } from "ai/react"
import { ScrollArea } from "@/components/ui/scroll-area"

const ChatSection = () => {
	const { messages, data, reload, stop, isLoading, append, setInput } =
		useChat({
			initialMessages: [
				{
					id: "2",
					role: "user",
					content: "I have a question ",
				},
				{
					id: "3",
					role: "assistant",
					content: "I can help with that ",
				},
			],
			api:
				// process.env.NODE_ENV === "development"
				// 	? "http://localhost:5000/v1/chat/stream"
				// 	:
				"https://test.hospital-policy-chat.com/v1/chat/stream",
		})

	return (
		<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted dark:bg-muted/50 lg:col-span-2 w-full sm:w-2/5 lg:w-1/3 p-4">
			<Badge
				variant="outline"
				className="absolute left-2 top-2 bg-white dark:bg-black"
			>
				Chat
			</Badge>
			<div className="flex-1 h-1/4 pt-2" id="messageFeed">
				<ScrollArea className="h-full">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${
								message.role === "user"
									? "flex-row-reverse "
									: "flex-row"
							}`}
						>
							<div
								className={`p-3 text-sm rounded-lg ${
									message.role === "user"
										? " bg-white dark:bg-muted text-foreground"
										: "bg-neutral-200 dark:bg-black "
								}`}
							>
								{message.content}
							</div>
						</div>
					))}
				</ScrollArea>
			</div>
			<form
				className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
				x-chunk="dashboard-03-chunk-1"
			>
				<Label htmlFor="message" className="sr-only">
					Message
				</Label>
				<Textarea
					id="message"
					placeholder="Type your message here..."
					className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
				/>
				<div className="flex items-center p-3 pt-0">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon">
								<Mic className="size-5" />
								<span className="sr-only">Speech to Text</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top">
							Use Speech to Text
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								// onClick={(e) => {
								// 	e.preventDefault()
								// 	setInput("")
								// 	setMessages([])
								// }}
								variant="ghost"
								size="icon"
							>
								<TrashIcon className="size-5" />
								<span className="sr-only">
									Clear Chat history
								</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top">
							Clear Chat history
						</TooltipContent>
					</Tooltip>

					<Button type="submit" size="sm" className="ml-auto gap-1.5">
						Send Message
						<CornerDownLeft className="size-3.5" />
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ChatSection
