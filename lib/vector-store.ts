import { Pinecone } from "@pinecone-database/pinecone"
import { Document } from "@langchain/core/documents"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone"

export async function embedAndStoreDocs(
	client: Pinecone, //already initialized Pinecone client
	docs: Document[]
) {
	try {
		const embeddings = new OpenAIEmbeddings()
		const index = client.index(process.env.PINECONE_INDEX_NAME ?? "")

		await PineconeStore.fromDocuments(docs, embeddings, {
			pineconeIndex: index,
			namespace: process.env.PINECONE_NAMESPACE ?? "hospital-policies",
			textKey: "text",
		})
	} catch (e) {
		console.error(e)
		throw new Error("Failed to embed and store documents")
	}
}

export async function getVectorStore(client: Pinecone) {
	try {
		const embeddings = new OpenAIEmbeddings()
		const index = client.index(process.env.PINECONE_INDEX_NAME ?? "")

		const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
			pineconeIndex: index,
			textKey: "text",
			namespace: process.env.PINECONE_NAMESPACE ?? "hospital-policies",
		})

		return vectorStore
	} catch (e) {
		console.error(e)
		throw new Error("Failed to get vector store")
	}
}
