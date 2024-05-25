import { CSVLoader } from "langchain/document_loaders/fs/csv"
import { CharacterTextSplitter } from "langchain/text_splitter"

export async function readCSV(path: string) {
	const loader = new CSVLoader(path)

	const docs = await loader.load()
	console.log(docs)

	// const textSplitter = new CharacterTextSplitter({
	// 	chunkSize: 5,
	// 	chunkOverlap: 2,
	// })

	// const text = await textSplitter.splitDocuments(docs)

	// console.log(text[0])
	// return text

	// console.log(docs, docs.length)

	// const docsWithMetaData = docs.map((doc) => {
	// 	const newDoc = {
	// 		...doc,
	// 		metadata: {
	// 			...doc.metadata,
	// 			isInventory: true,
	// 		},
	// 	}
	// 	return newDoc
	// })

	// console.log(docsWithMetaData)

	// return docs
}
