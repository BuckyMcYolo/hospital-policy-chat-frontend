import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import React from "react"

const Page = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<Alert className="w-80">
				<AlertTitle>
					Coming Soon
				</AlertTitle>
				<AlertDescription>
				The voice feature is coming soon
				</AlertDescription>
			</Alert>
		</div>
	)
}

export default Page
