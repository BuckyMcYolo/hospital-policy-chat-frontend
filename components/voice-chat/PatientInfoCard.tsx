import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Patient, VitalSign, VitalStatus } from "../unit-voice/patientTypes"
import moment from "moment"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
import { Sheet, SheetContent } from "../ui/sheet"

const Section = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="space-y-3">
    <h3 className="font-medium text-lg">{title}</h3>
    {children}
    <Separator className="mt-4" />
  </div>
)

const InfoRow = ({
  label,
  value
}: {
  label: string
  value?: string | number | null
}) =>
  value ? (
    <div className="flex items-center gap-2">
      <Label className="min-w-[120px] text-muted-foreground">{label}:</Label>
      <span className="text-sm">{value}</span>
    </div>
  ) : null

const PatientInfoCard = ({
  setSelectedPatient,
  selectedPatient,
  isSheetPresent
}: {
  selectedPatient: Patient | null
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>
  isSheetPresent?: boolean
}) => {
  const calculateAge = (birthDate: Date) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return age
  }

  const getStatusColor = (status?: VitalStatus) => {
    switch (status) {
      case "Stable":
        return "bg-green-500"
      case "Critical":
        return "bg-red-500"
      case "Improving":
        return "bg-blue-500"
      case "Deteriorating":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const VitalsSection = ({ vitalSigns }: { vitalSigns: VitalSign[] }) => {
    const [showAll, setShowAll] = useState(false)
    const INITIAL_DISPLAY_COUNT = 3

    const displayedVitals = showAll
      ? vitalSigns
      : vitalSigns
          .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
          .slice(0, INITIAL_DISPLAY_COUNT)

    const hasMoreVitals = vitalSigns.length > INITIAL_DISPLAY_COUNT

    return (
      <Section title="Vital Signs History">
        <div className="space-y-4">
          {displayedVitals
            .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
            .map((vital, index) => (
              <div key={index} className="bg-muted p-3 rounded-md">
                <p className="text-sm text-muted-foreground mb-2">
                  {moment(vital.timestamp).format("MMM DD, HH:mm")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Badge variant="secondary">BP: {vital.BP}</Badge>
                  <Badge variant="secondary">HR: {vital.HR}</Badge>
                  <Badge variant="secondary">RR: {vital.RR}</Badge>
                  <Badge variant="secondary">O2: {vital.O2Sat}%</Badge>
                  <Badge variant="secondary">Temp: {vital.temp}°F</Badge>
                </div>
              </div>
            ))}
        </div>
        {hasMoreVitals && (
          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={() => setShowAll(!showAll)}
            endIcon={
              showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            }
          >
            {showAll
              ? "Show Less"
              : `Show ${vitalSigns.length - INITIAL_DISPLAY_COUNT} More`}
          </Button>
        )}
      </Section>
    )
  }

  if (!selectedPatient) return null

  return (
    <Card className="h-full border-0 ">
      {!isSheetPresent && (
        <Button
          className="absolute top-4 right-4"
          onClick={() => setSelectedPatient(null)}
          variant="ghost"
          size="icon"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <CardHeader>
        <div className="flex flex-col items-start gap-1">
          <CardTitle>
            {`${selectedPatient.firstName} ${selectedPatient.lastName}`}{" "}
            <span className="text-sm text-muted-foreground">
              ({moment(selectedPatient.dateOfBirth).format("MM-DD-YYYY")})
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={getStatusColor(selectedPatient.vitalStatus)}
            >
              {selectedPatient.vitalStatus || "Status Unknown"}
            </Badge>
            <Badge variant="outline">{selectedPatient.codeStatus}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <Section title="Demographics">
          <InfoRow
            label="Full Name"
            value={`${selectedPatient.firstName} ${selectedPatient.lastName}`}
          />
          <InfoRow
            label="Age"
            value={`${calculateAge(selectedPatient.dateOfBirth)} years`}
          />
          <InfoRow
            label="DOB"
            value={moment(selectedPatient.dateOfBirth).format("MMM DD, YYYY")}
          />
          <InfoRow label="Gender" value={selectedPatient.gender} />
          <InfoRow label="Blood Type" value={selectedPatient.bloodType} />
        </Section>

        <Section title="Admission Info">
          <InfoRow label="Room" value={selectedPatient.roomNumber} />
          <InfoRow label="Unit" value={selectedPatient.unitType} />
          <InfoRow
            label="Admitted"
            value={moment(selectedPatient.admissionDate).format("MMM DD, YYYY")}
          />
          <InfoRow
            label="Chief Complaint"
            value={selectedPatient.chiefComplaint}
          />
          {selectedPatient.O2Therapy && (
            <InfoRow label="O2 Therapy" value={selectedPatient.O2Therapy} />
          )}
        </Section>

        {selectedPatient.vitalSigns &&
          selectedPatient.vitalSigns.length > 0 && (
            <VitalsSection vitalSigns={selectedPatient.vitalSigns} />
          )}

        {selectedPatient.diagnosis && selectedPatient.diagnosis.length > 0 && (
          <Section title="Diagnoses">
            {selectedPatient.diagnosis.map((dx, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline">{dx.ICD10Code}</Badge>
                <span className="text-sm">{dx.description}</span>
              </div>
            ))}
          </Section>
        )}

        {selectedPatient.medications &&
          selectedPatient.medications.length > 0 && (
            <Section title="Medications">
              {selectedPatient.medications.map((med, index) => (
                <div key={index} className="bg-muted p-3 rounded-md mb-2">
                  <h4 className="font-medium text-sm">{med.name}</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Badge variant="secondary">Dosage: {med.dosage}</Badge>
                    <Badge variant="secondary">Route: {med.route}</Badge>
                    <Badge variant="secondary">Freq: {med.frequency}</Badge>
                  </div>
                </div>
              ))}
            </Section>
          )}

        {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
          <Section title="Allergies">
            {selectedPatient.allergies.map((allergy, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    allergy.severity === "Severe"
                      ? "bg-red-100 dark:bg-red-500"
                      : allergy.severity === "Moderate"
                      ? "bg-yellow-100 dark:bg-yellow-500"
                      : "bg-green-100 dark:bg-green-500"
                  }
                >
                  {allergy.severity}
                </Badge>
                <span className="text-sm">
                  {allergy.allergen} - {allergy.reaction}
                </span>
              </div>
            ))}
          </Section>
        )}

        {selectedPatient.ventSettings && (
          <Section title="Ventilator Settings">
            <div className="grid grid-cols-2 gap-2">
              <Badge variant="secondary">
                O2: {selectedPatient.ventSettings.O2Percentage}%
              </Badge>
              <Badge variant="secondary">
                PEEP: {selectedPatient.ventSettings.PEEP}
              </Badge>
              <Badge variant="secondary">
                TV: {selectedPatient.ventSettings.TV}
              </Badge>
              <Badge variant="secondary">
                RR: {selectedPatient.ventSettings.RR}
              </Badge>
            </div>
          </Section>
        )}

        {selectedPatient.lines && selectedPatient.lines.length > 0 && (
          <Section title="Lines">
            {selectedPatient.lines.map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline">{line.type}</Badge>
                <span className="text-sm">{line.location}</span>
              </div>
            ))}
          </Section>
        )}

        {selectedPatient.labs && selectedPatient.labs.length > 0 && (
          <Section title="Recent Labs">
            {selectedPatient.labs.map((lab, index) => (
              <div key={index} className="bg-muted p-3 rounded-md mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{lab.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {moment(lab.timestamp).format("MMM DD HH:mm")}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">Value: {lab.value}</Badge>
                  <span className="text-xs text-muted-foreground">
                    Range: {lab.referenceRange}
                  </span>
                </div>
              </div>
            ))}
          </Section>
        )}

        {selectedPatient.providers && selectedPatient.providers.length > 0 && (
          <Section title="Care Team">
            {selectedPatient.providers.map((provider, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline">{provider.role}</Badge>
                <span className="text-sm">{provider.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({provider.phone})
                </span>
              </div>
            ))}
          </Section>
        )}

        {selectedPatient.contactInfo &&
          selectedPatient.contactInfo.length > 0 && (
            <Section title="Emergency Contacts">
              {selectedPatient.contactInfo.map((contact, index) => (
                <div key={index} className="bg-muted p-3 rounded-md mb-2">
                  <h4 className="font-medium text-sm">{contact.name}</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Badge variant="secondary">
                      Relation: {contact.relation}
                    </Badge>
                    <Badge variant="secondary">Phone: {contact.phone}</Badge>
                    {contact.email && (
                      <Badge variant="secondary">Email: {contact.email}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </Section>
          )}

        {selectedPatient.inputs &&
          selectedPatient.outputs &&
          (selectedPatient?.inputs?.length > 0 ||
            selectedPatient?.outputs?.length > 0) && (
            <Section title="I/O Balance">
              {selectedPatient.netFluidBalance !== undefined && (
                <Badge
                  variant="outline"
                  className={
                    selectedPatient.netFluidBalance >= 0
                      ? "bg-green-100 dark:bg-green-500"
                      : "bg-red-100 dark:bg-red-500"
                  }
                >
                  Net Balance: {selectedPatient.netFluidBalance} mL
                </Badge>
              )}
              {selectedPatient.inputs?.map((input, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary">Input</Badge>
                  <span className="text-sm">
                    {input.input}mL via {input.route}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {moment(input.timestamp).format("HH:mm")}
                  </span>
                </div>
              ))}
              {selectedPatient.outputs?.map((output, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary">Output</Badge>
                  <span className="text-sm">
                    {output.output}mL via {output.route}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {moment(output.timestamp).format("HH:mm")}
                  </span>
                </div>
              ))}
            </Section>
          )}
      </CardContent>
    </Card>
  )
}

export const PatientInfoSheet = ({
  selectedPatient,
  setSelectedPatient
}: {
  selectedPatient: Patient | null
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (width < 1024) {
    return (
      <Sheet
        open={!!selectedPatient}
        onOpenChange={(isOpen) => !isOpen && setSelectedPatient(null)}
      >
        <SheetContent className="w-full sm:w-96">
          <PatientInfoCard
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            isSheetPresent={true}
          />
        </SheetContent>
      </Sheet>
    )
  } else {
    return (
      <PatientInfoCard
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />
    )
  }
}
