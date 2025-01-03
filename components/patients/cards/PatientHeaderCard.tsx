import React from "react"
import {
	ArrowDown,
	ArrowUp,
	ChevronLeft,
	ChevronRight,
	CirclePlus,
	Copy,
	CornerDownLeft,
	CreditCard,
	Mic,
	MoreVertical,
	Paperclip,
	TrashIcon,
	Truck,
	CalendarDays,
} from "lucide-react"
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
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import moment from "moment"
import { Admission } from "../patientExamples"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"

const PatientHeaderCard = ({
	currentPatient,
}: {
	currentPatient: Admission
}) => {
	return (
		<Card className="w-full ">
			<CardHeader className="flex flex-row items-start justify-between">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-xl">
						<HoverCard>
							<HoverCardTrigger asChild>
								<Button variant="link" className="text-xl p-0">
									{currentPatient?.name}{" "}
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className="w-fit">
								<div className="flex justify-between space-x-4">
									<Avatar>
										<AvatarFallback>
											{currentPatient?.name[0]}
											{currentPatient.name.split(" ")[1]
												? currentPatient.name.split(
														" "
												  )[1][0]
												: ""}
										</AvatarFallback>
									</Avatar>
									<div className="space-y-1">
										<h4 className="text-sm font-semibold">
											{currentPatient?.name}
										</h4>
										<p className="text-sm">
											{currentPatient?.phone}
										</p>
										<div className="flex items-center pt-2">
											<CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
											<span className="text-xs text-muted-foreground">
												{moment(
													currentPatient.dateOfBirth
												).format("MM/DD/YYYY")}{" "}
												(
												{moment().diff(
													currentPatient.dateOfBirth,
													"years"
												)}{" "}
												yo)
											</span>
										</div>
									</div>
								</div>
								<Separator className="my-2" />
								<div className="grid grid-cols-1 gap-2">
									<h2 className="text-sm font-semibold">
										Emergency Contact
									</h2>
									<div className=" text-muted-foreground">
										<p className="text-sm capitalize">
											{
												currentPatient?.emergencyContact
													?.name
											}{" "}
											-{" "}
											{
												currentPatient?.emergencyContact
													?.relationship
											}
										</p>
										<p className="text-sm">
											{
												currentPatient?.emergencyContact
													?.phone
											}
										</p>
									</div>
								</div>
							</HoverCardContent>
						</HoverCard>
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Copy className="h-3 w-3" />
							<span className="sr-only">Copy Order ID</span>
						</Button>
					</CardTitle>

					<CardDescription>
						{moment(currentPatient?.dateOfBirth).format(
							"MM/DD/YYYY"
						)}{" "}
						<span className="text-sm">
							(
							{moment().diff(
								currentPatient?.dateOfBirth,
								"years"
							)}{" "}
							yo)
						</span>
					</CardDescription>
				</div>
				<div className="hidden sm:flex flex-col items-center">
					<p className="text-foreground/70 text-sm">
						Attending: {currentPatient.attendingDoctor}
					</p>
					<Badge variant="outline" className="capitalize">
						{currentPatient.admissionReason}
					</Badge>
				</div>
				<div className="flex items-center gap-1">
					<div className="flex flex-col items-center pr-2">
						<p>Floor {currentPatient?.floor}</p>
						<CardDescription>
							Room {currentPatient?.room}
						</CardDescription>
					</div>
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
							<DropdownMenuItem>Assign</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Discharge</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<Separator />
			<CardContent className="p-0 text-sm">
				<Tabs className="w-full py-2" defaultValue="demographics">
					<TabsList className="grid grid-cols-2 mx-2">
						<TabsTrigger value="demographics">
							Demographics
						</TabsTrigger>
						<TabsTrigger value="admissionProfile">
							Admission profile
						</TabsTrigger>
					</TabsList>
					<TabsContent value="demographics">
						<section className="px-6 py-2">
							<div className="font-semibold text-base pb-1">
								Personal Information
							</div>
							<ul className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-6">
								<div className="grid grid-cols-1 gap-1">
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Phone
										</span>
										<span>{currentPatient?.phone}</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											<span>Email</span>
										</span>
										<span>
											{currentPatient?.email?.primary}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Address
										</span>
										<span>{currentPatient?.address}</span>
									</li>
								</div>
								<div className="grid grid-cols-1 gap-1">
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Insurance
										</span>
										<span>
											{currentPatient?.insurance.provider}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground"></span>
										<span>
											#
											{
												currentPatient?.insurance
													.policyNumber
											}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Expires
										</span>
										<span>
											{moment(
												currentPatient.insurance
													.expirationDate
											).format("MM/DD/YYYY")}
										</span>
									</li>
								</div>
							</ul>
						</section>
						<Separator className="my-3" />
						<section className="px-6 py-2">
							<div className="font-semibold text-base pb-1">
								Social History
							</div>
							<ul className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-6">
								<div className="grid grid-cols-1 gap-1">
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Marital Status
										</span>
										<span className="capitalize">
											{
												currentPatient?.socialHistory
													.status
											}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Occupation
										</span>
										<span>
											{
												currentPatient?.socialHistory
													.occupation
											}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Living Situation
										</span>
										<span className="capitalize">
											{
												currentPatient?.socialHistory
													.livingSituation
											}
										</span>
									</li>
								</div>
								<div className="grid grid-cols-1 gap-1">
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Tobacco Use
										</span>
										<span className="capitalize">
											{
												currentPatient?.socialHistory
													.tobaccoUse
											}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Alcohol Use
										</span>
										<span className="capitalize">
											{
												currentPatient?.socialHistory
													.alcoholUse
											}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Illicit Drug Use
										</span>
										<span className="capitalize">
											{
												currentPatient?.socialHistory
													.drugUse
											}
										</span>
									</li>
								</div>
							</ul>
						</section>
					</TabsContent>
					<TabsContent value="admissionProfile">
						<section className="px-6 py-2">
							<div className="font-semibold text-base pb-1">
								Admission Profile
							</div>
							<ul className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-6">
								<div className="grid grid-cols-1 gap-2">
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Admisson Date
										</span>
										<span>
											{moment(
												currentPatient?.admissionDate
											).format("MM/DD/YYYY")}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											<span>Admission Reason</span>
										</span>
										<span>
											{currentPatient?.admissionReason}
											<Badge
												variant="outline"
												className={`ml-1 capitalize ${
													currentPatient?.admissionReasonPriority ===
													"high"
														? "text-red-500"
														: currentPatient?.admissionReasonPriority ===
														  "medium"
														? "text-yellow-500"
														: currentPatient?.admissionReasonPriority ===
														  "low"
														? "text-green-500"
														: "text-blue-500"
												}`}
											>
												{
													currentPatient?.admissionReasonPriority
												}
												{currentPatient?.admissionReasonPriority ===
												"high" ? (
													<ArrowUp className="h-3 w-3 ml-0.5" />
												) : currentPatient?.admissionReasonPriority ===
												  "low" ? (
													<ArrowDown className="h-3 w-3 ml-0.5" />
												) : null}
											</Badge>
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Admitting Physician
										</span>
										<span>
											{currentPatient?.admittingDoctor}
										</span>
									</li>
								</div>
								<div className="grid grid-cols-1 gap-2">
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Admission Location
										</span>
										<span>
											{currentPatient?.admissionLocation}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Attending Physician
										</span>
										<span>
											{currentPatient?.attendingDoctor}
										</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Expected Discharge
										</span>
										<span>
											{moment(
												currentPatient?.expectedDischarge
											).format("MM/DD/YYYY")}
										</span>
									</li>
								</div>
							</ul>
						</section>
						<Separator className="my-3" />
						<section className="px-6 py-2 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
							<ul className="grid grid-cols-1 gap-1 lg:gap-6">
								<div className="grid grid-cols-1 gap-2">
									<div className="font-semibold text-base pb-1">
										Past Medical History
									</div>
									{currentPatient?.medicalHistory.map(
										(history, index) => (
											<li
												key={index}
												className="flex items-center justify-between"
											>
												<span className="text-muted-foreground">
													{history.condition}
												</span>
												<span>
													{moment(
														history.dateStarted
													).format("MM/DD/YYYY")}
												</span>
											</li>
										)
									)}
								</div>
							</ul>
							<ul className="grid grid-cols-1 gap-1 lg:gap-6">
								<div className="grid grid-cols-1 gap-2">
									<div className="font-semibold text-base pb-1">
										Allergies
									</div>
									{currentPatient?.allergies.map(
										(allergy, index) => (
											<li
												key={index}
												className="flex items-center justify-between"
											>
												<span className="text-muted-foreground">
													{allergy.name}
												</span>
												<span className="capitalize">
													{allergy.reaction}
												</span>
												<span className="capitalize">
													<Badge
														variant="outline"
														className={`ml-1 capitalize ${
															allergy.severity ===
															"severe"
																? "text-red-500"
																: allergy.severity ===
																  "mild"
																? "text-yellow-500"
																: allergy.severity ===
																  "moderate"
																? "text-blue-500"
																: "text-green-500"
														}
														`}
													>
														{allergy.severity}
														{allergy.severity ===
														"severe" ? (
															<ArrowUp className="h-3 w-3 ml-0.5" />
														) : allergy.severity ===
														  "mild" ? (
															<ArrowDown className="h-3 w-3 ml-0.5" />
														) : null}
													</Badge>
												</span>
											</li>
										)
									)}
								</div>
							</ul>
						</section>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
}

export default PatientHeaderCard
