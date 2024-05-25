"use client"

import React from "react"
import { Message } from "ai/react"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "../ui/card"
import { ChatMessageExtended } from "./ChatSection"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import ReactMarkdown from "react-markdown"
import { formattedSourceText } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Balancer from "react-wrap-balancer"
import { Button } from "../ui/button"
import { Check, Copy } from "lucide-react"
import { useCopyToClipboard } from "../misc/use-copy-to-clipboard"
import { ChatMessageContent } from "./ChatMessageContent"
import { MessageAnnotation } from "./helpers/types"

type ChatMessageExtendedWithLoading = ChatMessageExtended & {
	isLoading: boolean
}

const ChatCard = ({
	id,
	role,
	content,
	sources,
	isLoading,
	annotations,
}: ChatMessageExtendedWithLoading) => {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
	return (
		<div>
			<Card className="p-8 group">
				<CardTitle className="pb-1 flex justify-between">
					{role === "user" ? "You" : "AI"}
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 opacity-0 group-hover:opacity-100"
						onClick={() => {
							copyToClipboard(content)
						}}
					>
						{isCopied ? (
							<Check className="w-4 h-4" />
						) : (
							<Copy className="w-4 h-4" />
						)}
					</Button>
				</CardTitle>
				<CardContent className="text-sm p-2">
					<ScrollArea className="h-full pb-3">
						<Balancer>
							<ChatMessageContent
								messageContent={content}
								isLoading={isLoading}
								annotations={annotations as MessageAnnotation[]}
							/>
						</Balancer>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</CardContent>
				{sources.length > 0 && (
					<CardFooter className="text-neutral-500 dark:text-neutral-400">
						<Accordion type="single" collapsible className="w-full">
							{sources.map((source, index) => (
								<AccordionItem key={index} value={source}>
									<AccordionTrigger>
										Source {index + 1}
									</AccordionTrigger>
									<AccordionContent>
										<ReactMarkdown>
											{formattedSourceText(source)}
										</ReactMarkdown>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardFooter>
				)}
			</Card>
			{/* <SimpleMarkdownTest content={"test"} /> */}
		</div>
	)
}

export default ChatCard
