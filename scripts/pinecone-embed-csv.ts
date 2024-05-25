import { readCSV } from "@/lib/csv-loader"
import { getPineconeClient } from "@/lib/pinecone-client"
import { embedAndStoreDocs } from "@/lib/vector-store"

export async function pineconeEmbedCSV() {
	try {
		console.log("Initializing Pinecone client")
		const pineConeClient = await getPineconeClient()

		// console.log("Reading PDF")
		// const text = await readPDF(
		// 	"docs/G2-NPG-orogastric-nasogastric-tube-management.pdf"
		// )
		console.log("Reading CSV")
		const text = await readCSV("docs/cicu-floor-stock.csv")

		// console.log(`Embedding and storing ${text?.length} chunks`)

		// await embedAndStoreDocs(pineConeClient, text)

		console.log("Documents embedded and stored")
	} catch (e) {
		console.error(e)
		throw new Error("Failed to read CSV")
	}
}

pineconeEmbedCSV()
