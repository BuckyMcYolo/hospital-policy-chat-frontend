import React from "react"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "../ui/sheet"
import { Button } from "../ui/button"

const PatientInfoSheet = ({
	isSheetOpen,
	setIsSheetOpen
}: {
	isSheetOpen: boolean
	setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	return (
		<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
			<SheetContent className="h-full">
				<SheetHeader>
					<SheetTitle>Patient Information</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<h3 className="font-medium">Demographics</h3>
						<p className="text-sm">John Doe, 45 years old</p>
						<p className="text-sm">DOB: 1979-03-15</p>
					</div>
					<div className="space-y-2">
						<h3 className="font-medium">Current Status</h3>
						<p className="text-sm">Room: 204</p>
						<p className="text-sm">Status: Stable</p>
						<p className="text-sm">Chief Complaint: Chest Pain</p>
					</div>
					<div className="space-y-2">
						<h3 className="font-medium">Recent Vitals</h3>
						<p className="text-sm">BP: 120/80</p>
						<p className="text-sm">HR: 72</p>
						<p className="text-sm">Temp: 98.6°F</p>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default PatientInfoSheet
