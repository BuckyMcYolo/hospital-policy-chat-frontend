"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { curentAdmissions } from "../../components/patients/patientExamples"
import moment from "moment"
import { useRouter } from "next/navigation"

const Page = () => {
	const router = useRouter()
	return (
		<div className="flex sm:justify-center sm:items-start h-full w-full">
			<Card className="m-8 w-full">
				<CardHeader className="px-7">
					<CardTitle>Patients</CardTitle>
					<CardDescription>
						Select a patient to view their details and ask questions
						about their chart.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Patient</TableHead>
								<TableHead>Date of Birth</TableHead>
								<TableHead>Admitted on</TableHead>
								<TableHead>Admission Reason</TableHead>
								<TableHead>Admitting Physician</TableHead>
								<TableHead>Location</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{curentAdmissions.map((admission) => (
								<TableRow
									onClick={() =>
										router.push(
											`/patients/${admission.name}`
										)
									}
									key={admission.name}
									className="cursor-pointer"
								>
									<TableCell>
										<div className="font-medium">
											{admission.name}
										</div>
										<div className="hidden text-sm text-muted-foreground md:inline">
											{admission.email?.primary}
										</div>
									</TableCell>
									<TableCell>
										{moment(admission.dateOfBirth).format(
											"MM-DD-YYYY"
										)}{" "}
										(
										{moment().diff(
											admission.dateOfBirth,
											"years"
										)}{" "}
										yo)
									</TableCell>
									<TableCell>
										{moment(admission.admissionDate).format(
											"MM-DD-YYYY"
										)}
									</TableCell>
									<TableCell>
										{admission.admissionReason}
									</TableCell>
									<TableCell>
										{admission.admittingDoctor}
									</TableCell>
									<TableCell>{admission.room}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}

export default Page
