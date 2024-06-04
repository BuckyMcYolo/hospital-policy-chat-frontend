"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import React, { useEffect, useRef, useState } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { patients, Patient } from "@/components/unit-voice/patientTypes"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import SiriAnimation from "@/components/misc/siriAnimation"
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card"
import { Mic, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const Page = () => {
	const [role, setRole] = useState<string | null>(null)
	const [recording, setRecording] = useState(false)
	const [microphone, setMicrophone] = useState<MediaRecorder | null>(null)
	const socket = useRef<WebSocket | null>(null)
	const captionsRef = useRef<HTMLDivElement | null>(null)

	const [patientList, setPatientList] = useState<Patient[] | null>([])

	useEffect(() => {
		if (role === "unitNurse") {
			const nursePatientList = patients
				.filter((patient) => patient.unitType === "ICU")
				.slice(0, 2)

			setPatientList(nursePatientList)
		} else if (role === "chargeNurse") {
			const nursePatientList = patients
				.filter((patient) => patient.unitType === "ICU")
				.slice(0, 5)

			setPatientList(nursePatientList)
		} else if (role === "physician") {
			setPatientList(patients)
		}
	}, [role])

	useEffect(() => {
		socket.current = new WebSocket("ws://localhost:5000")

		socket.current.addEventListener("open", async () => {
			console.log("client: connected to server")
		})

		socket.current.addEventListener("message", (event) => {
			const data = JSON.parse(event.data)
			console.log("client: data received", data)
			if (data.channel.alternatives[0].transcript !== "") {
				if (captionsRef.current) {
					captionsRef.current.innerHTML = data
						? `<span>${data.channel.alternatives[0].transcript}</span>`
						: ""
				}
			}
		})

		socket.current.addEventListener("close", () => {
			console.log("client: disconnected from server")
		})

		return () => {
			if (socket.current) {
				socket.current.close()
			}
		}
	}, [])

	const getMicrophone = async (): Promise<MediaRecorder> => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			})
			return new MediaRecorder(stream, { mimeType: "audio/webm" })
		} catch (error) {
			console.error("error accessing microphone:", error)
			throw error
		}
	}

	const openMicrophone = async (
		microphone: MediaRecorder,
		socket: WebSocket
	): Promise<void> => {
		return new Promise((resolve) => {
			microphone.onstart = () => {
				console.log("client: microphone opened")
				setRecording(true)
				resolve()
			}

			microphone.onstop = () => {
				console.log("client: microphone closed")
				setRecording(false)
			}

			microphone.ondataavailable = (event: BlobEvent) => {
				console.log("client: microphone data received")
				if (
					event.data.size > 0 &&
					socket.readyState === WebSocket.OPEN
				) {
					socket.send(event.data)
				}
			}

			microphone.start(1000)
		})
	}

	const closeMicrophone = async (
		microphone: MediaRecorder
	): Promise<void> => {
		microphone.stop()
	}

	const handleButtonClick = async () => {
		if (!microphone) {
			try {
				const mic = await getMicrophone()
				setMicrophone(mic)
				if (socket.current) {
					await openMicrophone(mic, socket.current)
				}
			} catch (error) {
				console.error("error opening microphone:", error)
			}
		} else {
			await closeMicrophone(microphone)
			setMicrophone(null)
		}
	}

	return (
		<div className="w-full h-full flex flex-col items-center p-2">
			<Select onValueChange={(e) => setRole(e)}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Please Choose Role" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="chargeNurse">Charge Nurse</SelectItem>
					<SelectItem value="unitNurse">Unit Nurse</SelectItem>
					<SelectItem value="physician">Physician</SelectItem>
				</SelectContent>
			</Select>
			{!role &&
				Array.from({ length: 10 }).map((_, i) => (
					<Skeleton className="w-full h-12 mt-4" />
				))}

			{role === "physician" && patientList && patientList.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Patient</TableHead>
							<TableHead>Diagnosis</TableHead>
							<TableHead>Unit Type</TableHead>
							<TableHead>Room Number</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{patientList.map((patient) => (
							<TableRow key={patient.id}>
								<TableCell>{patient.firstName}</TableCell>
								<TableCell>
									{patient.diagnosis[0].description}
								</TableCell>
								<TableCell>{patient.unitType}</TableCell>
								<TableCell>{patient.roomNumber}</TableCell>
							</TableRow>
						))}
					</TableBody>
					{/* <TableFooter>
						<TableRow>
							<TableCell>Total</TableCell>
							<TableCell>$2,500.00</TableCell>
						</TableRow>
					</TableFooter> */}
				</Table>
			) : null}
			<div className="absolute bottom-0 ">
				<Card className="py-3 w-32 text-center">
					<CardTitle>
						<Button
							onClick={handleButtonClick}
							variant="ghost"
							size="icon"
							id="record"
						>
							<Mic className="w-6 h-6" />
						</Button>
						{/* <Button
							onClick={() => setRecording(false)}
							variant="ghost"
							size="icon"
							id="stop"
						>
							<StopCircle className="w-6 h-6" />
						</Button> */}
						<div id="captions" ref={captionsRef}></div>
					</CardTitle>
				</Card>
			</div>
		</div>
	)
}

export default Page
