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
import {
	CornerDownLeft,
	Loader2,
	Mic,
	StopCircle,
	TrashIcon,
} from "lucide-react"
import React, { FormEvent, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { Admission } from "../patientExamples"
import ReactMarkdown from "react-markdown"

const ChatSection = ({ currentPatient }: { currentPatient: Admission }) => {
	const {
		messages,
		data,
		setMessages,
		reload,
		stop,
		isLoading,
		append,
		setInput,
		input,
		handleSubmit,
		handleInputChange,
	} = useChat({
		body: {
			patientwithAdmission: currentPatient,
		},
		api:
			process.env.NODE_ENV === "development"
				? "http://localhost:5000/v1/chat/patient"
				: "https://test.hospital-policy-chat.com/v1/chat/stream",
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	return (
		<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted dark:bg-muted/50 lg:col-span-2">
			<Badge
				variant="outline"
				className="absolute left-2 top-2 bg-white dark:bg-black"
			>
				Chat
			</Badge>
			<div className="flex-1 h-2/3 pt-2" id="messageFeed">
				<ScrollArea className="h-full p-4">
					<section className="flex flex-col gap-2 pb-10">
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
									<ReactMarkdown>
										{message.content}
									</ReactMarkdown>
								</div>
							</div>
						))}
						{isLoading && (
							<div className="flex justify-center items-center">
								<Loader2 className="animate-spin size-4" />
							</div>
						)}
					</section>
					<div ref={scrollRef}></div>
				</ScrollArea>
			</div>
			<form
				className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring m-3"
				x-chunk="dashboard-03-chunk-1"
				// onSubmit={handleSubmit}
			>
				<Label htmlFor="message" className="sr-only">
					Message
				</Label>
				<Textarea
					value={input}
					onChange={handleInputChange}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							handleSubmit(
								e as unknown as FormEvent<HTMLFormElement>
							)
						}
					}}
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
								onClick={(e) => {
									e.preventDefault()
									setInput("")
									setMessages([])
								}}
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

					<Button
						onClick={(e) => {
							if (isLoading) {
								stop()
							} else {
								handleSubmit(
									e as unknown as FormEvent<HTMLFormElement>
								)
							}
						}}
						size="sm"
						className="ml-auto gap-1.5"
						disabled={!isLoading && !input}
					>
						{isLoading ? "Stop" : "Send Message"}
						{isLoading ? (
							<StopCircle className="size-3.5" />
						) : (
							<CornerDownLeft className="size-3.5" />
						)}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ChatSection
