"use client"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import {
	ChevronLeft,
	ChevronRight,
	Copy,
	CreditCard,
	MoreVertical,
	Pill,
	Truck,
} from "lucide-react"
import React from "react"
import { Admission } from "../patientExamples"
import moment from "moment"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

const MedicationCard = ({ currentPatient }: { currentPatient: Admission }) => {
	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-start bg-muted/50">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">
						Medications
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Copy className="h-3 w-3" />
							<span className="sr-only">Copy Order ID</span>
						</Button>
					</CardTitle>
					<CardDescription>Last updated: 7 hours ago</CardDescription>
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<Pill className="h-3.5 w-3.5" />
						<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
							Add Medication
						</span>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								size="icon"
								variant="outline"
								className="h-8 w-8"
							>
								<MoreVertical className="h-3.5 w-3.5" />
								<span className="sr-only">More</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Export</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Trash</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<div className="grid gap-3">
					<Table className="w-full">
						<TableCaption>Current Medications</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Medication</TableHead>
								<TableHead>Doseage</TableHead>
								<TableHead>Frequency</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{currentPatient.medications.map((result, index) => {
								return (
									<TableRow key={index}>
										<TableCell>{result.name}</TableCell>
										<TableCell>{result.dose}</TableCell>
										<TableCell>
											{result.frequency}
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</CardContent>
			{/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
				<div className="text-xs text-muted-foreground">
					Updated <time dateTime="2023-11-23">November 23, 2023</time>
				</div>
				<Pagination className="ml-auto mr-0 w-auto">
					<PaginationContent>
						<PaginationItem>
							<Button
								size="icon"
								variant="outline"
								className="h-6 w-6"
							>
								<ChevronLeft className="h-3.5 w-3.5" />
								<span className="sr-only">Previous Order</span>
							</Button>
						</PaginationItem>
						<PaginationItem>
							<Button
								size="icon"
								variant="outline"
								className="h-6 w-6"
							>
								<ChevronRight className="h-3.5 w-3.5" />
								<span className="sr-only">Next Order</span>
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardFooter> */}
		</Card>
	)
}

export default MedicationCard
