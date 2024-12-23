export async function getTextToSpeech(text: string): Promise<any> {
  try {
    if (!text) {
      throw new Error("Text is required")
    }

    const res = await fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000/v1/tts"
        : process.env.NEXT_PUBLIC_PRODUCTION_URL + "/v1/tts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      }
    )
    const data = await res.json()
    return data.audioUrl
  } catch (error) {
    console.error(error)
  }
}
