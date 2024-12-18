"use client"

import SelectorCard from "@/components/voice-chat/SelectorCard"
import React, { useEffect, useRef, useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { patients, Patient } from "@/components/unit-voice/patientTypes"
import { Card, CardTitle } from "@/components/ui/card"
import { Mic, X } from "lucide-react"
import Siriwave from "siriwave"
import WaveFormDisplay from "@/components/voice-chat/WaveFormDisplay"
import PatientDisplay from "@/components/voice-chat/PatientDisplay"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [role, setRole] = useState<string | null>(null)
	const [startRecording, setStartRecording] = useState(false)
	// For drawing the siri waveform
	const siriwaveRef = useRef<Siriwave | null>(null)
	const ttsSiriwaveRef = useRef<Siriwave | null>(null)
	const captionsRef = useRef<HTMLDivElement | null>(null)

	// For the Display message
	const [hideVoiceTip, setHideVoiceTip] = useState(false)

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
				.slice(0, 8)
			const reducedChargeNursePatientList = nursePatientList.map(
				(patient) => ({
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
					diagnosis: patient.diagnosis,
					medications: patient.medications,
					allergies: patient.allergies,
					contactInfo: patient.contactInfo,
					O2Therapy: patient.O2Therapy,
					providers: patient.providers
				})
				//doesnt have vitals, inputs, outputs, labs, orders or fluid balance
			)
			setPatientList(reducedChargeNursePatientList)
		} else if (role === "physician") {
			const physicianPatientList = patients.map((patient) => ({
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
				diagnosis: patient.diagnosis,
				medications: patient.medications,
				allergies: patient.allergies,
				providers: patient.providers
				// has even less info than charge nurse
			}))
			setPatientList(physicianPatientList)
		}
	}, [role])

	const getMicrophone = async (): Promise<MediaRecorder> => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true
			})

			if (!stream) {
				throw new Error("No stream")
			}

			return new MediaRecorder(stream, { mimeType: "audio/webm" })
		} catch (error) {
			toast.error(`Error accessing microphone: ${error?.toString()}`)
			throw error
		}
	}

	if (!role) {
		return <SelectorCard setRole={setRole} />
	}
	return (
		<div className="w-full h-full">
			{!hideVoiceTip && (
				<div className="w-full flex justify-center">
					<Alert variant="default" className="w-[400px] my-4">
						<X
							className="size-4 cursor-pointer"
							onClick={() => {
								setHideVoiceTip(true)
								localStorage.setItem("hideVoiceChatTip", "true")
							}}
						/>
						<AlertTitle>
							Welcome to the ICU Voice Chat Interface
						</AlertTitle>
						<AlertDescription>
							Click on a patient's name to view their details.
							Click the mic to start asking the AI questions.
						</AlertDescription>
					</Alert>
				</div>
			)}
			{/* {children} */}
			{startRecording && (
				<WaveFormDisplay
					siriwaveRef={siriwaveRef}
					ttsSiriwaveRef={ttsSiriwaveRef}
					role={role}
					patientList={patientList}
				/>
			)}
			<PatientDisplay role={role} patientList={patientList} />
			<section className="w-full flex flex-col items-center">
				<div className="absolute bottom-0">
					<Card className="py-3 w-64 text-center">
						{startRecording ? (
							<CardTitle>
								<div id="captions" ref={captionsRef}></div>
								{siriwaveRef.current && "You"}
								<div id="siriwave" />
								{ttsSiriwaveRef.current && "AI"}
								<div id="tts-siriwave" />
							</CardTitle>
						) : (
							<CardTitle>
								<Button
									onClick={() => {
										getMicrophone().then(
											(mediaRecorder) => {
												if (mediaRecorder) {
													setStartRecording(true)
												} else {
													toast.error(
														"Error accessing microphone"
													)
												}
											}
										)
									}}
									className=""
									startIcon={<Mic size={18} />}
								>
									Start Recording
								</Button>
							</CardTitle>
						)}
					</Card>
				</div>{" "}
			</section>
		</div>
	)
}

export default Layout
