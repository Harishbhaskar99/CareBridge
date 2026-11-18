export type ActivePortalView = 'home' | 'medical-extensive-care' | 'care-service';

export interface BupaMember {
  id: string;
  name: string;
  membershipNumber: string;
  planType: string;
  tier: 'Diamond Comprehensive' | 'Gold Hospital' | 'Silver Plus';
  validUntil: string;
  avatarUrl: string;
  dependentsCount: number;
  coverageStatus: 'Active - Full Hospital & Extensive Care Covered' | 'Active' | 'Review Required';
}

export interface ExtensiveCarePatientCase {
  id: string;
  patientName: string;
  relation: 'Primary Member' | 'Spouse' | 'Parent' | 'Child';
  unitWard: string;
  admissionType: 'High Dependency (HDU)' | 'Intensive Therapy (ITU)' | 'Acute Cardiac Care' | 'Extensive Step-Down';
  admittedAt: string;
  attendingPhysician: string;
  status: 'Critical - Stable' | 'Under Observation' | 'Discharge Pending';
  heartRate: number;
  bloodPressure: string;
  spo2: number;
  respiratoryRate: number;
  temperature: number;
  bupaGuaranteeOfPayment: 'Approved ($0 Out of Pocket)' | 'Pre-Authorized' | 'Processing';
}

export interface TelemetryPoint {
  time: string;
  hr: number;
  spo2: number;
  bpSystolic: number;
}

export interface CareServiceOffering {
  id: string;
  title: string;
  category: 'Home Nursing' | 'Aged Care & Assisted Living' | 'Post-Operative Rehabilitation' | 'Palliative Support';
  description: string;
  availability: string;
  rating: number;
  bupaCoverLevel: string;
}

export type ReleaseFormOption = 'upload' | 'standard';

/**
 * Models the Carebridge_Users.users table
 */
export interface CarebridgeUser {
  user_id: string;
  username: string;
  full_name: string;
  email: string;
  role: 'Patient' | 'Primary Member' | 'Authorizing Clinician' | 'Care Coordinator';
  nhs_or_bupa_id: string;
}

/**
 * Exactly maps to careconnect_uk.care_units table schema
 */
export interface CareUnitsRecord {
  // varchar(50) - PRI Key
  care_home_id: string;
  // varchar(25)
  care_unit_id: string;
  // varchar(15) - MUL
  postal_code: string;
  // json - Array of strings e.g. ["Bedbound", "Hoist Required"]
  mobility_status: string[];
  // tinyint(1) - MUL
  wheelchair_accessible: boolean;
  // tinyint(1)
  washroom_assistance: boolean;
  // tinyint(1)
  feeding_assistance: boolean;
  // tinyint(1) - MUL
  oxygen_cylinder: boolean;
  // tinyint(1)
  bp_monitoring: boolean;
  // tinyint(1)
  diabetic_care: boolean;
  // tinyint(1)
  bladder_control: boolean;
  // tinyint(1)
  bowel_control: boolean;
  // json - Array of allergy strings
  food_allergies: string[];
  // text
  food_record: string;
  // tinyint(1) - MUL
  dementia_care: boolean;
  // tinyint(1)
  falls_risk_support: boolean;
  // tinyint(1)
  nurse_on_duty: boolean;
  // tinyint(1)
  bariatric_handling: boolean;
  // timestamps
  created_at?: string;
  updated_at?: string;
  // Extended care home attributes for matching & vacancies
  care_home_name?: string;
  available_beds?: number;
  total_beds?: number;
  distance_miles?: number;
  package_tier?: 'Standard' | 'Enhanced' | 'Premier';
  room_type?: 'En-Suite Private Suite' | 'High-Dependency Single Room' | 'Companion Room';
  specialist_on_call?: boolean;
}

export type ProximityFilter = 'all' | '1' | '3' | '5' | '10';
export type AvailabilityPackageFilter = 'all' | 'Standard' | 'Enhanced' | 'Premier';
export type RoomTypeFilter = 'all' | 'En-Suite Private Suite' | 'High-Dependency Single Room';

export interface CareHomePreferences {
  proximity: ProximityFilter;
  availabilityPackage: AvailabilityPackageFilter;
  roomType: RoomTypeFilter;
  specialistOnCallOnly: boolean;
  minBedVacancy: number;
}

/**
 * Standard Form data combining careconnect_uk.care_units fields and Carebridge_Users.users
 */
export interface StandardFormData extends CareUnitsRecord {
  selected_user_id: string;
  selected_user_name: string;
  authorizer_user_id: string;
  authorizer_user_name: string;
}

export interface UploadedReleaseDocument {
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  verifiedByAi?: boolean;
  aiVerificationSummary?: string;
  status: 'Ready' | 'Verified' | 'Pending Review';
}

export interface ReleaseSubmissionRecord {
  submissionId: string;
  submittedAt: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  selectedOption: ReleaseFormOption;
  standardFormData?: StandardFormData;
  uploadedDocument?: UploadedReleaseDocument;
  approvalStatus: 'Approved & Pre-Cleared' | 'Under Fast-Track Clinical Review';
  selectedCareHome?: CareUnitsRecord;
  preferencesApplied?: CareHomePreferences;
}
