import { 
  BupaMember, 
  ExtensiveCarePatientCase, 
  CareServiceOffering, 
  TelemetryPoint, 
  StandardFormData, 
  CarebridgeUser,
  CareUnitsRecord 
} from './types';

export const CURRENT_BUPA_MEMBER: BupaMember = {
  id: 'mem-902184',
  name: 'Sarah Jenkins',
  membershipNumber: 'BUP-8849-2041-A',
  planType: 'Bupa Ultimate Health & Extensive Hospital Cover',
  tier: 'Diamond Comprehensive',
  validUntil: '31 Dec 2026',
  avatarUrl: 'https://picsum.photos/seed/bupa_sarah/200/200',
  dependentsCount: 3,
  coverageStatus: 'Active - Full Hospital & Extensive Care Covered'
};

/**
 * Simulated records from Carebridge_Users.users table
 */
export const CAREBRIDGE_USERS_TABLE: CarebridgeUser[] = [
  {
    user_id: 'USR-8821',
    username: 'robert.jenkins',
    full_name: 'Robert Jenkins',
    email: 'robert.jenkins@carebridge.co.uk',
    role: 'Patient',
    nhs_or_bupa_id: 'BUP-DEP-001'
  },
  {
    user_id: 'USR-1044',
    username: 'sarah.jenkins',
    full_name: 'Sarah Jenkins',
    email: 'sarah.jenkins@mybupa.co.uk',
    role: 'Primary Member',
    nhs_or_bupa_id: 'BUP-8849-2041-A'
  },
  {
    user_id: 'USR-3920',
    username: 'dr.mchen',
    full_name: 'Dr. Michael Chen, FANZCA',
    email: 'm.chen@careconnect-mecu.nhs.uk',
    role: 'Authorizing Clinician',
    nhs_or_bupa_id: 'GMC-774921'
  },
  {
    user_id: 'USR-5509',
    username: 'emma.taylor',
    full_name: 'Emma Taylor, RN',
    email: 'e.taylor@careconnect.co.uk',
    role: 'Care Coordinator',
    nhs_or_bupa_id: 'NMC-881290'
  }
];

/**
 * Pre-existing units from careconnect_uk.care_units table with diverse capability combinations,
 * bed vacancies, distance in miles, and availability packages.
 */
export const CARECONNECT_UK_CARE_UNITS_RECORDS: CareUnitsRecord[] = [
  {
    care_home_id: 'CH-WESTMINSTER-ACUTE-01',
    care_home_name: 'Westminster Bupa Health & Extensive Care Residence',
    care_unit_id: 'CU-HDU-CARDIAC-4B',
    postal_code: 'SW1P 3PB',
    mobility_status: ['Wheelchair Bound', 'Assisted Stand', 'Hoist Transfer Required'],
    wheelchair_accessible: true,
    washroom_assistance: true,
    feeding_assistance: true,
    oxygen_cylinder: true,
    bp_monitoring: true,
    diabetic_care: true,
    bladder_control: false,
    bowel_control: false,
    food_allergies: ['Gluten', 'Penicillin Derived Preservatives'],
    food_record: 'Soft dysphagia diet, thickened liquids (level 2). Supervised meal times required.',
    dementia_care: true,
    falls_risk_support: true,
    nurse_on_duty: true,
    bariatric_handling: false,
    created_at: '2025-01-15 08:30:00',
    updated_at: '2025-05-10 14:15:22',
    available_beds: 3,
    total_beds: 24,
    distance_miles: 0.8,
    package_tier: 'Premier',
    room_type: 'En-Suite Private Suite',
    specialist_on_call: true
  },
  {
    care_home_id: 'CH-CAMBRIDGE-REGIONAL-02',
    care_home_name: 'Cambridge Regional Neuro & High-Care Centre',
    care_unit_id: 'CU-NEURO-STEPDOWN-2A',
    postal_code: 'CB2 0QQ',
    mobility_status: ['Wheelchair Bound', 'Assisted Stand', 'Walking Stick Support'],
    wheelchair_accessible: true,
    washroom_assistance: true,
    feeding_assistance: false,
    oxygen_cylinder: true,
    bp_monitoring: true,
    diabetic_care: true,
    bladder_control: true,
    bowel_control: true,
    food_allergies: ['Nuts', 'Shellfish'],
    food_record: 'Regular cardiac heart-healthy diet, low sodium under 2g/day.',
    dementia_care: true,
    falls_risk_support: true,
    nurse_on_duty: true,
    bariatric_handling: true,
    created_at: '2025-02-01 10:00:00',
    updated_at: '2025-05-11 09:40:11',
    available_beds: 5,
    total_beds: 30,
    distance_miles: 2.4,
    package_tier: 'Enhanced',
    room_type: 'High-Dependency Single Room',
    specialist_on_call: true
  },
  {
    care_home_id: 'CH-OXFORD-SPECIALIST-03',
    care_home_name: 'Oxford Manor Dementia & Cardiac Care Lodge',
    care_unit_id: 'CU-MEMORY-HIGHCARE-1A',
    postal_code: 'OX3 9DU',
    mobility_status: ['Wheelchair Bound', 'Assisted Stand', 'Walking Frame'],
    wheelchair_accessible: true,
    washroom_assistance: true,
    feeding_assistance: true,
    oxygen_cylinder: false,
    bp_monitoring: true,
    diabetic_care: true,
    bladder_control: false,
    bowel_control: false,
    food_allergies: ['Lactose/Dairy'],
    food_record: 'Nutrient-dense pureed diet with daily hydration tracking chart.',
    dementia_care: true,
    falls_risk_support: true,
    nurse_on_duty: true,
    bariatric_handling: false,
    created_at: '2025-02-14 11:20:00',
    updated_at: '2025-05-08 16:30:00',
    available_beds: 2,
    total_beds: 18,
    distance_miles: 4.1,
    package_tier: 'Premier',
    room_type: 'En-Suite Private Suite',
    specialist_on_call: true
  },
  {
    care_home_id: 'CH-MANCHESTER-CENTRAL-04',
    care_home_name: 'Manchester Central Post-Acute & Rehabilitation Home',
    care_unit_id: 'CU-REHAB-ACUTE-3C',
    postal_code: 'M13 9WL',
    mobility_status: ['Assisted Stand', 'Walking Stick Support', 'Independent'],
    wheelchair_accessible: true,
    washroom_assistance: false,
    feeding_assistance: false,
    oxygen_cylinder: false,
    bp_monitoring: true,
    diabetic_care: false,
    bladder_control: true,
    bowel_control: true,
    food_allergies: ['Gluten'],
    food_record: 'Standard diabetic meal plan, low glycaemic index.',
    dementia_care: false,
    falls_risk_support: true,
    nurse_on_duty: true,
    bariatric_handling: false,
    created_at: '2025-03-01 09:15:00',
    updated_at: '2025-05-02 12:00:00',
    available_beds: 6,
    total_beds: 35,
    distance_miles: 1.2,
    package_tier: 'Standard',
    room_type: 'High-Dependency Single Room',
    specialist_on_call: false
  },
  {
    care_home_id: 'CH-BIRMINGHAM-COMPREHENSIVE-05',
    care_home_name: 'Birmingham Specialist Extensive Care Pavilion',
    care_unit_id: 'CU-BARIATRIC-EXT-5D',
    postal_code: 'B15 2TH',
    mobility_status: ['Wheelchair Bound', 'Assisted Stand', 'Bedbound', 'Two-Person Assistance'],
    wheelchair_accessible: true,
    washroom_assistance: true,
    feeding_assistance: true,
    oxygen_cylinder: true,
    bp_monitoring: true,
    diabetic_care: true,
    bladder_control: false,
    bowel_control: false,
    food_allergies: ['Soy', 'Eggs'],
    food_record: 'High protein wound healing protocol, thickened fluids level 1.',
    dementia_care: true,
    falls_risk_support: true,
    nurse_on_duty: true,
    bariatric_handling: true,
    created_at: '2025-03-20 14:00:00',
    updated_at: '2025-05-12 10:11:00',
    available_beds: 1,
    total_beds: 20,
    distance_miles: 8.5,
    package_tier: 'Premier',
    room_type: 'En-Suite Private Suite',
    specialist_on_call: true
  },
  {
    care_home_id: 'CH-EDINBURGH-ROYAL-06',
    care_home_name: 'Edinburgh Royal Transitional Care Wing',
    care_unit_id: 'CU-STEPDOWN-GEN-2B',
    postal_code: 'EH16 4SA',
    mobility_status: ['Walking Stick Support', 'Walking Frame'],
    wheelchair_accessible: false,
    washroom_assistance: false,
    feeding_assistance: false,
    oxygen_cylinder: false,
    bp_monitoring: false,
    diabetic_care: false,
    bladder_control: true,
    bowel_control: true,
    food_allergies: [],
    food_record: 'Unrestricted normal diet.',
    dementia_care: false,
    falls_risk_support: false,
    nurse_on_duty: false,
    bariatric_handling: false,
    created_at: '2025-04-01 08:00:00',
    updated_at: '2025-05-05 17:20:00',
    available_beds: 4,
    total_beds: 22,
    distance_miles: 6.8,
    package_tier: 'Standard',
    room_type: 'Companion Room',
    specialist_on_call: false
  }
];

export const INITIAL_STANDARD_FORM_DATA: StandardFormData = {
  // User references from Carebridge_Users.users
  selected_user_id: CAREBRIDGE_USERS_TABLE[0].user_id,
  selected_user_name: CAREBRIDGE_USERS_TABLE[0].full_name,
  authorizer_user_id: CAREBRIDGE_USERS_TABLE[1].user_id,
  authorizer_user_name: CAREBRIDGE_USERS_TABLE[1].full_name,

  // Table careconnect_uk.care_units fields
  care_home_id: CARECONNECT_UK_CARE_UNITS_RECORDS[0].care_home_id,
  care_unit_id: CARECONNECT_UK_CARE_UNITS_RECORDS[0].care_unit_id,
  postal_code: CARECONNECT_UK_CARE_UNITS_RECORDS[0].postal_code,
  mobility_status: ['Wheelchair Bound', 'Assisted Stand'],
  wheelchair_accessible: true,
  washroom_assistance: true,
  feeding_assistance: true,
  oxygen_cylinder: true,
  bp_monitoring: true,
  diabetic_care: true,
  bladder_control: false,
  bowel_control: false,
  food_allergies: ['Gluten'],
  food_record: 'Soft dysphagia diet, thickened liquids (level 2). Continuous telemetry during post-op recovery.',
  dementia_care: true,
  falls_risk_support: true,
  nurse_on_duty: true,
  bariatric_handling: false,
  created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
  updated_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
};

export const MOCK_EXTENSIVE_CARE_CASES: ExtensiveCarePatientCase[] = [
  {
    id: 'MECU-7701',
    patientName: 'Robert Jenkins',
    relation: 'Parent',
    unitWard: 'Medical Extensive Care Unit - Ward 4B (Acute Cardio-Pulmonary)',
    admissionType: 'High Dependency (HDU)',
    admittedAt: 'Yesterday, 14:30',
    attendingPhysician: 'Dr. Michael Chen, FANZCA (Chief Intensivist)',
    status: 'Critical - Stable',
    heartRate: 74,
    bloodPressure: '122/78',
    spo2: 98,
    respiratoryRate: 16,
    temperature: 36.8,
    bupaGuaranteeOfPayment: 'Approved ($0 Out of Pocket)'
  },
  {
    id: 'MECU-8824',
    patientName: 'Sarah Jenkins (Pre-Admission Registry)',
    relation: 'Primary Member',
    unitWard: 'Extensive Care Unit - Post-Op Neuro High Care',
    admissionType: 'Extensive Step-Down',
    admittedAt: 'Scheduled for Next Tuesday',
    attendingPhysician: 'Dr. Evelyn Vance, MD, FRACP',
    status: 'Under Observation',
    heartRate: 68,
    bloodPressure: '118/75',
    spo2: 99,
    respiratoryRate: 14,
    temperature: 36.6,
    bupaGuaranteeOfPayment: 'Pre-Authorized'
  }
];

export const MOCK_TELEMETRY_SERIES: TelemetryPoint[] = [
  { time: '08:00', hr: 78, spo2: 97, bpSystolic: 125 },
  { time: '10:00', hr: 75, spo2: 98, bpSystolic: 122 },
  { time: '12:00', hr: 82, spo2: 96, bpSystolic: 128 },
  { time: '14:00', hr: 74, spo2: 98, bpSystolic: 120 },
  { time: '16:00', hr: 71, spo2: 99, bpSystolic: 119 },
  { time: '18:00', hr: 74, spo2: 98, bpSystolic: 122 },
  { time: '20:00', hr: 73, spo2: 98, bpSystolic: 121 },
];

export const MOCK_CARE_SERVICES: CareServiceOffering[] = [
  {
    id: 'care-1',
    title: 'Bupa Home Care & Nurse Visiting Support',
    category: 'Home Nursing',
    description: 'Post-hospital discharge nursing, IV therapy, wound management, and medication administration in the comfort of your home.',
    availability: 'Available 24/7 across network',
    rating: 4.9,
    bupaCoverLevel: '100% Covered under Comprehensive Tier'
  },
  {
    id: 'care-2',
    title: 'Aged Care & Assisted Living Placements',
    category: 'Aged Care & Assisted Living',
    description: 'Dedicated residential aged care suites, memory support neighborhoods, respite accommodation, and allied health rehabilitation.',
    availability: 'Priority placement for Bupa members',
    rating: 4.8,
    bupaCoverLevel: 'Co-funded with specialized allowance'
  },
  {
    id: 'care-3',
    title: 'Specialized Post-Operative Rehabilitation',
    category: 'Post-Operative Rehabilitation',
    description: 'Inpatient and outpatient physical therapy regimens designed for rapid, safe recovery after major cardiac or orthopedic surgery.',
    availability: 'Next-day intake available',
    rating: 4.9,
    bupaCoverLevel: 'Direct billing to Bupa Hospital Policy'
  }
];
