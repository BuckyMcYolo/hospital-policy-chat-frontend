import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

export async function readPDF(path: string) {
	try {
		const loader = new PDFLoader(path)

		const docs = await loader.load()

		const textSplitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000,
			chunkOverlap: 200,
		})

		const text = await textSplitter.splitDocuments(docs)

		return text
	} catch (e) {
		console.error(e)
		throw new Error("Failed to read PDF")
	}
}
