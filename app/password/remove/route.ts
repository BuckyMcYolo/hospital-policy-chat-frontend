import { serialize } from "cookie"
import { cookies } from "next/headers"

export async function POST(request: Request) {
	const cookieStore = cookies()
	cookieStore.delete(process.env.PASSWORD_COOKIE_NAME!)

	return new Response("Successfully logged out", {
		status: 200,
		headers: {},
	})
}
