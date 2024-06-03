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
import { curentAdmissions } from "@/components/patients/patientExamples"
import moment from "moment"
import PatientHeaderCard from "@/components/patients/cards/PatientHeaderCard"
import ChatSection from "@/components/patients/chat/ChatSection"
import MedicationCard from "@/components/patients/cards/MedicationCard"
import LabCard from "@/components/patients/cards/LabCard"
import OrdersCard from "@/components/patients/cards/OrdersCard"
import ProceduresAndImagingCard from "@/components/patients/cards/ProceduresAndImaging"

const newCard = (
	<Card className="w-full">
		<CardHeader className="flex flex-row items-start bg-muted/50">
			<div className="grid gap-0.5">
				<CardTitle className="group flex items-center gap-2 text-lg">
					Order Oe31b70H
					<Button
						size="icon"
						variant="outline"
						className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<Copy className="h-3 w-3" />
						<span className="sr-only">Copy Order ID</span>
					</Button>
				</CardTitle>
				<CardDescription>Date: November 23, 2023</CardDescription>
			</div>
			<div className="ml-auto flex items-center gap-1">
				<Button size="sm" variant="outline" className="h-8 gap-1">
					<Truck className="h-3.5 w-3.5" />
					<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
						Track Order
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
				<div className="font-semibold">Order Details</div>
				<ul className="grid gap-3">
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">
							Glimmer Lamps x <span>2</span>
						</span>
						<span>$250.00</span>
					</li>
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">
							Aqua Filters x <span>1</span>
						</span>
						<span>$49.00</span>
					</li>
				</ul>
				<Separator className="my-2" />
				<ul className="grid gap-3">
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Subtotal</span>
						<span>$299.00</span>
					</li>
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Shipping</span>
						<span>$5.00</span>
					</li>
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Tax</span>
						<span>$25.00</span>
					</li>
					<li className="flex items-center justify-between font-semibold">
						<span className="text-muted-foreground">Total</span>
						<span>$329.00</span>
					</li>
				</ul>
			</div>
			<Separator className="my-4" />
			<div className="grid grid-cols-2 gap-4">
				<div className="grid gap-3">
					<div className="font-semibold">Shipping Information</div>
					<address className="grid gap-0.5 not-italic text-muted-foreground">
						<span>Liam Johnson</span>
						<span>1234 Main St.</span>
						<span>Anytown, CA 12345</span>
					</address>
				</div>
				<div className="grid auto-rows-max gap-3">
					<div className="font-semibold">Billing Information</div>
					<div className="text-muted-foreground">
						Same as shipping address
					</div>
				</div>
			</div>
			<Separator className="my-4" />
			<div className="grid gap-3">
				<div className="font-semibold">Customer Information</div>
				<dl className="grid gap-3">
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Customer</dt>
						<dd>Liam Johnson</dd>
					</div>
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Email</dt>
						<dd>
							<a href="mailto:">liam@acme.com</a>
						</dd>
					</div>
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Phone</dt>
						<dd>
							<a href="tel:">+1 234 567 890</a>
						</dd>
					</div>
				</dl>
			</div>
			<Separator className="my-4" />
			<div className="grid gap-3">
				<div className="font-semibold">Payment Information</div>
				<dl className="grid gap-3">
					<div className="flex items-center justify-between">
						<dt className="flex items-center gap-1 text-muted-foreground">
							<CreditCard className="h-4 w-4" />
							Visa
						</dt>
						<dd>**** **** **** 4532</dd>
					</div>
				</dl>
			</div>
		</CardContent>
		<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
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
		</CardFooter>
	</Card>
)

export default function Page({ params }: { params: { slug: string } }) {
	const currentPatient = curentAdmissions.find(
		(admission) => admission.name === params.slug.replace("%20", " ")
	)

	if (!currentPatient) {
		return <div>Patient not found</div>
	}

	return (
		<div className="flex flex-col sm:flex-row h-full w-full items-center gap-4 p-4">
			<Tabs className="sm:hidden w-full h-full" defaultValue="chart">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="chart">Chart</TabsTrigger>
					<TabsTrigger value="chat">Chat</TabsTrigger>
				</TabsList>
				<TabsContent value="chart">
					<ScrollArea className="h-full w-full sm:w-3/5 lg:w-2/3 flex flex-col">
						<div className="grid grid-cols-1 gap-4 sm:pr-5 pb-4">
							<PatientHeaderCard
								currentPatient={currentPatient}
							/>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:pr-5">
							<MedicationCard currentPatient={currentPatient} />
							<LabCard currentPatient={currentPatient} />
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:pr-5 pt-4">
							<OrdersCard currentPatient={currentPatient} />
							<ProceduresAndImagingCard
								currentPatient={currentPatient}
							/>
						</div>
					</ScrollArea>
				</TabsContent>
				<TabsContent value="chat" className="h-[95%]">
					<ChatSection />
				</TabsContent>
			</Tabs>
			<ScrollArea className="hidden h-full w-full sm:w-3/5 lg:w-2/3 sm:flex flex-col">
				<div className="grid grid-cols-1 gap-4 pr-5 pb-4">
					<PatientHeaderCard currentPatient={currentPatient} />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-5">
					<MedicationCard currentPatient={currentPatient} />
					<LabCard currentPatient={currentPatient} />
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-5 pt-4">
					<OrdersCard currentPatient={currentPatient} />
					<ProceduresAndImagingCard currentPatient={currentPatient} />
				</div>
			</ScrollArea>

			{/* chat section */}
			<section className="hidden sm:flex flex-col h-full w-full sm:w-2/5 lg:w-1/3 ">
				<ChatSection />
			</section>
		</div>
	)
}
