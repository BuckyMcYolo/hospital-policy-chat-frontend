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
					<ChatSection currentPatient={currentPatient} />
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
				<ChatSection currentPatient={currentPatient} />
			</section>
		</div>
	)
}
