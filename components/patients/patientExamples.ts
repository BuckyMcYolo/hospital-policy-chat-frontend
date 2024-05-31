type Allergy = {
	name: string
	reaction: string
	severity: "mild" | "moderate" | "severe"
}

type Medication = {
	name: string
	dose: string
	frequency: string
}

type MedicalHistory = {
	condition: string
	dateStarted: Date
}

type Surgery = {
	name: string
	date: Date
}

type FamilyHistory = {
	condition: string
	relative: string
}

type SocialHistory = {
	status: "single" | "married" | "divorced" | "widowed"
	occupation: string
	livingSituation:
		| "alone"
		| "with family"
		| "with friends"
		| "in a nursing home"
		| "in an assisted living facility"
	tobaccoUse: "never" | "current" | "former"
	alcoholUse: "never" | "current" | "former"
	drugUse: "never" | "current" | "former"
}

type Immunization = {
	name: string
	date: Date
}

type Appointment = {
	date: Date
	time: string
	reason: string
	doctor: string
	location: string
}

type LabResult = {
	test: string
	value: string
	unit: string
	referenceRange: string
}

type Lab = {
	date: Date
	type: string
	results: LabResult[]
}

type Imaging = {
	date: Date
	type: string
	results: string
}

type Procedure = {
	date: Date
	type: string
	results: string
}

export type Patient = {
	name: string
	dateOfBirth: Date | string
	address: string
	phone: string
	email: {
		primary: string | null
		secondary: string | null
	} | null
	emergencyContact: {
		name: string
		phone: string
		relationship: string
	} | null
	insurance: {
		provider: string
		policyNumber: string
	}
	allergies: Allergy[]
	medications: Medication[]
	medicalHistory: MedicalHistory[]
	surgeries: Surgery[]
	familyHistory: FamilyHistory[]
	socialHistory: SocialHistory
	immunizations: Immunization[]
	appointments: Appointment[]
	labs: Lab[]
	imaging: Imaging[]
	procedures: Procedure[]
	notes: string
}

export const patient1: Patient = {
	name: "John Doe",
	dateOfBirth: "01/01/1990",
	address: "123 Main St, Anytown, USA",
	phone: "555-555-5555",
	email: {
		primary: "johndoe@gmail.com",
		secondary: null,
	},
	emergencyContact: {
		name: "Jane Doe",
		phone: "555-555-5555",
		relationship: "spouse",
	},
	insurance: {
		provider: "Blue Cross Blue Shield",
		policyNumber: "123456789",
	},
	allergies: [
		{
			name: "Penicillin",
			reaction: "rash",
			severity: "mild",
		},
	],
	medications: [
		{
			name: "Lisinopril",
			dose: "10 mg",
			frequency: "daily",
		},
	],
	medicalHistory: [
		{
			condition: "Hypertension",
			dateStarted: new Date("01/01/2010"),
		},
	],
	surgeries: [
		{
			name: "Appendectomy",
			date: new Date("01/01/2015"),
		},
	],
	familyHistory: [
		{
			condition: "Diabetes",
			relative: "Mother",
		},
	],
	socialHistory: {
		status: "single",
		occupation: "Software Engineer",
		livingSituation: "alone",
		tobaccoUse: "never",
		alcoholUse: "never",
		drugUse: "never",
	},
	immunizations: [
		{
			name: "Flu Shot",
			date: new Date("01/01/2020"),
		},
	],
	appointments: [
		{
			date: new Date("01/01/2021"),
			time: "9:00 AM",
			reason: "Annual Physical",
			doctor: "Dr. Smith",
			location: "123 Main St, Anytown, USA",
		},
	],
	labs: [
		{
			date: new Date("01/01/2021"),
			type: "Complete Blood Count (CBC)",
			results: [
				{
					test: "WBC",
					value: "5.0",
					unit: "x10^3/uL",
					referenceRange: "4.0-11.0",
				},
				{
					test: "RBC",
					value: "4.5",
					unit: "x10^6/uL",
					referenceRange: "4.2-5.9",
				},
				{
					test: "Hemoglobin",
					value: "13.5",
					unit: "g/dL",
					referenceRange: "13.0-17.0",
				},
				{
					test: "Hematocrit",
					value: "40%",
					unit: "%",
					referenceRange: "37-49",
				},
				{
					test: "Platelets",
					value: "250",
					unit: "x10^3/uL",
					referenceRange: "150-450",
				},
			],
		},
		{
			date: new Date("01/01/2021"),
			type: "Comprehensive Metabolic Panel (CMP)",
			results: [
				{
					test: "Sodium",
					value: "140",
					unit: "mmol/L",
					referenceRange: "135-145",
				},
				{
					test: "Potassium",
					value: "4.0",
					unit: "mmol/L",
					referenceRange: "3.5-5.0",
				},
				{
					test: "Chloride",
					value: "100",
					unit: "mmol/L",
					referenceRange: "98-107",
				},
				{
					test: "Bicarbonate",
					value: "24",
					unit: "mmol/L",
					referenceRange: "22-29",
				},
				{
					test: "Glucose",
					value: "90",
					unit: "mg/dL",
					referenceRange: "70-99",
				},
				{
					test: "BUN",
					value: "15",
					unit: "mg/dL",
					referenceRange: "7-20",
				},
				{
					test: "Creatinine",
					value: "1.0",
					unit: "mg/dL",
					referenceRange: "0.6-1.2",
				},
			],
		},
	],
	imaging: [
		{
			date: new Date("01/01/2021"),
			type: "Chest X-ray",
			results: "Normal",
		},
	],
	procedures: [
		{
			date: new Date("01/01/2021"),
			type: "EKG",
			results: "Normal",
		},
	],
	notes: "Patient is in good health.",
}

export const patient2: Patient = {
	name: "Jane Smith",
	dateOfBirth: "05/15/1985",
	address: "456 Elm St, Othertown, USA",
	phone: "555-555-1234",
	email: {
		primary: "janesmith@gmail.com",
		secondary: "jane.smith@workemail.com",
	},
	emergencyContact: {
		name: "John Smith",
		phone: "555-555-5678",
		relationship: "husband",
	},
	insurance: {
		provider: "United Healthcare",
		policyNumber: "987654321",
	},
	allergies: [
		{
			name: "Peanuts",
			reaction: "anaphylaxis",
			severity: "severe",
		},
	],
	medications: [
		{
			name: "Metformin",
			dose: "500 mg",
			frequency: "twice daily",
		},
	],
	medicalHistory: [
		{
			condition: "Type 2 Diabetes",
			dateStarted: new Date("01/01/2012"),
		},
	],
	surgeries: [
		{
			name: "Gallbladder Removal",
			date: new Date("03/15/2017"),
		},
	],
	familyHistory: [
		{
			condition: "Heart Disease",
			relative: "Father",
		},
	],
	socialHistory: {
		status: "married",
		occupation: "Teacher",
		livingSituation: "with family",
		tobaccoUse: "never",
		alcoholUse: "current",
		drugUse: "never",
	},
	immunizations: [
		{
			name: "COVID-19 Vaccine",
			date: new Date("01/01/2021"),
		},
	],
	appointments: [
		{
			date: new Date("04/01/2022"),
			time: "10:00 AM",
			reason: "Diabetes Check-up",
			doctor: "Dr. Johnson",
			location: "456 Elm St, Othertown, USA",
		},
	],
	labs: [
		{
			date: new Date("04/01/2022"),
			type: "Hemoglobin A1c",
			results: [
				{
					test: "HbA1c",
					value: "7.2",
					unit: "%",
					referenceRange: "4.0-5.6",
				},
			],
		},
	],
	imaging: [
		{
			date: new Date("04/01/2021"),
			type: "Abdominal Ultrasound",
			results: "Normal",
		},
	],
	procedures: [
		{
			date: new Date("01/01/2022"),
			type: "Colonoscopy",
			results: "Normal",
		},
	],
	notes: "Patient is managing diabetes well with medication and lifestyle changes.",
}

export const patient3: Patient = {
	name: "Michael Johnson",
	dateOfBirth: "12/20/1975",
	address: "789 Pine St, Anothertown, USA",
	phone: "555-555-9876",
	email: {
		primary: "michaelj@domain.com",
		secondary: null,
	},
	emergencyContact: {
		name: "Sara Johnson",
		phone: "555-555-6543",
		relationship: "wife",
	},
	insurance: {
		provider: "Cigna",
		policyNumber: "1122334455",
	},
	allergies: [
		{
			name: "Latex",
			reaction: "hives",
			severity: "moderate",
		},
	],
	medications: [
		{
			name: "Atorvastatin",
			dose: "20 mg",
			frequency: "daily",
		},
	],
	medicalHistory: [
		{
			condition: "Hyperlipidemia",
			dateStarted: new Date("01/01/2018"),
		},
	],
	surgeries: [
		{
			name: "Knee Replacement",
			date: new Date("02/20/2020"),
		},
	],
	familyHistory: [
		{
			condition: "Hypertension",
			relative: "Mother",
		},
	],
	socialHistory: {
		status: "married",
		occupation: "Accountant",
		livingSituation: "with family",
		tobaccoUse: "former",
		alcoholUse: "current",
		drugUse: "never",
	},
	immunizations: [
		{
			name: "Tetanus",
			date: new Date("05/01/2019"),
		},
	],
	appointments: [
		{
			date: new Date("06/01/2022"),
			time: "2:00 PM",
			reason: "Cholesterol Follow-up",
			doctor: "Dr. Lee",
			location: "789 Pine St, Anothertown, USA",
		},
	],
	labs: [
		{
			date: new Date("06/01/2022"),
			type: "Lipid Panel",
			results: [
				{
					test: "Total Cholesterol",
					value: "180",
					unit: "mg/dL",
					referenceRange: "<200",
				},
				{
					test: "HDL",
					value: "50",
					unit: "mg/dL",
					referenceRange: ">40",
				},
				{
					test: "LDL",
					value: "100",
					unit: "mg/dL",
					referenceRange: "<100",
				},
				{
					test: "Triglycerides",
					value: "150",
					unit: "mg/dL",
					referenceRange: "<150",
				},
			],
		},
	],
	imaging: [
		{
			date: new Date("02/20/2020"),
			type: "Knee X-ray",
			results:
				"Post-surgery evaluation shows proper alignment and healing.",
		},
	],
	procedures: [
		{
			date: new Date("06/01/2021"),
			type: "Stress Test",
			results: "Normal",
		},
	],
	notes: "Patient is advised to continue with current medication and diet.",
}

export const patient4: Patient = {
	name: "Emily Davis",
	dateOfBirth: "03/10/1995",
	address: "1010 Birch St, Yetanothertown, USA",
	phone: "555-555-4321",
	email: {
		primary: "emily.davis@domain.com",
		secondary: null,
	},
	emergencyContact: {
		name: "Robert Davis",
		phone: "555-555-8765",
		relationship: "father",
	},
	insurance: {
		provider: "Aetna",
		policyNumber: "9988776655",
	},
	allergies: [
		{
			name: "Shellfish",
			reaction: "swelling",
			severity: "severe",
		},
	],
	medications: [
		{
			name: "Albuterol",
			dose: "2 puffs",
			frequency: "as needed",
		},
	],
	medicalHistory: [
		{
			condition: "Asthma",
			dateStarted: new Date("01/01/2005"),
		},
	],
	surgeries: [
		{
			name: "Tonsillectomy",
			date: new Date("05/15/2002"),
		},
	],
	familyHistory: [
		{
			condition: "Asthma",
			relative: "Mother",
		},
	],
	socialHistory: {
		status: "single",
		occupation: "Graphic Designer",
		livingSituation: "with friends",
		tobaccoUse: "never",
		alcoholUse: "current",
		drugUse: "never",
	},
	immunizations: [
		{
			name: "HPV Vaccine",
			date: new Date("01/01/2018"),
		},
	],
	appointments: [
		{
			date: new Date("07/01/2022"),
			time: "11:00 AM",
			reason: "Asthma Management",
			doctor: "Dr. Williams",
			location: "1010 Birch St, Yetanothertown, USA",
		},
	],
	labs: [
		{
			date: new Date("07/01/2022"),
			type: "Pulmonary Function Test",
			results: [
				{
					test: "FEV1",
					value: "80%",
					unit: "% predicted",
					referenceRange: ">80%",
				},
				{
					test: "FVC",
					value: "85%",
					unit: "% predicted",
					referenceRange: ">80%",
				},
			],
		},
	],
	imaging: [
		{
			date: new Date("07/01/2021"),
			type: "Chest CT",
			results: "Normal",
		},
	],
	procedures: [
		{
			date: new Date("07/01/2022"),
			type: "Bronchoscopy",
			results: "Normal",
		},
	],
	notes: "Patient's asthma is well controlled with current medication.",
}

export const patient5: Patient = {
	name: "Alice Brown",
	dateOfBirth: "08/25/1965",
	address: "111 Maple St, Smalltown, USA",
	phone: "555-555-6543",
	email: {
		primary: "alice.brown@domain.com",
		secondary: null,
	},
	emergencyContact: {
		name: "George Brown",
		phone: "555-555-7890",
		relationship: "husband",
	},
	insurance: {
		provider: "Kaiser Permanente",
		policyNumber: "3344556677",
	},
	allergies: [
		{
			name: "Aspirin",
			reaction: "stomach upset",
			severity: "moderate",
		},
	],
	medications: [
		{
			name: "Levothyroxine",
			dose: "75 mcg",
			frequency: "daily",
		},
	],
	medicalHistory: [
		{
			condition: "Hypothyroidism",
			dateStarted: new Date("01/01/2015"),
		},
	],
	surgeries: [
		{
			name: "Cataract Surgery",
			date: new Date("10/10/2018"),
		},
	],
	familyHistory: [
		{
			condition: "Breast Cancer",
			relative: "Sister",
		},
	],
	socialHistory: {
		status: "married",
		occupation: "Retired",
		livingSituation: "with family",
		tobaccoUse: "never",
		alcoholUse: "current",
		drugUse: "never",
	},
	immunizations: [
		{
			name: "Shingles Vaccine",
			date: new Date("03/15/2019"),
		},
	],
	appointments: [
		{
			date: new Date("05/01/2022"),
			time: "1:00 PM",
			reason: "Thyroid Check-up",
			doctor: "Dr. Martinez",
			location: "111 Maple St, Smalltown, USA",
		},
	],
	labs: [
		{
			date: new Date("05/01/2022"),
			type: "Thyroid Panel",
			results: [
				{
					test: "TSH",
					value: "2.5",
					unit: "mIU/L",
					referenceRange: "0.4-4.0",
				},
				{
					test: "Free T4",
					value: "1.1",
					unit: "ng/dL",
					referenceRange: "0.8-1.8",
				},
			],
		},
	],
	imaging: [
		{
			date: new Date("10/10/2018"),
			type: "Eye Ultrasound",
			results: "Normal",
		},
	],
	procedures: [
		{
			date: new Date("10/10/2018"),
			type: "Eye Surgery",
			results: "Successful cataract removal",
		},
	],
	notes: "Patient is stable with current thyroid medication.",
}

export const patient6: Patient = {
	name: "Robert Wilson",
	dateOfBirth: "11/30/1970",
	address: "222 Oak St, Bigtown, USA",
	phone: "555-555-3456",
	email: {
		primary: "robert.wilson@domain.com",
		secondary: null,
	},
	emergencyContact: {
		name: "Linda Wilson",
		phone: "555-555-6789",
		relationship: "wife",
	},
	insurance: {
		provider: "Humana",
		policyNumber: "2233445566",
	},
	allergies: [
		{
			name: "Dust",
			reaction: "sneezing",
			severity: "mild",
		},
	],
	medications: [
		{
			name: "Amlodipine",
			dose: "5 mg",
			frequency: "daily",
		},
	],
	medicalHistory: [
		{
			condition: "Hypertension",
			dateStarted: new Date("01/01/2015"),
		},
	],
	surgeries: [
		{
			name: "Hernia Repair",
			date: new Date("06/15/2010"),
		},
	],
	familyHistory: [
		{
			condition: "Stroke",
			relative: "Father",
		},
	],
	socialHistory: {
		status: "married",
		occupation: "Engineer",
		livingSituation: "with family",
		tobaccoUse: "never",
		alcoholUse: "former",
		drugUse: "never",
	},
	immunizations: [
		{
			name: "Pneumococcal Vaccine",
			date: new Date("01/01/2019"),
		},
	],
	appointments: [
		{
			date: new Date("07/01/2022"),
			time: "3:00 PM",
			reason: "Blood Pressure Follow-up",
			doctor: "Dr. Patel",
			location: "222 Oak St, Bigtown, USA",
		},
	],
	labs: [
		{
			date: new Date("07/01/2022"),
			type: "Basic Metabolic Panel",
			results: [
				{
					test: "Sodium",
					value: "138",
					unit: "mmol/L",
					referenceRange: "135-145",
				},
				{
					test: "Potassium",
					value: "4.2",
					unit: "mmol/L",
					referenceRange: "3.5-5.0",
				},
				{
					test: "Chloride",
					value: "101",
					unit: "mmol/L",
					referenceRange: "98-107",
				},
				{
					test: "Bicarbonate",
					value: "26",
					unit: "mmol/L",
					referenceRange: "22-29",
				},
				{
					test: "Glucose",
					value: "92",
					unit: "mg/dL",
					referenceRange: "70-99",
				},
				{
					test: "BUN",
					value: "14",
					unit: "mg/dL",
					referenceRange: "7-20",
				},
				{
					test: "Creatinine",
					value: "0.9",
					unit: "mg/dL",
					referenceRange: "0.6-1.2",
				},
			],
		},
	],
	imaging: [
		{
			date: new Date("06/15/2010"),
			type: "Abdominal CT",
			results: "Normal post-surgery findings",
		},
	],
	procedures: [
		{
			date: new Date("07/01/2022"),
			type: "Blood Pressure Monitoring",
			results: "Normal",
		},
	],
	notes: "Patient's hypertension is well-controlled with current medication.",
}

export const patient7: Patient = {
	name: "Linda Green",
	dateOfBirth: "04/22/1990",
	address: "333 Cedar St, Littletown, USA",
	phone: "555-555-5678",
	email: {
		primary: "linda.green@domain.com",
		secondary: null,
	},
	emergencyContact: {
		name: "James Green",
		phone: "555-555-8765",
		relationship: "brother",
	},
	insurance: {
		provider: "Anthem",
		policyNumber: "5566778899",
	},
	allergies: [
		{
			name: "Gluten",
			reaction: "bloating",
			severity: "moderate",
		},
	],
	medications: [
		{
			name: "Omeprazole",
			dose: "20 mg",
			frequency: "daily",
		},
	],
	medicalHistory: [
		{
			condition: "GERD",
			dateStarted: new Date("01/01/2016"),
		},
	],
	surgeries: [
		{
			name: "Wisdom Teeth Removal",
			date: new Date("08/20/2008"),
		},
	],
	familyHistory: [
		{
			condition: "Celiac Disease",
			relative: "Mother",
		},
	],
	socialHistory: {
		status: "single",
		occupation: "Nurse",
		livingSituation: "with friends",
		tobaccoUse: "never",
		alcoholUse: "current",
		drugUse: "never",
	},
	immunizations: [
		{
			name: "Hepatitis B Vaccine",
			date: new Date("06/01/2010"),
		},
	],
	appointments: [
		{
			date: new Date("08/01/2022"),
			time: "4:00 PM",
			reason: "GERD Management",
			doctor: "Dr. Taylor",
			location: "333 Cedar St, Littletown, USA",
		},
	],
	labs: [
		{
			date: new Date("08/01/2022"),
			type: "H. Pylori Test",
			results: [
				{
					test: "H. Pylori Antibody",
					value: "Negative",
					unit: "",
					referenceRange: "Negative",
				},
			],
		},
	],
	imaging: [
		{
			date: new Date("08/01/2021"),
			type: "Upper GI Endoscopy",
			results: "Mild esophagitis",
		},
	],
	procedures: [
		{
			date: new Date("08/01/2022"),
			type: "Endoscopy",
			results: "No abnormalities",
		},
	],
	notes: "Patient is advised to continue with current GERD medication and dietary changes.",
}
export const patient8: Patient = {
	name: "David Clark",
	dateOfBirth: "09/14/1980",
	address: "444 Willow St, Middletown, USA",
	phone: "555-555-7890",
	email: {
		primary: "david.clark@domain.com",
		secondary: "david.clark@workemail.com",
	},
	emergencyContact: {
		name: "Mary Clark",
		phone: "555-555-1234",
		relationship: "wife",
	},
	insurance: {
		provider: "WellCare",
		policyNumber: "6677889900",
	},
	allergies: [
		{
			name: "Sulfa Drugs",
			reaction: "rash",
			severity: "moderate",
		},
	],
	medications: [
		{
			name: "Metoprolol",
			dose: "50 mg",
			frequency: "daily",
		},
	],
	medicalHistory: [
		{
			condition: "Atrial Fibrillation",
			dateStarted: new Date("01/01/2020"),
		},
	],
	surgeries: [
		{
			name: "Back Surgery",
			date: new Date("11/15/2012"),
		},
	],
	familyHistory: [
		{
			condition: "Hypertension",
			relative: "Father",
		},
	],
	socialHistory: {
		status: "married",
		occupation: "Project Manager",
		livingSituation: "with family",
		tobaccoUse: "former",
		alcoholUse: "current",
		drugUse: "never",
	},
	immunizations: [
		{
			name: "Influenza Vaccine",
			date: new Date("10/01/2022"),
		},
	],
	appointments: [
		{
			date: new Date("12/01/2022"),
			time: "10:00 AM",
			reason: "Heart Check-up",
			doctor: "Dr. Anderson",
			location: "444 Willow St, Middletown, USA",
		},
	],
	labs: [
		{
			date: new Date("12/01/2022"),
			type: "Electrolyte Panel",
			results: [
				{
					test: "Sodium",
					value: "139",
					unit: "mmol/L",
					referenceRange: "135-145",
				},
				{
					test: "Potassium",
					value: "4.1",
					unit: "mmol/L",
					referenceRange: "3.5-5.0",
				},
				{
					test: "Chloride",
					value: "102",
					unit: "mmol/L",
					referenceRange: "98-107",
				},
				{
					test: "Bicarbonate",
					value: "25",
					unit: "mmol/L",
					referenceRange: "22-29",
				},
			],
		},
		{
			date: new Date("12/01/2022"),
			type: "Lipid Panel",
			results: [
				{
					test: "Total Cholesterol",
					value: "190",
					unit: "mg/dL",
					referenceRange: "<200",
				},
				{
					test: "HDL",
					value: "55",
					unit: "mg/dL",
					referenceRange: ">40",
				},
				{
					test: "LDL",
					value: "120",
					unit: "mg/dL",
					referenceRange: "<100",
				},
				{
					test: "Triglycerides",
					value: "160",
					unit: "mg/dL",
					referenceRange: "<150",
				},
			],
		},
	],
	imaging: [
		{
			date: new Date("01/01/2020"),
			type: "Echocardiogram",
			results: "Mild left atrial enlargement",
		},
	],
	procedures: [
		{
			date: new Date("12/01/2022"),
			type: "Cardioversion",
			results: "Successful restoration of normal heart rhythm",
		},
	],
	notes: "Patient is advised to maintain current medication and follow-up in 6 months.",
}

export const patients: Patient[] = [
	patient1,
	patient2,
	patient3,
	patient4,
	patient5,
	patient6,
	patient7,
	patient8,
]

interface Admission extends Patient {
	admissionDate: Date
	dischargeDate: Date | null
	admissionReason: string
	admissionLocation: string
	admittingDoctor: string
	attendingDoctor: string
	floor: string
	room: string
}

export const curentAdmissions = [
	{
		...patient1,
		admissionDate: new Date("05/30/2024"),
		dischargeDate: null,
		admissionReason: "Chest Pain",
		admissionLocation: "Emergency Department",
		admittingDoctor: "Dr. Johnson",
		attendingDoctor: "Dr. Smith",
		floor: "3",
		room: "301",
	},
	{
		...patient2,
		admissionDate: new Date("05/30/2024"),
		dischargeDate: null,
		admissionReason: "Shortness of Breath",
		admissionLocation: "Emergency Department",
		admittingDoctor: "Dr. Lee",
		attendingDoctor: "Dr. Patel",
		floor: "3",
		room: "302",
	},
	{
		...patient3,
		admissionDate: new Date("05/28/2024"),
		dischargeDate: null,
		admissionReason: "Abdominal Pain",
		admissionLocation: "Emergency Department",
		admittingDoctor: "Dr. Martinez",
		attendingDoctor: "Dr. Johnson",
		floor: "3",
		room: "303",
	},
	{
		...patient4,
		admissionDate: new Date("04/29/2024"),
		dischargeDate: null,
		admissionReason: "Fever",
		admissionLocation: "Emergency Department",
		admittingDoctor: "Dr. Patel",
		attendingDoctor: "Dr. Lee",
		floor: "3",
		room: "304",
	},
	{
		...patient5,
		admissionDate: new Date("05/30/2024"),
		dischargeDate: null,
		admissionReason: "Headache",
		admissionLocation: "Emergency Department",
		admittingDoctor: "Dr. Smith",
		attendingDoctor: "Dr. Martinez",
		floor: "3",
		room: "305",
	},
	{
		...patient6,
		admissionDate: new Date("05/29/2024"),
		dischargeDate: null,
		admissionReason: "Dizziness",
		admissionLocation: "Emergency Department",
		admittingDoctor: "Dr. Johnson",
		attendingDoctor: "Dr. Patel",
		floor: "3",
		room: "306",
	},
	{
		...patient7,
		admissionDate: new Date("05/15/2024"),
		dischargeDate: null,
		admissionReason: "Nausea",
		admissionLocation: "Emergency Department",
		admittingDoctor: "Dr. Lee",
		attendingDoctor: "Dr. Smith",
		floor: "3",
		room: "307",
	},
	{
		...patient8,
		admissionDate: new Date("05/30/2024"),
		dischargeDate: null,
		admissionReason: "Chest Pain",
		admissionLocation: "Emergency Department",
		admittingDoctor: "Dr. Johnson",
		attendingDoctor: "Dr. Smith",
		floor: "3",
		room: "308",
	},
] as Admission[]
