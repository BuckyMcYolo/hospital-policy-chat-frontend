import { NextRequest, NextResponse } from "next/server"
import { callChain } from "@/lib/langchain"
import { Message } from "ai"
import { HumanMessage, AIMessage } from "langchain/schema"

export const maxDuration = 60 // seconds

const formatMessage = (message: Message) => {
	return `${message.role === "user" ? "Human" : "Assistant"}: ${
		message.content
	}`
}

export async function POST(req: NextRequest) {
	const body = await req.json()
	const messages = body.messages ?? []
	const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
	const question = messages[messages.length - 1].content

	const pastMessages = messages.map((message: Message) => {
		if (message.role === "user") {
			return new HumanMessage(message.content)
		} else {
			return new AIMessage(message.content)
		}
	})

	console.log("Chat history ", formattedPreviousMessages)
	console.log("pastMessages ", pastMessages)

	if (!question) {
		return NextResponse.json("Error: No question in the request", {
			status: 400,
		})
	}

	try {
		const streamingTextResponse = callChain({
			question,
			// chatHistory: formattedPreviousMessages.join("\n"),
			chatHistory: pastMessages,
		})

		return streamingTextResponse
	} catch (error) {
		console.error("Internal server error ", error)
		return NextResponse.json("Error: Something went wrong. Try again!", {
			status: 400,
		})
	}
}
