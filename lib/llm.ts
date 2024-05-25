// import { ChatOpenAI } from "langchain/chat_models/openai"
import { ChatGroq } from "@langchain/groq"
import { env } from "./config"

export const streamingModel = new ChatGroq({
	modelName: "llama3-70b-8192",
	apiKey: env.GROQ_API_KEY,
	streaming: true,
	// verbose: true,
	temperature: 0.2,
	maxTokens: 4096,
})

export const nonStreamingModel = new ChatGroq({
	modelName: "llama3-70b-8192",
	verbose: true,
	temperature: 0.2,
	maxTokens: 4096,
	apiKey: env.GROQ_API_KEY,
})
