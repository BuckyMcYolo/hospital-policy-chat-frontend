import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formattedSourceText(input: string) {
	return input
		.replace(/\n+/g, " ") // replace multiple new lines with a single space
		.replace(/(\w) - (\w)/g, "$1$2") // remove space before and after hyphen
		.replace(/\s+/g, " ") // replace multiple spaces with a single space
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

interface Data {
	sources: string[]
}

// Maps the sources with the right ai-message
export const getSources = (data: Data[], role: string, index: number) => {
	if (role === "assistant" && index >= 1 && (index - 1) % 2 === 0) {
		const sourcesIndex = (index - 1) / 2
		if (data[sourcesIndex] && data[sourcesIndex].sources) {
			return data[sourcesIndex].sources
		}
	}
	return []
}
