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
	Syringe,
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

const LabCard = ({ currentPatient }: { currentPatient: Admission }) => {
	const [currentLab, setCurrentLab] = React.useState(currentPatient.labs[0])
	const [currentLabIndex, setCurrentLabIndex] = React.useState(0)

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-start bg-muted/50">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">
						Lab Results
					</CardTitle>
					<CardDescription>
						{currentPatient.labs.length > 0 &&
							`Last updated: ${moment(
								currentLab.date
							).fromNow()}`}
					</CardDescription>
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<Syringe className="h-3.5 w-3.5" />
						<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
							Order new panel
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
				<div className="">
					<div className="font-semibold flex justify-between"></div>

					<Table className="w-full">
						<TableCaption>
							{currentLab.type} from <br />
							{moment(currentLab.date).format(
								"MMMM D, YYYY hh:mm A"
							)}
						</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Test Name</TableHead>
								<TableHead>Reference Range</TableHead>
								<TableHead>Value</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{currentLab.results.map((result, index) => {
								return (
									<TableRow key={index}>
										<TableCell>{result.test}</TableCell>
										<TableCell>
											{result.referenceRange}
										</TableCell>
										<TableCell>{result.value}</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</CardContent>
			<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
				<div className="text-xs text-muted-foreground">
					Showing {currentLabIndex + 1} of{" "}
					{currentPatient.labs.length} lab results
				</div>
				<Pagination className="ml-auto mr-0 w-auto">
					<PaginationContent>
						<PaginationItem>
							<Button
								size="icon"
								variant="outline"
								className="h-6 w-6"
								disabled={currentLabIndex === 0}
								onClick={() => {
									setCurrentLabIndex(currentLabIndex - 1)
									setCurrentLab(
										currentPatient.labs[currentLabIndex - 1]
									)
								}}
							>
								<ChevronLeft className="h-3.5 w-3.5" />
								<span className="sr-only">Previous Lab</span>
							</Button>
						</PaginationItem>
						<PaginationItem>
							<Button
								size="icon"
								variant="outline"
								className="h-6 w-6"
								disabled={
									currentLabIndex ===
									currentPatient.labs.length - 1
								}
								onClick={() => {
									setCurrentLabIndex(currentLabIndex + 1)
									setCurrentLab(
										currentPatient.labs[currentLabIndex + 1]
									)
								}}
							>
								<ChevronRight className="h-3.5 w-3.5" />
								<span className="sr-only">Next Lab</span>
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardFooter>
		</Card>
	)
}

export default LabCard
