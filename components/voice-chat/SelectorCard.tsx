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
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from "../ui/select"
import CustomSelectItem from "../ui/custom-select-item"

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
            This will determine what patients you have access to and how much
            detail the AI will provide for each patient.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(e) => setTempRole(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Please Choose Role" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <CustomSelectItem
                value="unitNurse"
                tooltip={
                  <div className="p-2 w-64">
                    <p className="font-semibold mb-2">ICU Nurse</p>
                    <p className="mb-3 text-xs">
                      The ICU Nurse has access to just 2 of the ICU patients and
                      can view and ask questions about every detail of each
                      patient.
                    </p>
                  </div>
                }
              >
                ICU Nurse
              </CustomSelectItem>
              <CustomSelectItem
                value="chargeNurse"
                tooltip={
                  <div className="p-2 w-64">
                    <p className="font-semibold mb-2">Charge Nurse (ICU)</p>
                    <p className="mb-3 text-xs">
                      The Charge nurse has access to all the ICU patients and
                      can view and ask questions about most important details
                      about each patient (e.g. recent vitals, medications, etc)
                      but not as much as the ICU Nurse.
                    </p>
                  </div>
                }
              >
                Charge Nurse (ICU)
              </CustomSelectItem>

              <CustomSelectItem
                value="physician"
                tooltip={
                  <div className="p-2 w-64">
                    <p className="font-semibold mb-2">Physician</p>
                    <p className="mb-3 text-xs">
                      The Physician has access to all the patients (Floor and
                      ICU) and can view and ask questions about more basic
                      details about each patient but not as much as the Charge
                      Nurse or ICU Nurse.
                    </p>
                  </div>
                }
              >
                Physician
              </CustomSelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={!tempRole} onClick={() => setRole(tempRole)}>
            Choose Role
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SelectorCard
