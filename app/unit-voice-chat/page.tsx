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
import { Mic, StopCircle, Triangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChat, Message } from "ai/react"
import { toast } from "sonner"
import moment from "moment"
import Siriwave from "react-siriwave"

const Page = () => {
	const [role, setRole] = useState<string | null>(null)
	const [recording, setRecording] = useState(false)
	const [microphone, setMicrophone] = useState<MediaRecorder | null>(null)
	const socket = useRef<WebSocket | null>(null)
	const captionsRef = useRef<HTMLDivElement | null>(null)
	const [patientList, setPatientList] = useState<Patient[] | null>([])
	const [audioState, setAudioState] = useState<HTMLAudioElement | null>(null)
	const [isAudioPlaying, setIsAudioPlaying] = useState(false)

	const audioContext = useRef<AudioContext | null>(null)
	const analyser = useRef<AnalyserNode | null>(null)
	const dataArray = useRef<Uint8Array | null>(null)
	const animationFrameId = useRef<number | null>(null)
	const [amplitude, setAmplitude] = useState(0)
	//tts waveform
	const [ttsAmplitude, setTtsAmplitude] = useState(0)
	const ttsAudioContext = useRef<AudioContext | null>(null)
	const ttsAnalyser = useRef<AnalyserNode | null>(null)
	const ttsDataArray = useRef<Uint8Array | null>(null)
	const ttsAnimationFrameId = useRef<number | null>(null)

	const handleAudio = async (message: Message) => {
		try {
			const res = await fetch("http://localhost:5000/v1/tts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: message.content }),
			})
			const blob = await res.blob()
			const audioUrl = URL.createObjectURL(blob)
			const newAudio = new Audio(audioUrl)

			// Set up TTS AudioContext and AnalyserNode
			if (!ttsAudioContext.current) {
				ttsAudioContext.current = new AudioContext()
			}
			const source =
				ttsAudioContext.current.createMediaElementSource(newAudio)
			ttsAnalyser.current = ttsAudioContext.current.createAnalyser()
			source.connect(ttsAnalyser.current)
			ttsAnalyser.current.connect(ttsAudioContext.current.destination)
			ttsAnalyser.current.fftSize = 2048
			ttsDataArray.current = new Uint8Array(ttsAnalyser.current.fftSize)

			// Set the new audio state and play the audio
			setAudioState(newAudio)

			newAudio.play()
			setIsAudioPlaying(true)

			newAudio.onended = () => {
				setIsAudioPlaying(false)
				cancelAnimationFrame(ttsAnimationFrameId.current!) // Stop the TTS waveform drawing
			}

			// Start drawing the TTS waveform
			drawTTSWaveform()
		} catch (error) {
			console.error("Error playing audio:", error)
		}
	}

	const { messages, data, setMessages, reload, stop, isLoading, append } =
		useChat({
			initialMessages: [
				{
					role: "system",
					content:
						"Your name is Ava.  Please provide with short and conise responses. Your output is being streamed to a speech model. Here are some tips for acheiving better audio output: 1. If you need to insert a longer pause in your audio, use the ellipsis: .... A comma (,) present in your text will be treated as a very short pause. 2. Filler words such as um and uh can also be used to offer a more natural sounding audio output. Please use longer words instead of acronyms. For example, use 'Oxygen' instead of '02'.",
					id: "1wbjkjfgbkj",
				},
			],
			api:
				process.env.NODE_ENV === "development"
					? "http://localhost:5000/v1/chat/voice"
					: "https://test.hospital-policy-chat.com/v1/chat/stream",
			onError: (error) => {
				console.log(error)
				toast.error(error.message)
			},
			onFinish(message) {
				handleAudio(message)
			},
			// onResponse(response) {
			// 	async function getAudio() {
			// 	const blob = await response.blob()
			// 	const audioUrl = URL.createObjectURL(blob)
			// 	const audioPlayer = new Audio(audioUrl)
			// 	audioPlayer.play()
			// 	}
			// 	getAudio()
			// },
			body: {
				patientList,
			},
		})

	useEffect(() => {
		if (role === "unitNurse") {
			const nursePatientList = patients
				.filter((patient) => patient.unitType === "ICU")
				.slice(0, 2)

			setPatientList(nursePatientList)
		} else if (role === "chargeNurse") {
			const nursePatientList = patients
				.filter((patient) => patient.unitType === "ICU")
				.slice(0, 8)

			const reducedChargeNursePatientList = []

			for (let i = 0; i < nursePatientList.length; i++) {
				const patient = nursePatientList[i]
				const reducedPatient = {
					firstName: patient.firstName,
					lastName: patient.lastName,
					dateOfBirth: patient.dateOfBirth,
					vitalStatus: patient.vitalStatus,
					roomNumber: patient.roomNumber,
					id: patient.id,
					gender: patient.gender,
					admissionDate: patient.admissionDate,
					chiefComplaint: patient.chiefComplaint,
					unitType: patient.unitType,
				}
				reducedChargeNursePatientList.push(reducedPatient)
			}

			setPatientList(reducedChargeNursePatientList)
		} else if (role === "physician") {
			const physicianPatientList = []

			for (let i = 0; i < patients.length; i++) {
				const patient = patients[i]
				const reducedPatient = {
					firstName: patient.firstName,
					lastName: patient.lastName,
					dateOfBirth: patient.dateOfBirth,
					vitalStatus: patient.vitalStatus,
					roomNumber: patient.roomNumber,
					id: patient.id,
					gender: patient.gender,
					admissionDate: patient.admissionDate,
					chiefComplaint: patient.chiefComplaint,
					unitType: patient.unitType,
				}
				physicianPatientList.push(reducedPatient)
			}

			setPatientList(physicianPatientList)
		}
	}, [role])

	useEffect(() => {
		if (role) {
			socket.current = new WebSocket("ws://localhost:5000")

			socket.current.addEventListener("open", async () => {
				console.log("client: connected to server")
			})

			socket.current.addEventListener("message", (event) => {
				const data = JSON.parse(event.data)
				console.log("client: data received", data)
				if (
					data.type === "Results" &&
					data.channel.alternatives[0].transcript !== ""
				) {
					// Sudo code:
					//Once I receive the STT response I need to make a new API Request to get the AI response from my question (Groq) and pass in my patient list as a parameter

					append({
						role: "user",
						content: data.channel.alternatives[0].transcript,
						id: String(messages.length + 1),
					})
					//
					//In that API Request I can just send back the TTS audio and play it here and show some UI for AI Speech
					//
					//Also will need some state to prevent duplicate STT requests from getting sent to the WS server while the first is being processed
				}
			})

			socket.current.addEventListener("close", () => {
				console.log("client: disconnected from server")
			})
		}

		// return () => {
		// 	if (socket.current) {
		// 		socket.current.close()
		// 	}
		// }
	}, [role])

	const getMicrophone = async (): Promise<MediaRecorder> => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			})

			// Setup Web Audio API
			if (!audioContext.current) {
				audioContext.current = new AudioContext()
			}
			const source = audioContext.current.createMediaStreamSource(stream)
			analyser.current = audioContext.current.createAnalyser()
			source.connect(analyser.current)
			analyser.current.fftSize = 2048
			dataArray.current = new Uint8Array(analyser.current.fftSize)

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
				drawSiriWave()
			}

			microphone.onstop = () => {
				console.log("client: microphone closed")
				setRecording(false)
				cancelAnimationFrame(animationFrameId.current!)
			}

			microphone.ondataavailable = (event: BlobEvent) => {
				console.log(event.data)

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

	const drawSiriWave = () => {
		const draw = () => {
			if (!analyser.current || !dataArray.current) return

			// if (!recording) return
			animationFrameId.current = requestAnimationFrame(draw)

			analyser.current.getByteTimeDomainData(dataArray.current)

			// Normalize the amplitude for Siriwave
			let sum = 0
			for (let i = 0; i < dataArray.current.length; i++) {
				sum +=
					(dataArray.current[i] - 128) * (dataArray.current[i] - 128)
			}
			const rms = Math.sqrt(sum / dataArray.current.length)
			const amplitude = (rms / 128.0) * 25

			// Debugging: log the amplitude
			// console.log("Amplitude:", amplitude)

			setAmplitude(amplitude)
		}

		draw()
	}

	const drawTTSWaveform = () => {
		const draw = () => {
			if (!ttsAnalyser.current || !ttsDataArray.current) return

			ttsAnimationFrameId.current = requestAnimationFrame(draw)

			ttsAnalyser.current.getByteTimeDomainData(ttsDataArray.current)

			// Normalize the amplitude for Siriwave
			let sum = 0
			for (let i = 0; i < ttsDataArray.current.length; i++) {
				sum +=
					(ttsDataArray.current[i] - 128) *
					(ttsDataArray.current[i] - 128)
			}
			const rms = Math.sqrt(sum / ttsDataArray.current.length)
			const amplitude = (rms / 128.0) * 25

			// Debugging: log the amplitude
			// console.log("TTS Amplitude:", amplitude)

			setTtsAmplitude(amplitude)
		}

		draw()
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
			{!role && (
				<Alert className="mt-20 sm:w-80 lg:w-96" variant="destructive">
					<AlertTitle>Please select a role</AlertTitle>
					<AlertDescription>
						Please select a role to view patient data
					</AlertDescription>
				</Alert>
			)}

			{role === "physician" && patientList && patientList.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Patient</TableHead>
							<TableHead>DOB/Age</TableHead>
							<TableHead>Chief Complaint</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Room Number</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{patientList
							.sort((a, b) =>
								a.unitType.localeCompare(b.unitType)
							)
							.map((patient) => (
								<TableRow key={patient.id}>
									<TableCell>
										{patient.firstName} {patient.lastName}
									</TableCell>
									<TableCell>
										{moment(patient.dateOfBirth).format(
											"YYYY-MM-DD"
										)}{" "}
										(
										{moment().diff(
											patient.dateOfBirth,
											"years"
										)}
										)
									</TableCell>
									<TableCell>
										{patient?.chiefComplaint}
									</TableCell>
									<TableCell>{patient.vitalStatus}</TableCell>
									<TableCell>{patient.roomNumber}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			) : role === "unitNurse" &&
			  patientList &&
			  patientList.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Patient</TableHead>
							<TableHead>DOB/Age</TableHead>
							<TableHead>Chief Complaint</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Room Number</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{patientList.map((patient) => (
							<TableRow key={patient.id}>
								<TableCell>
									{patient.firstName} {patient.lastName}
								</TableCell>
								<TableCell>
									{moment(patient.dateOfBirth).format(
										"MM/DD/YYYY"
									)}{" "}
									(
									{moment().diff(
										patient.dateOfBirth,
										"years"
									)}
									)
								</TableCell>
								<TableCell>{patient?.chiefComplaint}</TableCell>
								<TableCell>{patient.vitalStatus}</TableCell>
								<TableCell>{patient.roomNumber}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : null}

			<div className="absolute bottom-0 ">
				<Card className="py-3 w-64 text-center">
					<CardTitle>
						<Button
							onClick={handleButtonClick}
							variant="ghost"
							size="icon"
							id="record"
							disabled={!role}
						>
							<Mic
								className={`w-6 h-6 ${
									recording ? "text-red-500" : ""
								}`}
							/>
						</Button>
						<Button
							onClick={() => {
								append({
									role: "user",
									content:
										"What is David MArtinezes date of birth",
									id: String(messages.length + 1),
								})
							}}
							variant="ghost"
							size="icon"
							id="stop"
						>
							<Mic className="w-6 h-6" />
						</Button>
						<div>
							You
							<Siriwave
								theme="ios"
								speed={0.1}
								amplitude={amplitude}
								frequency={10}
								//light blue
								color="#00bfff"
								cover={true}
								autostart={true}
							/>{" "}
							AI
							<Siriwave
								theme="ios"
								speed={0.1}
								amplitude={ttsAmplitude}
								frequency={10}
								color="#ff0000"
								cover={true}
								autostart={true}
							/>
						</div>
						<div id="captions" ref={captionsRef}></div>
					</CardTitle>
				</Card>
			</div>
		</div>
	)
}

export default Page
