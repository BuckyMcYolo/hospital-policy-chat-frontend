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
	List,
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

const OrdersCard = ({ currentPatient }: { currentPatient: Admission }) => {
	const orders = currentPatient.orders || []

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-start bg-muted/50">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">
						Orders
					</CardTitle>
					<CardDescription>
						{orders.length > 0 &&
							`Last updated: ${moment(orders[0].date).fromNow()}`}
					</CardDescription>
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<List className="h-3.5 w-3.5" />
						<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
							New Order
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
						{/* <TableCaption>
							{currentLab.type} from <br />
							{moment(currentLab.date).format(
								"MMMM D, YYYY hh:mm A"
							)}
						</TableCaption> */}
						<TableHeader>
							<TableRow>
								<TableHead>Order Type</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Time</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.length > 0 &&
								orders.map((result, index) => {
									return (
										<TableRow key={index}>
											<TableCell>
												{result.type.type ===
												"medication"
													? result.type.medication
															.name
													: result.type.type}
											</TableCell>
											<TableCell>
												{result.status}
											</TableCell>
											<TableCell>{result.time}</TableCell>
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
				</div>
			</CardContent>
			{/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
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
			</CardFooter> */}
		</Card>
	)
}

export default OrdersCard
