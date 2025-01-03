import { Pinecone } from "@pinecone-database/pinecone"

let pineconeClientInstance: Pinecone | null = null

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
// Create pineconeIndex if it doesn't exist
async function createIndex(client: Pinecone, indexName: string) {
	try {
		await client.createIndex({
			name: indexName,
			dimension: 1536,
			metric: "cosine",
			spec: {
				serverless: {
					cloud: "aws",
					region: "us-east-1",
				},
			},
		})
		console.log(
			`Waiting for ${process.env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
		)
		await delay(process.env.INDEX_INIT_TIMEOUT as unknown as any)
		console.log("Index created !!")
	} catch (error) {
		console.error("error ", error)
		throw new Error("Index creation failed")
	}
}

// Initialize index and ready to be accessed.
async function initPineconeClient() {
	try {
		const pineconeClient = new Pinecone({
			apiKey: process.env.PINECONE_API_KEY ?? "",
		})
		const indexName = process.env.PINECONE_INDEX_NAME ?? "quickstart"

		const existingIndexes = await pineconeClient.listIndexes()
		//@ts-ignore
		const indexExists = existingIndexes.indexes.some(
			(index) => index.name === indexName
		)

		if (!indexExists) {
			console.log("Creating your index...")
			createIndex(pineconeClient, indexName)
		} else {
			console.log("Your index already exists. nice !!")
		}

		return pineconeClient
	} catch (error) {
		console.error("error", error)
		throw new Error("Failed to initialize Pinecone Client")
	}
}

export async function getPineconeClient() {
	if (!pineconeClientInstance) {
		pineconeClientInstance = await initPineconeClient()
	}

	return pineconeClientInstance
}
