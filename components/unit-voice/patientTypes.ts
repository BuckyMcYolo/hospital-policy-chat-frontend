import moment from "moment"

enum Gender {
	Male = "Male",
	Female = "Female",
	Other = "Other"
}

enum BloodType {
	A_POS = "A+",
	A_NEG = "A-",
	B_POS = "B+",
	B_NEG = "B-",
	AB_POS = "AB+",
	AB_NEG = "AB-",
	O_POS = "O+",
	O_NEG = "O-"
}

enum UnitType {
	ICU = "ICU",
	FloorUnit = "Floor Unit"
}

enum VitalStatus {
	Stable = "Stable",
	Critical = "Critical",
	Improving = "Improving",
	Deteriorating = "Deteriorating"
}

interface ContactInfo {
	name: string
	relation: string
	phone: string
	email?: string
}

interface Medication {
	name: string
	dosage: string
	frequency: string
	route: string // e.g., oral, IV, etc.
}

interface Allergy {
	allergen: string
	reaction: string
	severity: "Mild" | "Moderate" | "Severe"
}

interface VitalSign {
	HR: number
	BP: string
	RR: number
	O2Sat: number
	temp: number
	timestamp: Date
}

interface Order {
	description: string
	repeatable: boolean
	frequency?: string // e.g., 'daily', 'every 4 hours'
	lastCompleted?: Date
}

interface VentSettings {
	O2Percentage: number
	PEEP: number
	TV: number
	RR: number
}

interface Line {
	type: string // e.g., IV, central line
	location: string
}

interface Lab {
	name: string
	value: number | string
	referenceRange: string
	timestamp: Date
}

interface Diagnosis {
	description: string
	ICD10Code: string
}

interface Provider {
	name: string
	role: "Attending Physician" | "Nurse"
	phone: string
}

interface Input {
	input: number // in mL
	route: "oral" | "IV" | "NG" | "other"
	timestamp: Date
}

interface Output {
	output: number // in mL
	route: "urine" | "stool" | "vomit" | "blood" | "other"
	timestamp: Date
}

interface Patient {
	id: string
	firstName: string
	lastName: string
	gender: Gender
	dateOfBirth: Date
	bloodType?: BloodType
	admissionDate: Date
	chiefComplaint: string
	unitType: UnitType
	roomNumber: string
	diagnosis?: Diagnosis[]
	medications?: Medication[]
	allergies?: Allergy[]
	contactInfo?: ContactInfo[]
	vitalSigns?: VitalSign[]
	orders?: Order[]
	O2Therapy?: string // e.g., 'Intubated'
	ventSettings?: VentSettings
	lines?: Line[]
	labs?: Lab[]
	providers?: Provider[]
	inputs?: Input[]
	outputs?: Output[]
	netFluidBalance?: number
	vitalStatus?: VitalStatus
}

// Example patient data
const patients: Patient[] = [
	{
		id: "P001",
		firstName: "John",
		lastName: "Doe",
		gender: Gender.Male,
		dateOfBirth: moment("1985-02-15").toDate(),
		bloodType: BloodType.O_POS,
		admissionDate: moment("2024-06-01").toDate(),
		chiefComplaint: "Severe respiratory distress",
		unitType: UnitType.ICU,
		roomNumber: "ICU-101",
		diagnosis: [
			{ description: "Pneumonia", ICD10Code: "J18.9" },
			{ description: "Sepsis", ICD10Code: "A41.9" }
		],
		medications: [
			{
				name: "Amoxicillin",
				dosage: "500mg",
				frequency: "8 hours",
				route: "Oral"
			},
			{
				name: "Ibuprofen",
				dosage: "200mg",
				frequency: "6 hours",
				route: "Oral"
			}
		],
		allergies: [
			{
				allergen: "Penicillin",
				reaction: "Rash",
				severity: "Moderate"
			}
		],
		contactInfo: [
			{
				name: "Jane Doe",
				relation: "Spouse",
				phone: "123-456-7890",
				email: "jane.doe@example.com"
			}
		],
		vitalSigns: [
			{
				HR: 75,
				BP: "120/80",
				RR: 16,
				O2Sat: 98,
				temp: 37.5,
				timestamp: moment("2024-06-01T06:00:00Z").toDate()
			},
			{
				HR: 76,
				BP: "121/81",
				RR: 16,
				O2Sat: 98,
				temp: 37.5,
				timestamp: moment("2024-06-01T06:15:00Z").toDate()
			},
			{
				HR: 77,
				BP: "122/82",
				RR: 16,
				O2Sat: 98,
				temp: 37.6,
				timestamp: moment("2024-06-01T06:30:00Z").toDate()
			},
			{
				HR: 78,
				BP: "123/83",
				RR: 16,
				O2Sat: 98,
				temp: 37.6,
				timestamp: moment("2024-06-01T06:45:00Z").toDate()
			},
			{
				HR: 79,
				BP: "124/84",
				RR: 16,
				O2Sat: 98,
				temp: 37.6,
				timestamp: moment("2024-06-01T07:00:00Z").toDate()
			},
			{
				HR: 80,
				BP: "125/85",
				RR: 16,
				O2Sat: 98,
				temp: 37.6,
				timestamp: moment("2024-06-01T07:15:00Z").toDate()
			},
			{
				HR: 81,
				BP: "126/86",
				RR: 16,
				O2Sat: 98,
				temp: 37.7,
				timestamp: moment("2024-06-01T07:30:00Z").toDate()
			},
			{
				HR: 82,
				BP: "127/87",
				RR: 16,
				O2Sat: 98,
				temp: 37.7,
				timestamp: moment("2024-06-01T07:45:00Z").toDate()
			},
			{
				HR: 83,
				BP: "128/88",
				RR: 16,
				O2Sat: 98,
				temp: 37.7,
				timestamp: moment("2024-06-01T08:00:00Z").toDate()
			},
			{
				HR: 84,
				BP: "129/89",
				RR: 16,
				O2Sat: 98,
				temp: 37.7,
				timestamp: moment("2024-06-01T08:15:00Z").toDate()
			},
			{
				HR: 85,
				BP: "130/90",
				RR: 16,
				O2Sat: 98,
				temp: 37.8,
				timestamp: moment("2024-06-01T08:30:00Z").toDate()
			},
			{
				HR: 86,
				BP: "131/91",
				RR: 16,
				O2Sat: 98,
				temp: 37.8,
				timestamp: moment("2024-06-01T08:45:00Z").toDate()
			},
			{
				HR: 87,
				BP: "132/92",
				RR: 16,
				O2Sat: 98,
				temp: 37.8,
				timestamp: moment("2024-06-01T09:00:00Z").toDate()
			},
			{
				HR: 88,
				BP: "133/93",
				RR: 16,
				O2Sat: 98,
				temp: 37.8,
				timestamp: moment("2024-06-01T09:15:00Z").toDate()
			},
			{
				HR: 89,
				BP: "134/94",
				RR: 16,
				O2Sat: 98,
				temp: 37.9,
				timestamp: moment("2024-06-01T09:30:00Z").toDate()
			},
			{
				HR: 90,
				BP: "135/95",
				RR: 16,
				O2Sat: 98,
				temp: 37.9,
				timestamp: moment("2024-06-01T09:45:00Z").toDate()
			},
			{
				HR: 91,
				BP: "136/96",
				RR: 16,
				O2Sat: 98,
				temp: 37.9,
				timestamp: moment("2024-06-01T10:00:00Z").toDate()
			},
			{
				HR: 92,
				BP: "137/97",
				RR: 16,
				O2Sat: 98,
				temp: 37.9,
				timestamp: moment("2024-06-01T10:15:00Z").toDate()
			},
			{
				HR: 93,
				BP: "138/98",
				RR: 16,
				O2Sat: 98,
				temp: 38.0,
				timestamp: moment("2024-06-01T10:30:00Z").toDate()
			},
			{
				HR: 94,
				BP: "139/99",
				RR: 16,
				O2Sat: 98,
				temp: 38.0,
				timestamp: moment("2024-06-01T10:45:00Z").toDate()
			},
			{
				HR: 95,
				BP: "140/100",
				RR: 16,
				O2Sat: 98,
				temp: 38.0,
				timestamp: moment("2024-06-01T11:00:00Z").toDate()
			}
		],
		orders: [
			{
				description: "Morning meds",
				repeatable: true,
				frequency: "daily",
				lastCompleted: moment("2024-06-01T08:00:00Z").toDate()
			},
			{
				description: "Chest X-ray",
				repeatable: true,
				frequency: "daily",
				lastCompleted: moment("2024-06-01T07:00:00Z").toDate()
			},
			{
				description: "ABG",
				repeatable: true,
				frequency: "every 8 hours",
				lastCompleted: moment("2024-06-01T06:00:00Z").toDate()
			}
		],
		O2Therapy: "Intubated",
		ventSettings: {
			O2Percentage: 40,
			PEEP: 5,
			TV: 500,
			RR: 16
		},
		lines: [
			{ type: "IV", location: "Right arm" },
			{ type: "Central line", location: "Right subclavian" }
		],
		labs: [
			{
				name: "WBC",
				value: 11.0,
				referenceRange: "4.0-11.0 x10^3/uL",
				timestamp: moment("2024-06-01T06:00:00Z").toDate()
			},
			{
				name: "Hemoglobin",
				value: 13.5,
				referenceRange: "13.5-17.5 g/dL",
				timestamp: moment("2024-06-01T06:00:00Z").toDate()
			},
			{
				name: "Platelets",
				value: 250,
				referenceRange: "150-450 x10^3/uL",
				timestamp: moment("2024-06-01T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Smith",
				role: "Attending Physician",
				phone: "987-654-3210"
			},
			{ name: "Nurse Johnson", role: "Nurse", phone: "123-555-7890" }
		],
		inputs: [
			{
				input: 1000,
				route: "IV",
				timestamp: moment("2024-06-01T06:00:00Z").toDate()
			},
			{
				input: 500,
				route: "oral",
				timestamp: moment("2024-06-01T12:00:00Z").toDate()
			}
		],
		outputs: [
			{
				output: 800,
				route: "urine",
				timestamp: moment("2024-06-01T06:00:00Z").toDate()
			},
			{
				output: 400,
				route: "urine",
				timestamp: moment("2024-06-01T12:00:00Z").toDate()
			}
		],
		netFluidBalance: 300,
		vitalStatus: VitalStatus.Stable
	},
	{
		id: "P002",
		firstName: "Jane",
		lastName: "Smith",
		gender: Gender.Female,
		dateOfBirth: moment("1990-07-22").toDate(),
		bloodType: BloodType.A_POS,
		admissionDate: moment("2024-06-02").toDate(),
		chiefComplaint: "Abdominal pain",
		unitType: UnitType.FloorUnit,
		roomNumber: "201",
		diagnosis: [{ description: "Appendicitis", ICD10Code: "K35.80" }],
		medications: [
			{
				name: "Morphine",
				dosage: "10mg",
				frequency: "4 hours",
				route: "IV"
			}
		],
		allergies: [
			{
				allergen: "Aspirin",
				reaction: "Hives",
				severity: "Severe"
			}
		],
		contactInfo: [
			{
				name: "John Smith",
				relation: "Brother",
				phone: "321-654-0987",
				email: "john.smith@example.com"
			}
		],
		vitalSigns: [
			{
				HR: 85,
				BP: "130/85",
				RR: 18,
				O2Sat: 99,
				temp: 37.2,
				timestamp: moment("2024-06-02T06:00:00Z").toDate()
			},
			{
				HR: 86,
				BP: "131/86",
				RR: 18,
				O2Sat: 99,
				temp: 37.3,
				timestamp: moment("2024-06-02T06:15:00Z").toDate()
			},
			{
				HR: 87,
				BP: "132/87",
				RR: 18,
				O2Sat: 99,
				temp: 37.3,
				timestamp: moment("2024-06-02T06:30:00Z").toDate()
			},
			{
				HR: 88,
				BP: "133/88",
				RR: 18,
				O2Sat: 99,
				temp: 37.3,
				timestamp: moment("2024-06-02T06:45:00Z").toDate()
			},
			{
				HR: 89,
				BP: "134/89",
				RR: 18,
				O2Sat: 99,
				temp: 37.3,
				timestamp: moment("2024-06-02T07:00:00Z").toDate()
			},
			{
				HR: 90,
				BP: "135/90",
				RR: 18,
				O2Sat: 99,
				temp: 37.3,
				timestamp: moment("2024-06-02T07:15:00Z").toDate()
			},
			{
				HR: 91,
				BP: "136/91",
				RR: 18,
				O2Sat: 99,
				temp: 37.4,
				timestamp: moment("2024-06-02T07:30:00Z").toDate()
			},
			{
				HR: 92,
				BP: "137/92",
				RR: 18,
				O2Sat: 99,
				temp: 37.4,
				timestamp: moment("2024-06-02T07:45:00Z").toDate()
			},
			{
				HR: 93,
				BP: "138/93",
				RR: 18,
				O2Sat: 99,
				temp: 37.4,
				timestamp: moment("2024-06-02T08:00:00Z").toDate()
			},
			{
				HR: 94,
				BP: "139/94",
				RR: 18,
				O2Sat: 99,
				temp: 37.4,
				timestamp: moment("2024-06-02T08:15:00Z").toDate()
			},
			{
				HR: 95,
				BP: "140/95",
				RR: 18,
				O2Sat: 99,
				temp: 37.5,
				timestamp: moment("2024-06-02T08:30:00Z").toDate()
			},
			{
				HR: 96,
				BP: "141/96",
				RR: 18,
				O2Sat: 99,
				temp: 37.5,
				timestamp: moment("2024-06-02T08:45:00Z").toDate()
			},
			{
				HR: 97,
				BP: "142/97",
				RR: 18,
				O2Sat: 99,
				temp: 37.5,
				timestamp: moment("2024-06-02T09:00:00Z").toDate()
			},
			{
				HR: 98,
				BP: "143/98",
				RR: 18,
				O2Sat: 99,
				temp: 37.5,
				timestamp: moment("2024-06-02T09:15:00Z").toDate()
			},
			{
				HR: 99,
				BP: "144/99",
				RR: 18,
				O2Sat: 99,
				temp: 37.6,
				timestamp: moment("2024-06-02T09:30:00Z").toDate()
			},
			{
				HR: 100,
				BP: "145/100",
				RR: 18,
				O2Sat: 99,
				temp: 37.6,
				timestamp: moment("2024-06-02T09:45:00Z").toDate()
			},
			{
				HR: 101,
				BP: "146/101",
				RR: 18,
				O2Sat: 99,
				temp: 37.6,
				timestamp: moment("2024-06-02T10:00:00Z").toDate()
			},
			{
				HR: 102,
				BP: "147/102",
				RR: 18,
				O2Sat: 99,
				temp: 37.6,
				timestamp: moment("2024-06-02T10:15:00Z").toDate()
			},
			{
				HR: 103,
				BP: "148/103",
				RR: 18,
				O2Sat: 99,
				temp: 37.7,
				timestamp: moment("2024-06-02T10:30:00Z").toDate()
			},
			{
				HR: 104,
				BP: "149/104",
				RR: 18,
				O2Sat: 99,
				temp: 37.7,
				timestamp: moment("2024-06-02T10:45:00Z").toDate()
			},
			{
				HR: 105,
				BP: "150/105",
				RR: 18,
				O2Sat: 99,
				temp: 37.7,
				timestamp: moment("2024-06-02T11:00:00Z").toDate()
			}
		],
		orders: [
			{
				description: "Blood test",
				repeatable: false,
				lastCompleted: moment("2024-06-02T08:00:00Z").toDate()
			},
			{
				description: "Ultrasound",
				repeatable: false,
				lastCompleted: moment("2024-06-02T09:00:00Z").toDate()
			}
		],
		lines: [{ type: "IV", location: "Left arm" }],
		labs: [
			{
				name: "CRP",
				value: 50,
				referenceRange: "<10 mg/L",
				timestamp: moment("2024-06-02T06:00:00Z").toDate()
			},
			{
				name: "WBC",
				value: 12.0,
				referenceRange: "4.0-11.0 x10^3/uL",
				timestamp: moment("2024-06-02T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Brown",
				role: "Attending Physician",
				phone: "987-555-4321"
			},
			{ name: "Nurse Adams", role: "Nurse", phone: "123-555-6789" }
		],
		inputs: [
			{
				input: 750,
				route: "IV",
				timestamp: moment("2024-06-02T06:00:00Z").toDate()
			},
			{
				input: 500,
				route: "oral",
				timestamp: moment("2024-06-02T12:00:00Z").toDate()
			}
		],
		outputs: [
			{
				output: 600,
				route: "urine",
				timestamp: moment("2024-06-02T06:00:00Z").toDate()
			},
			{
				output: 300,
				route: "urine",
				timestamp: moment("2024-06-02T12:00:00Z").toDate()
			}
		],
		netFluidBalance: 350,
		vitalStatus: VitalStatus.Improving
	},
	{
		id: "P003",
		firstName: "Michael",
		lastName: "Johnson",
		gender: Gender.Male,
		dateOfBirth: moment("1975-03-18").toDate(),
		bloodType: BloodType.B_NEG,
		admissionDate: moment("2024-06-03").toDate(),
		chiefComplaint: "Chest pain",
		unitType: UnitType.ICU,
		roomNumber: "ICU-102",
		diagnosis: [
			{ description: "Myocardial infarction", ICD10Code: "I21.9" }
		],
		medications: [
			{
				name: "Aspirin",
				dosage: "81mg",
				frequency: "daily",
				route: "Oral"
			},
			{
				name: "Nitroglycerin",
				dosage: "0.4mg",
				frequency: "PRN",
				route: "Sublingual"
			}
		],
		allergies: [],
		contactInfo: [
			{
				name: "Sarah Johnson",
				relation: "Wife",
				phone: "456-789-1230",
				email: "sarah.johnson@example.com"
			}
		],
		vitalSigns: [
			{
				HR: 95,
				BP: "140/90",
				RR: 20,
				O2Sat: 96,
				temp: 37.0,
				timestamp: moment("2024-06-03T06:00:00Z").toDate()
			},
			{
				HR: 96,
				BP: "141/91",
				RR: 20,
				O2Sat: 96,
				temp: 37.1,
				timestamp: moment("2024-06-03T06:15:00Z").toDate()
			},
			{
				HR: 97,
				BP: "142/92",
				RR: 20,
				O2Sat: 96,
				temp: 37.1,
				timestamp: moment("2024-06-03T06:30:00Z").toDate()
			},
			{
				HR: 98,
				BP: "143/93",
				RR: 20,
				O2Sat: 96,
				temp: 37.1,
				timestamp: moment("2024-06-03T06:45:00Z").toDate()
			},
			{
				HR: 99,
				BP: "144/94",
				RR: 20,
				O2Sat: 96,
				temp: 37.1,
				timestamp: moment("2024-06-03T07:00:00Z").toDate()
			},
			{
				HR: 100,
				BP: "145/95",
				RR: 20,
				O2Sat: 96,
				temp: 37.1,
				timestamp: moment("2024-06-03T07:15:00Z").toDate()
			},
			{
				HR: 101,
				BP: "146/96",
				RR: 20,
				O2Sat: 96,
				temp: 37.2,
				timestamp: moment("2024-06-03T07:30:00Z").toDate()
			},
			{
				HR: 102,
				BP: "147/97",
				RR: 20,
				O2Sat: 96,
				temp: 37.2,
				timestamp: moment("2024-06-03T07:45:00Z").toDate()
			},
			{
				HR: 103,
				BP: "148/98",
				RR: 20,
				O2Sat: 96,
				temp: 37.2,
				timestamp: moment("2024-06-03T08:00:00Z").toDate()
			},
			{
				HR: 104,
				BP: "149/99",
				RR: 20,
				O2Sat: 96,
				temp: 37.2,
				timestamp: moment("2024-06-03T08:15:00Z").toDate()
			},
			{
				HR: 105,
				BP: "150/100",
				RR: 20,
				O2Sat: 96,
				temp: 37.3,
				timestamp: moment("2024-06-03T08:30:00Z").toDate()
			},
			{
				HR: 106,
				BP: "151/101",
				RR: 20,
				O2Sat: 96,
				temp: 37.3,
				timestamp: moment("2024-06-03T08:45:00Z").toDate()
			},
			{
				HR: 107,
				BP: "152/102",
				RR: 20,
				O2Sat: 96,
				temp: 37.3,
				timestamp: moment("2024-06-03T09:00:00Z").toDate()
			},
			{
				HR: 108,
				BP: "153/103",
				RR: 20,
				O2Sat: 96,
				temp: 37.3,
				timestamp: moment("2024-06-03T09:15:00Z").toDate()
			},
			{
				HR: 109,
				BP: "154/104",
				RR: 20,
				O2Sat: 96,
				temp: 37.4,
				timestamp: moment("2024-06-03T09:30:00Z").toDate()
			},
			{
				HR: 110,
				BP: "155/105",
				RR: 20,
				O2Sat: 96,
				temp: 37.4,
				timestamp: moment("2024-06-03T09:45:00Z").toDate()
			},
			{
				HR: 111,
				BP: "156/106",
				RR: 20,
				O2Sat: 96,
				temp: 37.4,
				timestamp: moment("2024-06-03T10:00:00Z").toDate()
			},
			{
				HR: 112,
				BP: "157/107",
				RR: 20,
				O2Sat: 96,
				temp: 37.4,
				timestamp: moment("2024-06-03T10:15:00Z").toDate()
			},
			{
				HR: 113,
				BP: "158/108",
				RR: 20,
				O2Sat: 96,
				temp: 37.5,
				timestamp: moment("2024-06-03T10:30:00Z").toDate()
			},
			{
				HR: 114,
				BP: "159/109",
				RR: 20,
				O2Sat: 96,
				temp: 37.5,
				timestamp: moment("2024-06-03T10:45:00Z").toDate()
			},
			{
				HR: 115,
				BP: "160/110",
				RR: 20,
				O2Sat: 96,
				temp: 37.5,
				timestamp: moment("2024-06-03T11:00:00Z").toDate()
			}
		],
		orders: [
			{
				description: "EKG",
				repeatable: false,
				lastCompleted: moment("2024-06-03T08:00:00Z").toDate()
			},
			{
				description: "Troponin",
				repeatable: true,
				frequency: "every 6 hours",
				lastCompleted: moment("2024-06-03T06:00:00Z").toDate()
			}
		],
		lines: [
			{ type: "IV", location: "Left arm" },
			{ type: "Central line", location: "Right internal jugular" }
		],
		labs: [
			{
				name: "Troponin",
				value: 1.5,
				referenceRange: "<0.04 ng/mL",
				timestamp: moment("2024-06-03T06:00:00Z").toDate()
			},
			{
				name: "CK-MB",
				value: 10,
				referenceRange: "0-5 ng/mL",
				timestamp: moment("2024-06-03T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Williams",
				role: "Attending Physician",
				phone: "987-555-8765"
			},
			{ name: "Nurse Davis", role: "Nurse", phone: "123-555-4321" }
		],
		inputs: [
			{
				input: 1000,
				route: "IV",
				timestamp: moment("2024-06-03T06:00:00Z").toDate()
			},
			{
				input: 750,
				route: "oral",
				timestamp: moment("2024-06-03T12:00:00Z").toDate()
			}
		],
		outputs: [
			{
				output: 900,
				route: "urine",
				timestamp: moment("2024-06-03T06:00:00Z").toDate()
			},
			{
				output: 500,
				route: "urine",
				timestamp: moment("2024-06-03T12:00:00Z").toDate()
			}
		],
		netFluidBalance: 350,
		vitalStatus: VitalStatus.Critical
	},
	{
		id: "P004",
		firstName: "Emily",
		lastName: "Davis",
		gender: Gender.Female,
		dateOfBirth: moment("2000-11-05").toDate(),
		bloodType: BloodType.A_NEG,
		admissionDate: moment("2024-06-04").toDate(),
		chiefComplaint: "Severe headache",
		unitType: UnitType.FloorUnit,
		roomNumber: "202",
		diagnosis: [{ description: "Migraine", ICD10Code: "G43.909" }],
		medications: [
			{
				name: "Sumatriptan",
				dosage: "100mg",
				frequency: "PRN",
				route: "Oral"
			}
		],
		allergies: [
			{
				allergen: "Ibuprofen",
				reaction: "Anaphylaxis",
				severity: "Severe"
			}
		],
		contactInfo: [
			{
				name: "Anna Davis",
				relation: "Mother",
				phone: "789-012-3456",
				email: "anna.davis@example.com"
			}
		],
		vitalSigns: [
			{
				HR: 80,
				BP: "120/70",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T06:00:00Z").toDate()
			},
			{
				HR: 81,
				BP: "121/71",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T06:15:00Z").toDate()
			},
			{
				HR: 82,
				BP: "122/72",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T06:30:00Z").toDate()
			},
			{
				HR: 83,
				BP: "123/73",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T06:45:00Z").toDate()
			},
			{
				HR: 84,
				BP: "124/74",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T07:00:00Z").toDate()
			},
			{
				HR: 85,
				BP: "125/75",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T07:15:00Z").toDate()
			},
			{
				HR: 86,
				BP: "126/76",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T07:30:00Z").toDate()
			},
			{
				HR: 87,
				BP: "127/77",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T07:45:00Z").toDate()
			},
			{
				HR: 88,
				BP: "128/78",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T08:00:00Z").toDate()
			},
			{
				HR: 89,
				BP: "129/79",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T08:15:00Z").toDate()
			},
			{
				HR: 90,
				BP: "130/80",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T08:30:00Z").toDate()
			},
			{
				HR: 91,
				BP: "131/81",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T08:45:00Z").toDate()
			},
			{
				HR: 92,
				BP: "132/82",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T09:00:00Z").toDate()
			},
			{
				HR: 93,
				BP: "133/83",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T09:15:00Z").toDate()
			},
			{
				HR: 94,
				BP: "134/84",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T09:30:00Z").toDate()
			},
			{
				HR: 95,
				BP: "135/85",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T09:45:00Z").toDate()
			},
			{
				HR: 96,
				BP: "136/86",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T10:00:00Z").toDate()
			},
			{
				HR: 97,
				BP: "137/87",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T10:15:00Z").toDate()
			},
			{
				HR: 98,
				BP: "138/88",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T10:30:00Z").toDate()
			},
			{
				HR: 99,
				BP: "139/89",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T10:45:00Z").toDate()
			},
			{
				HR: 100,
				BP: "140/90",
				RR: 16,
				O2Sat: 100,
				temp: 36.8,
				timestamp: moment("2024-06-04T11:00:00Z").toDate()
			}
		],
		orders: [
			{
				description: "CT Scan",
				repeatable: false,
				lastCompleted: moment("2024-06-04T08:00:00Z").toDate()
			},
			{
				description: "Blood test",
				repeatable: false,
				lastCompleted: moment("2024-06-04T09:00:00Z").toDate()
			}
		],
		lines: [],
		labs: [
			{
				name: "CRP",
				value: 8,
				referenceRange: "<10 mg/L",
				timestamp: moment("2024-06-04T06:00:00Z").toDate()
			},
			{
				name: "ESR",
				value: 20,
				referenceRange: "0-20 mm/hr",
				timestamp: moment("2024-06-04T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Harris",
				role: "Attending Physician",
				phone: "987-555-0987"
			},
			{ name: "Nurse White", role: "Nurse", phone: "123-555-6780" }
		],
		inputs: [
			{
				input: 500,
				route: "oral",
				timestamp: moment("2024-06-04T06:00:00Z").toDate()
			},
			{
				input: 750,
				route: "oral",
				timestamp: moment("2024-06-04T12:00:00Z").toDate()
			}
		],
		outputs: [
			{
				output: 400,
				route: "urine",
				timestamp: moment("2024-06-04T06:00:00Z").toDate()
			},
			{
				output: 500,
				route: "urine",
				timestamp: moment("2024-06-04T12:00:00Z").toDate()
			}
		],
		netFluidBalance: 350,
		vitalStatus: VitalStatus.Stable
	},
	{
		id: "P005",
		firstName: "David",
		lastName: "Martinez",
		gender: Gender.Male,
		dateOfBirth: moment("1982-09-14").toDate(),
		bloodType: BloodType.AB_POS,
		admissionDate: moment("2024-06-05").toDate(),
		chiefComplaint: "Shortness of breath",
		unitType: UnitType.ICU,
		roomNumber: "ICU-103",
		diagnosis: [{ description: "COPD exacerbation", ICD10Code: "J44.1" }],
		medications: [
			{
				name: "Albuterol",
				dosage: "2.5mg",
				frequency: "PRN",
				route: "Inhalation"
			},
			{
				name: "Prednisone",
				dosage: "40mg",
				frequency: "daily",
				route: "Oral"
			}
		],
		allergies: [
			{
				allergen: "Latex",
				reaction: "Rash",
				severity: "Mild"
			}
		],
		contactInfo: [
			{
				name: "Maria Martinez",
				relation: "Wife",
				phone: "567-890-1234",
				email: "maria.martinez@example.com"
			}
		],
		vitalSigns: [
			{
				HR: 85,
				BP: "130/80",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T06:00:00Z").toDate()
			},
			{
				HR: 86,
				BP: "131/81",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T06:15:00Z").toDate()
			},
			{
				HR: 87,
				BP: "132/82",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T06:30:00Z").toDate()
			},
			{
				HR: 88,
				BP: "133/83",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T06:45:00Z").toDate()
			},
			{
				HR: 89,
				BP: "134/84",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T07:00:00Z").toDate()
			},
			{
				HR: 90,
				BP: "135/85",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T07:15:00Z").toDate()
			},
			{
				HR: 91,
				BP: "136/86",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T07:30:00Z").toDate()
			},
			{
				HR: 92,
				BP: "137/87",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T07:45:00Z").toDate()
			},
			{
				HR: 93,
				BP: "138/88",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T08:00:00Z").toDate()
			},
			{
				HR: 94,
				BP: "139/89",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T08:15:00Z").toDate()
			},
			{
				HR: 95,
				BP: "140/90",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T08:30:00Z").toDate()
			},
			{
				HR: 96,
				BP: "141/91",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T08:45:00Z").toDate()
			},
			{
				HR: 97,
				BP: "142/92",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T09:00:00Z").toDate()
			},
			{
				HR: 98,
				BP: "143/93",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T09:15:00Z").toDate()
			},
			{
				HR: 99,
				BP: "144/94",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T09:30:00Z").toDate()
			},
			{
				HR: 100,
				BP: "145/95",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T09:45:00Z").toDate()
			},
			{
				HR: 101,
				BP: "146/96",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T10:00:00Z").toDate()
			},
			{
				HR: 102,
				BP: "147/97",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T10:15:00Z").toDate()
			},
			{
				HR: 103,
				BP: "148/98",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T10:30:00Z").toDate()
			},
			{
				HR: 104,
				BP: "149/99",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T10:45:00Z").toDate()
			},
			{
				HR: 105,
				BP: "150/100",
				RR: 22,
				O2Sat: 92,
				temp: 36.7,
				timestamp: moment("2024-06-05T11:00:00Z").toDate()
			}
		],
		orders: [
			{
				description: "ABG",
				repeatable: true,
				frequency: "every 8 hours",
				lastCompleted: moment("2024-06-05T06:00:00Z").toDate()
			},
			{
				description: "Chest X-ray",
				repeatable: true,
				frequency: "daily",
				lastCompleted: moment("2024-06-05T07:00:00Z").toDate()
			}
		],
		O2Therapy: "Non-invasive ventilation",
		ventSettings: {
			O2Percentage: 50,
			PEEP: 10,
			TV: 600,
			RR: 18
		},
		lines: [
			{ type: "IV", location: "Left hand" },
			{ type: "Central line", location: "Right femoral" }
		],
		labs: [
			{
				name: "ABG - pH",
				value: 7.35,
				referenceRange: "7.35-7.45",
				timestamp: moment("2024-06-05T06:00:00Z").toDate()
			},
			{
				name: "ABG - PaO2",
				value: 70,
				referenceRange: "75-100 mmHg",
				timestamp: moment("2024-06-05T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Taylor",
				role: "Attending Physician",
				phone: "987-555-5678"
			},
			{ name: "Nurse Lee", role: "Nurse", phone: "123-555-9876" }
		],
		inputs: [
			{
				input: 1000,
				route: "IV",
				timestamp: moment("2024-06-05T06:00:00Z").toDate()
			},
			{
				input: 750,
				route: "oral",
				timestamp: moment("2024-06-05T12:00:00Z").toDate()
			}
		],
		outputs: [
			{
				output: 800,
				route: "urine",
				timestamp: moment("2024-06-05T06:00:00Z").toDate()
			},
			{
				output: 600,
				route: "urine",
				timestamp: moment("2024-06-05T12:00:00Z").toDate()
			}
		],
		netFluidBalance: 350,
		vitalStatus: VitalStatus.Improving
	},
	{
		id: "P006",
		firstName: "Sophia",
		lastName: "Garcia",
		gender: Gender.Female,
		dateOfBirth: moment("1995-04-10").toDate(),
		bloodType: BloodType.B_POS,
		admissionDate: moment("2024-06-06").toDate(),
		chiefComplaint: "Fever and cough",
		unitType: UnitType.FloorUnit,
		roomNumber: "203",
		diagnosis: [{ description: "Bronchitis", ICD10Code: "J20.9" }],
		medications: [
			{
				name: "Azithromycin",
				dosage: "500mg",
				frequency: "daily",
				route: "Oral"
			}
		],
		allergies: [
			{
				allergen: "Peanuts",
				reaction: "Anaphylaxis",
				severity: "Severe"
			}
		],
		contactInfo: [
			{
				name: "Carlos Garcia",
				relation: "Father",
				phone: "123-456-7891",
				email: "carlos.garcia@example.com"
			}
		],
		vitalSigns: [
			{
				HR: 90,
				BP: "120/80",
				RR: 18,
				O2Sat: 97,
				temp: 38.0,
				timestamp: moment("2024-06-06T06:00:00Z").toDate()
			}
		],
		orders: [
			{
				description: "Blood culture",
				repeatable: false,
				lastCompleted: moment("2024-06-06T08:00:00Z").toDate()
			}
		],
		lines: [{ type: "IV", location: "Right hand" }],
		labs: [
			{
				name: "CBC",
				value: "Normal",
				referenceRange: "Normal",
				timestamp: moment("2024-06-06T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Clark",
				role: "Attending Physician",
				phone: "987-555-1234"
			},
			{ name: "Nurse Brown", role: "Nurse", phone: "123-555-5678" }
		],
		inputs: [
			{
				input: 500,
				route: "oral",
				timestamp: moment("2024-06-06T06:00:00Z").toDate()
			}
		],
		outputs: [
			{
				output: 400,
				route: "urine",
				timestamp: moment("2024-06-06T06:00:00Z").toDate()
			}
		],
		netFluidBalance: 100,
		vitalStatus: VitalStatus.Stable
	},
	{
		id: "P007",
		firstName: "Olivia",
		lastName: "Rodriguez",
		gender: Gender.Female,
		dateOfBirth: moment("1988-12-25").toDate(),
		bloodType: BloodType.O_NEG,
		admissionDate: moment("2024-06-07").toDate(),
		chiefComplaint: "High fever and chills",
		unitType: UnitType.ICU,
		roomNumber: "ICU-104",
		diagnosis: [{ description: "Malaria", ICD10Code: "B50.9" }],
		medications: [
			{
				name: "Artemether",
				dosage: "80mg",
				frequency: "daily",
				route: "IM"
			}
		],
		allergies: [],
		contactInfo: [
			{
				name: "Lucas Rodriguez",
				relation: "Husband",
				phone: "789-012-3457",
				email: "lucas.rodriguez@example.com"
			}
		],
		vitalSigns: [
			{
				HR: 100,
				BP: "110/70",
				RR: 20,
				O2Sat: 95,
				temp: 39.0,
				timestamp: moment("2024-06-07T06:00:00Z").toDate()
			}
		],
		orders: [
			{
				description: "Blood smear",
				repeatable: false,
				lastCompleted: moment("2024-06-07T08:00:00Z").toDate()
			}
		],
		lines: [{ type: "IV", location: "Left hand" }],
		labs: [
			{
				name: "Hemoglobin",
				value: 10.0,
				referenceRange: "12.0-15.5 g/dL",
				timestamp: moment("2024-06-07T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Evans",
				role: "Attending Physician",
				phone: "987-555-6789"
			},
			{ name: "Nurse Green", role: "Nurse", phone: "123-555-7890" }
		],
		inputs: [
			{
				input: 1000,
				route: "IV",
				timestamp: moment("2024-06-07T06:00:00Z").toDate()
			}
		],
		outputs: [
			{
				output: 800,
				route: "urine",
				timestamp: moment("2024-06-07T06:00:00Z").toDate()
			}
		],
		netFluidBalance: 200,
		vitalStatus: VitalStatus.Deteriorating
	},
	{
		id: "P008",
		firstName: "Liam",
		lastName: "Wilson",
		gender: Gender.Male,
		dateOfBirth: moment("1970-01-01").toDate(),
		bloodType: BloodType.AB_NEG,
		admissionDate: moment("2024-06-08").toDate(),
		chiefComplaint: "Multiple organ failure",
		unitType: UnitType.ICU,
		roomNumber: "ICU-105",
		diagnosis: [
			{ description: "Septic shock", ICD10Code: "R65.21" },
			{ description: "Acute kidney injury", ICD10Code: "N17.9" }
		],
		medications: [
			{
				name: "Norepinephrine",
				dosage: "0.1 mcg/kg/min",
				frequency: "continuous",
				route: "IV"
			},
			{
				name: "Vancomycin",
				dosage: "1g",
				frequency: "12 hours",
				route: "IV"
			}
		],
		allergies: [
			{
				allergen: "Sulfa drugs",
				reaction: "Rash",
				severity: "Severe"
			}
		],
		contactInfo: [
			{
				name: "Emma Wilson",
				relation: "Daughter",
				phone: "123-456-7892",
				email: "emma.wilson@example.com"
			}
		],
		vitalSigns: [
			{
				HR: 120,
				BP: "80/50",
				RR: 30,
				O2Sat: 85,
				temp: 39.5,
				timestamp: moment("2024-06-08T06:00:00Z").toDate()
			},
			{
				HR: 125,
				BP: "75/45",
				RR: 32,
				O2Sat: 83,
				temp: 39.6,
				timestamp: moment("2024-06-08T06:30:00Z").toDate()
			},
			{
				HR: 130,
				BP: "70/40",
				RR: 34,
				O2Sat: 82,
				temp: 39.7,
				timestamp: moment("2024-06-08T07:00:00Z").toDate()
			},
			{
				HR: 135,
				BP: "65/35",
				RR: 36,
				O2Sat: 80,
				temp: 39.8,
				timestamp: moment("2024-06-08T07:30:00Z").toDate()
			},
			{
				HR: 140,
				BP: "60/30",
				RR: 38,
				O2Sat: 78,
				temp: 40.0,
				timestamp: moment("2024-06-08T08:00:00Z").toDate()
			}
		],
		orders: [
			{
				description: "Blood culture",
				repeatable: false,
				lastCompleted: moment("2024-06-08T08:00:00Z").toDate()
			},
			{
				description: "Dialysis",
				repeatable: true,
				frequency: "daily",
				lastCompleted: moment("2024-06-08T07:00:00Z").toDate()
			}
		],
		O2Therapy: "Mechanical ventilation",
		ventSettings: {
			O2Percentage: 100,
			PEEP: 10,
			TV: 500,
			RR: 20
		},
		lines: [
			{ type: "IV", location: "Right arm" },
			{ type: "Central line", location: "Right subclavian" }
		],
		labs: [
			{
				name: "WBC",
				value: 24.0,
				referenceRange: "4.0-11.0 x10^3/uL",
				timestamp: moment("2024-06-08T06:00:00Z").toDate()
			},
			{
				name: "Creatinine",
				value: 5.0,
				referenceRange: "0.6-1.2 mg/dL",
				timestamp: moment("2024-06-08T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Johnson",
				role: "Attending Physician",
				phone: "987-555-4321"
			},
			{ name: "Nurse Brown", role: "Nurse", phone: "123-555-6789" }
		],
		inputs: [
			{
				input: 1500,
				route: "IV",
				timestamp: moment("2024-06-08T06:00:00Z").toDate()
			}
		],
		outputs: [
			{
				output: 400,
				route: "urine",
				timestamp: moment("2024-06-08T06:00:00Z").toDate()
			}
		],
		netFluidBalance: 1100,
		vitalStatus: VitalStatus.Critical
	},

	{
		id: "P009",
		firstName: "Robert",
		lastName: "Cooper",
		gender: Gender.Male,
		dateOfBirth: moment("1992-08-15").toDate(),
		bloodType: BloodType.O_POS,
		admissionDate: moment("2024-06-09").toDate(),
		chiefComplaint: "Appendectomy recovery",
		unitType: UnitType.FloorUnit,
		roomNumber: "204",
		diagnosis: [{ description: "Post-appendectomy", ICD10Code: "Z98.89" }],
		medications: [
			{
				name: "Acetaminophen",
				dosage: "650mg",
				frequency: "6 hours",
				route: "Oral"
			}
		],
		vitalSigns: [
			{
				HR: 72,
				BP: "118/78",
				RR: 16,
				O2Sat: 99,
				temp: 36.8,
				timestamp: moment("2024-06-09T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Wilson",
				role: "Attending Physician",
				phone: "987-555-1111"
			}
		],
		vitalStatus: VitalStatus.Stable
	},
	{
		id: "P010",
		firstName: "Sarah",
		lastName: "Thompson",
		gender: Gender.Female,
		dateOfBirth: moment("1988-03-25").toDate(),
		bloodType: BloodType.A_POS,
		admissionDate: moment("2024-06-09").toDate(),
		chiefComplaint: "Cellulitis",
		unitType: UnitType.FloorUnit,
		roomNumber: "205",
		diagnosis: [
			{ description: "Cellulitis of right leg", ICD10Code: "L03.115" }
		],
		medications: [
			{
				name: "Cephalexin",
				dosage: "500mg",
				frequency: "6 hours",
				route: "Oral"
			}
		],
		vitalSigns: [
			{
				HR: 76,
				BP: "122/82",
				RR: 14,
				O2Sat: 98,
				temp: 37.1,
				timestamp: moment("2024-06-09T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Martinez",
				role: "Attending Physician",
				phone: "987-555-2222"
			}
		],
		vitalStatus: VitalStatus.Improving
	},
	{
		id: "P011",
		firstName: "Thomas",
		lastName: "Anderson",
		gender: Gender.Male,
		dateOfBirth: moment("1979-11-30").toDate(),
		bloodType: BloodType.B_POS,
		admissionDate: moment("2024-06-09").toDate(),
		chiefComplaint: "Dehydration",
		unitType: UnitType.FloorUnit,
		roomNumber: "206",
		diagnosis: [{ description: "Dehydration", ICD10Code: "E86.0" }],
		medications: [
			{
				name: "Normal Saline",
				dosage: "1L",
				frequency: "8 hours",
				route: "IV"
			}
		],
		vitalSigns: [
			{
				HR: 82,
				BP: "115/75",
				RR: 16,
				O2Sat: 97,
				temp: 36.9,
				timestamp: moment("2024-06-09T06:00:00Z").toDate()
			}
		],
		providers: [
			{
				name: "Dr. Lee",
				role: "Attending Physician",
				phone: "987-555-3333"
			}
		],
		vitalStatus: VitalStatus.Stable
	}
]

export { Gender, BloodType, UnitType, VitalStatus, patients }
export type {
	ContactInfo,
	Medication,
	Allergy,
	VitalSign,
	Order,
	VentSettings,
	Line,
	Lab,
	Diagnosis,
	Provider,
	Input,
	Output,
	Patient
}
