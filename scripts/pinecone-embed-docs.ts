import { embedAndStoreDocs } from "@/lib/vector-store"
import { readPDF } from "@/lib/pdf-loader"
import { getPineconeClient } from "@/lib/pinecone-client"
import { Pinecone } from "@pinecone-database/pinecone"

export async function pineconeEmbedDocs() {
	try {
		console.log("Initializing Pinecone client")
		const pineConeClient = await getPineconeClient()

		console.log("Reading PDF")
		const text = await readPDF(
			"docs/G2-NPG-orogastric-nasogastric-tube-management.pdf"
		)

		console.log(`Embedding and storing ${text?.length} chunks`)
		await embedAndStoreDocs(pineConeClient, text)

		console.log("Documents embedded and stored")
	} catch (e) {
		console.error(e)
		throw new Error("Failed to embed and store documents")
	}
}

pineconeEmbedDocs()
