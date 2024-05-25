import { Check, Copy } from "lucide-react"

import { Message } from "ai"
import { Fragment } from "react"
import { Button } from "../ui/button"
// import ChatAvatar from "./chat-avatar"
import { ChatEvents } from "./helpers/ChatEvents"
import { ChatImage } from "./helpers/ChatImage"
import { ChatSources } from "./helpers/ChatSources"
import ChatTools from "./helpers/ChatTools"
import {
	AnnotationData,
	EventData,
	ImageData,
	MessageAnnotation,
	MessageAnnotationType,
	SourceData,
	ToolData,
} from "./helpers/types"
import Markdown from "react-markdown"
import { useCopyToClipboard } from "../misc/use-copy-to-clipboard"

type ContentDisplayConfig = {
	order: number
	component: JSX.Element | null
}

function getAnnotationData<T extends AnnotationData>(
	annotations: MessageAnnotation[],
	type: MessageAnnotationType
): T[] {
	return annotations.filter((a) => a.type === type).map((a) => a.data as T)
}

export function ChatMessageContent({
	annotations,
	isLoading,
	messageContent,
}: {
	annotations: MessageAnnotation[]
	isLoading: boolean
	messageContent: string
}) {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

	if (!annotations?.length) return <Markdown>{messageContent}</Markdown>

	const imageData = getAnnotationData<ImageData>(
		annotations,
		MessageAnnotationType.IMAGE
	)
	const eventData = getAnnotationData<EventData>(
		annotations,
		MessageAnnotationType.EVENTS
	)
	const sourceData = getAnnotationData<SourceData>(
		annotations,
		MessageAnnotationType.SOURCES
	)
	const toolData = getAnnotationData<ToolData>(
		annotations,
		MessageAnnotationType.TOOLS
	)

	const contents: ContentDisplayConfig[] = [
		{
			order: -3,
			component: imageData[0] ? <ChatImage data={imageData[0]} /> : null,
		},
		{
			order: -2,
			component:
				eventData.length > 0 ? (
					<ChatEvents isLoading={isLoading} data={eventData} />
				) : null,
		},
		{
			order: -1,
			component: toolData[0] ? <ChatTools data={toolData[0]} /> : null,
		},
		{
			order: 0,
			component: (
				// <div className="group flex gap-2">
				<Markdown>{messageContent}</Markdown>
				// 	<Button
				// 		onClick={() => copyToClipboard(messageContent)}
				// 		size="icon"
				// 		variant="ghost"
				// 		className="h-8 w-8 opacity-0 group-hover:opacity-100"
				// 	>
				// 		{isCopied ? (
				// 			<Check className="h-4 w-4" />
				// 		) : (
				// 			<Copy className="h-4 w-4" />
				// 		)}
				// 	</Button>
				// </div>
			),
		},
		{
			order: 1,
			component: sourceData[0] ? (
				<ChatSources data={sourceData[0]} />
			) : null,
		},
	]

	return (
		<div className="flex-1 gap-4 flex flex-col">
			{contents
				.sort((a, b) => a.order - b.order)
				.map((content, index) => (
					<Fragment key={index}>{content.component}</Fragment>
				))}
		</div>
	)
}

export default function ChatMessage({
	chatMessage,
	isLoading,
}: {
	chatMessage: Message
	isLoading: boolean
}) {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
	return (
		<div className="flex items-start gap-4 pr-5 pt-5">
			{/* <ChatAvatar role={chatMessage.role} /> */}
			<div className="group flex flex-1 justify-between gap-2">
				<ChatMessageContent
					messageContent={chatMessage.content}
					annotations={chatMessage.annotations as MessageAnnotation[]}
					isLoading={isLoading}
				/>
				{/* <Button
					onClick={() => copyToClipboard(chatMessage.content)}
					size="icon"
					variant="ghost"
					className="h-8 w-8 opacity-0 group-hover:opacity-100"
				>
					{isCopied ? (
						<Check className="h-4 w-4" />
					) : (
						<Copy className="h-4 w-4" />
					)}
				</Button> */}
			</div>
		</div>
	)
}
