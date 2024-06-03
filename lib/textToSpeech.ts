export async function getTextToSpeech(text: string): Promise<any> {
	try {
		if (!text) {
			throw new Error("Text is required")
		}

		const res = await fetch("http://localhost:5000/v1/tts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		})
		const data = await res.json()
		return data.audioUrl
		// const arrayBuffer = await res.arrayBuffer()

		// if (!arrayBuffer) {
		// 	throw new Error("Error getting audio")
		// }
		// const blob = new Blob([arrayBuffer], { type: "audio/wav" })
		// console.log(blob)
		// const url = URL.createObjectURL(blob)
		// console.log(url)
		// return url
	} catch (error) {
		console.error(error)
	}
}
