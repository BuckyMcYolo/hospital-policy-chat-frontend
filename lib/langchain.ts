import { streamingModel, nonStreamingModel } from "./llm"
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./prompt-templates"
import { ConversationalRetrievalQAChain } from "langchain/chains"
import { getVectorStore } from "./vector-store"
import { getPineconeClient } from "./pinecone-client"
import {
	StreamingTextResponse,
	LangChainStream,
	StreamData,
	experimental_StreamData,
} from "ai"
import { BufferMemory, ChatMessageHistory } from "langchain/memory"
import { HumanMessage, AIMessage } from "langchain/schema"

// import { ChatPromptTemplate } from "@langchain/core/prompts"

type callChainArgs = {
	question: string
	chatHistory: HumanMessage[] | AIMessage[]
}

export async function callChain({ question, chatHistory }: callChainArgs) {
	try {
		if (!chatHistory) {
			console.error("Chat history is undefined or null.")
		}
		console.log("question", question)

		console.log("chathistory", chatHistory)

		const sanitizedQuestion = question.trim().replaceAll("\n", " ")
		const pineconeClient = await getPineconeClient()
		const vectorStore = await getVectorStore(pineconeClient)
		const { stream, handlers } = LangChainStream({
			experimental_streamData: true,
		})

		const memory = new BufferMemory({
			memoryKey: "chat_history",
			inputKey: "question",
			outputKey: "text",
			returnMessages: true,
			chatHistory: new ChatMessageHistory(chatHistory),
		})

		const data = new StreamData()

		const chain = ConversationalRetrievalQAChain.fromLLM(
			streamingModel,
			vectorStore.asRetriever(),
			{
				qaTemplate: QA_TEMPLATE,
				questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
				returnSourceDocuments: true,
				returnGeneratedQuestion: true,
				questionGeneratorChainOptions: {
					llm: nonStreamingModel,
				},
				memory: memory,
				outputKey: "sources",
				inputKey: "question",
			}
		)

		chain
			.call(
				{
					question: sanitizedQuestion,
					chat_history: chatHistory,
				},
				[handlers]
			)
			.then(async (res) => {
				const sourceDocuments = res?.sourceDocuments
				const firstTwoDocuments = sourceDocuments.slice(0, 2)
				const pageContents = firstTwoDocuments.map(
					({ pageContent }: { pageContent: string }) => pageContent
				)
				console.log("already appended ", data)
				data.append({
					sources: pageContents,
				})
				data.close()
			})

		// Return the readable stream
		return new StreamingTextResponse(stream, {}, data)
	} catch (e) {
		console.error(e)
		throw new Error("Call chain method failed to execute successfully!!")
	}
}
