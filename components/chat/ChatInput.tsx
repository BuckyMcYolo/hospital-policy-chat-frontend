"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Card, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import {
	CornerDownLeft,
	Mic,
	Paperclip,
	TrashIcon,
	LucideBadgeInfo,
	Loader2,
} from "lucide-react"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "../ui/tooltip"
import { Message } from "ai/react"

interface ChatInputProps {
	input: string
	setInput: (input: string) => void
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	setMessages: (messages: Message[]) => void
	isLoading: boolean
}

const ChatInput = ({
	input,
	setInput,
	handleSubmit,
	setMessages,
	handleInputChange,
	isLoading,
}: ChatInputProps) => {
	return (
		<form
			className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring max-w-2xl w-full mx-auto shadow-sm bottom-0 mt-auto"
			x-chunk="dashboard-03-chunk-1"
			onSubmit={handleSubmit}
		>
			<Label htmlFor="message" className="sr-only">
				Message
			</Label>
			<Textarea
				id="message"
				placeholder="Type your message here..."
				className="min-h-8 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
				rows={2}
				value={input}
				onChange={
					handleInputChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>
				}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault()
						handleSubmit(
							e as unknown as React.FormEvent<HTMLFormElement>
						)
					}
				}}
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
							<span className="sr-only">Clear Chat history</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top">
						Clear Chat history
					</TooltipContent>
				</Tooltip>

				<Button
					disabled={isLoading}
					type="submit"
					size="sm"
					className="ml-auto gap-1.5"
				>
					Send
					{isLoading ? (
						<Loader2 className="size-3.5 animate-spin" />
					) : (
						<CornerDownLeft className="size-3.5" />
					)}
				</Button>
			</div>
		</form>
	)
}

export default ChatInput
