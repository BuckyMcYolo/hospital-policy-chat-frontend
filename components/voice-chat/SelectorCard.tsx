import React from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "../ui/card"
import { Button } from "../ui/button"
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue
} from "../ui/select"

const SelectorCard = ({
	setRole
}: {
	setRole: React.Dispatch<React.SetStateAction<string | null>>
}) => {
	const [tempRole, setTempRole] = React.useState<string | null>(null)
	return (
		<div className="w-full h-full flex justify-center items-center">
			<Card className="w-[450px]">
				<CardHeader>
					<CardTitle>Select the role you want to use.</CardTitle>
					<CardDescription>
						This will determine what patients you have access to and
						how much detail the AI will provide for each patient.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Select onValueChange={(e) => setTempRole(e)}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Please Choose Role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="chargeNurse">
								Charge Nurse
							</SelectItem>
							<SelectItem value="unitNurse">ICU Nurse</SelectItem>
							<SelectItem value="physician">Physician</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						disabled={!tempRole}
						onClick={() => setRole(tempRole)}
					>
						Choose Role
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default SelectorCard
