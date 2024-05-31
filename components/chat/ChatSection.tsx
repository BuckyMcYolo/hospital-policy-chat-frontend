"use client"

import React, { useEffect, useRef } from "react"
import ChatInput from "./ChatInput"
import ChatFeed from "./ChatFeed"
import { useChat, Message } from "ai/react"

export interface ChatMessageExtended extends Message {
	sources: string[]
}

const Chat = () => {
	const {
		messages,
		input,
		setInput,
		setMessages,
		handleSubmit,
		handleInputChange,
		data,
		isLoading,
		stop,
		reload,
		append,
	} = useChat({
		initialMessages: [],
		api:
			// process.env.NODE_ENV === "development"
			// 	? "http://localhost:5000/v1/chat/stream"
			// 	:
			"https://test.hospital-policy-chat.com/v1/chat/stream",
	})

	return (
		<>
			<ChatFeed
				data={data}
				messages={messages}
				reload={reload}
				stop={stop}
				isLoading={isLoading}
				append={(message?: Message | undefined) =>
					message && append(message)
				}
				setInput={setInput}
			/>
			<ChatInput
				input={input}
				setInput={setInput}
				handleSubmit={handleSubmit}
				handleInputChange={handleInputChange}
				setMessages={setMessages}
				isLoading={isLoading}
			/>
		</>
	)
}

export default Chat
