"use client"

import React, { useEffect, useRef, useState } from "react"
import ChatCard from "./ChatCard"
import { ScrollArea } from "../ui/scroll-area"
import { Message } from "ai/react"
import {
	Check,
	Loader2,
	MoveDownIcon,
	MoveUp,
	PauseCircle,
	RefreshCw,
	ThumbsDown,
	ThumbsUp,
	AudioLines,
	Volume2,
} from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { toast } from "sonner"
import { Card, CardContent, CardHeader } from "../ui/card"
import { getTextToSpeech } from "@/lib/textToSpeech"

type ChatFeedProps = {
	messages: Message[]
	data: any
	reload: () => void
	stop: () => void
	isLoading: boolean
	append: (message?: Message) => void
	setInput: (input: string) => void
}

const ChatFeed = ({
	messages,
	data,
	reload,
	stop,
	isLoading,
	append,
	setInput,
}: ChatFeedProps) => {
	const scrollTobottom = useRef<HTMLDivElement>(null)

	const [isAudioPlaying, setIsAudioPlaying] = useState(false)

	useEffect(() => {
		scrollTobottom.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	const isLastMessageFromAssistant =
		messages.length > 0 &&
		messages[messages.length - 1]?.role === "assistant"

	const isPending = isLoading && !isLastMessageFromAssistant

	const suggestedMessages: Message[] = [
		{
			id: "1",
			role: "user",
			content: "Whats the policy for inserting a nasogastric tube?",
			annotations: [],
		},
		{
			id: "2",
			role: "user",
			content: "What is the policy for removing a central line?",
			annotations: [],
		},
		{
			id: "3",
			role: "user",
			content: "Where are the art lines located?",
			annotations: [],
		},
		{
			id: "4",
			role: "user",
			content: "Where can I find supplies for inserting a feeding tube?",
			annotations: [],
		},
	]

	const handleAudio = async (message: Message) => {
		try {
			const audioData = await getTextToSpeech(message.content)
			const url = `http://localhost:5000` + audioData
			const currentAudioUrl = url + "?t=" + new Date().getTime() // Add cache-busting query parameter

			if (url) {
				const audio = new Audio(currentAudioUrl)
				audio.crossOrigin = "anonymous"
				// audio.src = url
				console.log("Playing audio...", audio)
				audio.play()
				setIsAudioPlaying(true)
				audio.onended = () => {
					setIsAudioPlaying(false)
				}
			} else {
				console.error("No URL generated for audio.")
			}
		} catch (error) {
			console.error("Error playing audio:", error)
		}
	}

	return (
		<ScrollArea className="h-[86%] p-4">
			<div className="flex flex-col gap-3 max-w-2xl w-full mx-auto pb-10">
				{messages.length === 0 && (
					<main className="grid grid-cols-2 gap-4 pt-10">
						{suggestedMessages.map((message: Message) => (
							<Card
								key={message.id}
								className="hover:border-foreground cursor-pointer hover:shadow dark:hover:shadow-muted-foreground"
								onClick={() => {
									append(message)
									setInput("")
								}}
							>
								<CardHeader>{message.content}</CardHeader>
							</Card>
						))}
					</main>
				)}
				{messages.map((message: Message, index) => (
					<div className=" " key={message.id}>
						<ChatCard
							id={message.id}
							role={message.role}
							content={message.content}
							sources={[]}
							isLoading={isLoading}
							annotations={message.annotations}
						/>
						{index === messages.length - 1 &&
						isLastMessageFromAssistant ? (
							<div className="flex items-center px-2 pt-1 gap-1">
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											size="icon"
											variant="ghost"
											onClick={reload}
											className="w-5 h-5"
											disabled={isLoading}
										>
											<RefreshCw className="w-3.5 h-3.5" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Reload</TooltipContent>
								</Tooltip>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											size="icon"
											variant="ghost"
											onClick={stop}
											className="w-5 h-5"
											disabled={!isLoading}
										>
											<PauseCircle className="w-4 h-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Pause</TooltipContent>
								</Tooltip>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											size="icon"
											variant="ghost"
											onClick={() =>
												toast(
													<div>
														<h2 className="text-lg font-semibold flex gap-2 items-center">
															<MoveUp className="w-5 h-5" />
															Up voted
														</h2>
														Thank you for the
														feedback!
													</div>
												)
											}
											className="w-5 h-5"
											disabled={isLoading}
										>
											<ThumbsUp className="w-3.5 h-3.5" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										Up vote the current response
									</TooltipContent>
								</Tooltip>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											size="icon"
											variant="ghost"
											onClick={() =>
												toast(
													<div>
														<h2 className="text-lg font-semibold flex gap-2 items-center">
															<MoveDownIcon className="w-5 h-5" />
															Down voted
														</h2>
														Thank you for the
														feedback!
													</div>
												)
											}
											className="w-5 h-5"
											disabled={isLoading}
										>
											<ThumbsDown className="w-3.5 h-3.5" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										Down vote the current response
									</TooltipContent>
								</Tooltip>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											size="icon"
											variant="ghost"
											onMouseDown={() =>
												handleAudio(message)
											}
											className="w-5 h-5"
											disabled={isLoading}
										>
											<Volume2 className="w-4 h-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										Text to Speech
									</TooltipContent>
								</Tooltip>
							</div>
						) : null}
					</div>
				))}
				{isPending && (
					<div className="flex justify-center items-center pt-10">
						<Loader2 className="w-4 h-4 animate-spin" />
					</div>
				)}
			</div>
			<div ref={scrollTobottom} />
		</ScrollArea>
	)
}

export default ChatFeed
