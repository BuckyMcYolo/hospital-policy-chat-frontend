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
} from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { toast } from "sonner"

type ChatFeedProps = {
	messages: Message[]
	data: any
	reload: () => void
	stop: () => void
	isLoading: boolean
}

const ChatFeed = ({
	messages,
	data,
	reload,
	stop,
	isLoading,
}: ChatFeedProps) => {
	const scrollTobottom = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollTobottom.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	const isLastMessageFromAssistant =
		messages.length > 0 &&
		messages[messages.length - 1]?.role === "assistant"

	const isPending = isLoading && !isLastMessageFromAssistant

	return (
		<ScrollArea className="h-[86%]">
			<div className="flex flex-col gap-3 max-w-2xl w-full mx-auto pb-10">
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
