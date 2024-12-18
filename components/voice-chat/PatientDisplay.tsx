"use client"

import React, { useEffect, useRef, useState } from "react"
import { patients, Patient } from "@/components/unit-voice/patientTypes"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"
import { ArrowDown, ArrowUp, TrendingDown } from "lucide-react"
import { useChat, Message } from "ai/react"
import { toast } from "sonner"
import moment from "moment"
import Siriwave from "siriwave"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Card, CardTitle } from "@/components/ui/card"
import PatientInfoSheet from "./PatientInfoSheet"

const PatientDisplay = ({
	role,
	patientList
}: {
	role: string | null
	patientList: Patient[] | null
}) => {
	const [isSheetOpen, setIsSheetOpen] = useState(false)

	const StatusIcon = ({ status }: { status: string }) => {
		const iconProps = { size: 13 }

		switch (status) {
			case "Critical":
				return <ArrowDown {...iconProps} className="text-red-500" />
			case "Improving":
				return <ArrowUp {...iconProps} className="text-green-500" />
			case "Deteriorating":
				return (
					<TrendingDown {...iconProps} className="text-yellow-500" />
				)
			default:
				return null
		}
	}

	const PatientStatus = ({ status }: { status: string }) => (
		<Badge variant="outline">
			{status}
			<span className="ml-1">
				<StatusIcon status={status} />
			</span>
		</Badge>
	)

	interface DateFormatProps {
		date: string | Date
		isPhysician: boolean
	}

	const formatDate = ({ date, isPhysician }: DateFormatProps): string => {
		const format = isPhysician ? "YYYY-MM-DD" : "MM/DD/YYYY"
		return moment(date).format(format)
	}

	interface DateOfBirth {
		dateOfBirth: string | Date
	}

	const calculateAge = ({ dateOfBirth }: DateOfBirth): number => {
		return moment().diff(dateOfBirth, "years")
	}

	const PatientTable = ({
		role,
		patientList
	}: {
		role: string | null
		patientList: Patient[] | null
	}) => {
		if (!patientList?.length) return null

		const isPhysician = role === "physician"
		const sortedPatients = isPhysician
			? [...patientList].sort((a, b) =>
					a.unitType.localeCompare(b.unitType)
			  )
			: patientList

		return (
			<div>
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
						{sortedPatients.map((patient) => (
							<TableRow
								key={patient.id}
								onClick={() => setIsSheetOpen(true)}
							>
								<TableCell>
									{patient.firstName} {patient.lastName}
								</TableCell>
								<TableCell>
									{formatDate({
										date: patient.dateOfBirth,
										isPhysician
									})}{" "}
									(
									{calculateAge({
										dateOfBirth: patient.dateOfBirth
									})}
									)
								</TableCell>
								<TableCell>{patient?.chiefComplaint}</TableCell>
								<TableCell>
									{isPhysician ? (
										<PatientStatus
											status={
												patient.vitalStatus ?? "Unknown"
											}
										/>
									) : (
										patient.vitalStatus ?? "Unknown"
									)}
								</TableCell>
								<TableCell>{patient.roomNumber}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		)
	}

	return (
		<div className=" p-2">
			<PatientTable role={role} patientList={patientList} />
			<PatientInfoSheet
				isSheetOpen={isSheetOpen}
				setIsSheetOpen={setIsSheetOpen}
			/>
		</div>
	)
}

export default PatientDisplay
