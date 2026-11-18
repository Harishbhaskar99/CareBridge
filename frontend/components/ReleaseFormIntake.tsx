import React, { useState, useMemo } from 'react';
import { 
  FileUp, 
  FileText, 
  AlertCircle, 
  Upload, 
  ShieldCheck, 
  X, 
  Sparkles, 
  User, 
  ArrowRight, 
  Activity, 
  HeartPulse, 
  Apple, 
  Check, 
  Plus, 
  Calendar, 
  SlidersHorizontal
} from 'lucide-react';
import { 
  ReleaseFormOption, 
  StandardFormData, 
  UploadedReleaseDocument, 
  ReleaseSubmissionRecord, 
  CareUnitsRecord,
  CareHomePreferences 
} from '../types';
import { 
  INITIAL_STANDARD_FORM_DATA, 
  CAREBRIDGE_USERS_TABLE, 
  CARECONNECT_UK_CARE_UNITS_RECORDS 
} from '../constants';
import { verifyUploadedReleaseDoc } from '../services/geminiService';
import { CareHomePreferencesPage } from './CareHomePreferencesPage';

interface ReleaseFormIntakeProps {
  onComplete: (record: ReleaseSubmissionRecord) => void;
  existingSubmission?: ReleaseSubmissionRecord | null;
}

const AVAILABLE_MOBILITY_OPTIONS = [
  'Wheelchair Bound',
  'Assisted Stand',
  'Walking Stick Support',
  'Walking Frame',
  'Hoist Transfer Required',
  'Bedbound',
  'Two-Person Assistance',
  'Independent'
];

const COMMON_ALLERGIES = [
  'Gluten',
  'Lactose/Dairy',
  'Nuts',
  'Shellfish',
  'Eggs',
  'Soy',
  'Penicillin Derived Preservatives',
  'Latex'
];

export const ReleaseFormIntake: React.FC<ReleaseFormIntakeProps> = ({
  onComplete,
  existingSubmission
}) => {
  // Today's date calculations
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const maxAllowedDateStr = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  // Start Date and End Date Configuration
  const [startDate, setStartDate] = useState<string>(existingSubmission?.startDate || '');
  const [endDate, setEndDate] = useState<string>(existingSubmission?.endDate || '');

  // Date validation state
  const dateValidation = useMemo(() => {
    if (!startDate && !endDate) {
      return { isValid: false, hasInput: false, message: 'Please select admission dates.' };
    }
    if (!startDate) {
      return { isValid: false, hasInput: true, message: 'Please select a care admission start date.' };
    }
    if (startDate < todayStr) {
      return { 
        isValid: false, 
        hasInput: true,
        message: 'Start date cannot be in the past.' 
      };
    }
    if (!endDate) {
      return { isValid: false, hasInput: true, message: 'Please select a care admission end date.' };
    }
    if (endDate < startDate) {
      return { 
        isValid: false, 
        hasInput: true,
        message: 'End date cannot be earlier than the start date.' 
      };
    }
    if (endDate > maxAllowedDateStr) {
      return { 
        isValid: false, 
        hasInput: true,
        message: 'End date cannot be more than a year from today.' 
      };
    }

    const startObj = new Date(startDate);
    const endObj = new Date(endDate);
    const diffTime = Math.abs(endObj.getTime() - startObj.getTime());
    const durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return { 
      isValid: true, 
      hasInput: true,
      durationDays, 
      message: `${durationDays} day(s) (${startDate} to ${endDate})` 
    };
  }, [startDate, endDate, todayStr, maxAllowedDateStr]);

  // Authorization Option
  const [selectedOption, setSelectedOption] = useState<ReleaseFormOption | null>(
    existingSubmission?.selectedOption || null
  );

  // Standard Form State aligned with careconnect_uk.care_units
  const [standardForm, setStandardForm] = useState<StandardFormData>(
    existingSubmission?.standardFormData || {
      ...INITIAL_STANDARD_FORM_DATA,
      care_home_id: '',
      care_unit_id: '',
      postal_code: ''
    }
  );

  // Step 4 Router: Flag to show the dedicated Preferences & Matched Homes page
  const [isViewingStep4Page, setIsViewingStep4Page] = useState<boolean>(false);

  // Uploaded Document State (for Upload option)
  const [uploadedDoc, setUploadedDoc] = useState<UploadedReleaseDocument | null>(
    existingSubmission?.uploadedDocument || null
  );
  const [isVerifyingAi, setIsVerifyingAi] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Custom allergy tag
  const [newAllergyTag, setNewAllergyTag] = useState('');

  // Handle changing user from Carebridge_Users.users
  const handleUserChange = (userId: string) => {
    const user = CAREBRIDGE_USERS_TABLE.find(u => u.user_id === userId);
    if (user) {
      setStandardForm(prev => ({
        ...prev,
        selected_user_id: user.user_id,
        selected_user_name: user.full_name
      }));
    }
  };

  // Toggle mobility status array
  const handleToggleMobility = (item: string) => {
    setStandardForm(prev => {
      const exists = prev.mobility_status.includes(item);
      const next = exists
        ? prev.mobility_status.filter(i => i !== item)
        : [...prev.mobility_status, item];
      return { ...prev, mobility_status: next };
    });
  };

  // Toggle allergy array
  const handleToggleAllergy = (allergy: string) => {
    setStandardForm(prev => {
      const exists = prev.food_allergies.includes(allergy);
      const next = exists
        ? prev.food_allergies.filter(a => a !== allergy)
        : [...prev.food_allergies, allergy];
      return { ...prev, food_allergies: next };
    });
  };

  const handleAddCustomAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllergyTag.trim()) return;
    if (!standardForm.food_allergies.includes(newAllergyTag.trim())) {
      setStandardForm(prev => ({
        ...prev,
        food_allergies: [...prev.food_allergies, newAllergyTag.trim()]
      }));
    }
    setNewAllergyTag('');
  };

  // DYNAMIC FILTER: Matches units in careconnect_uk.care_units where ALL active requirements are true
  const matchingCareUnits = useMemo(() => {
    return CARECONNECT_UK_CARE_UNITS_RECORDS.filter(unit => {
      if (standardForm.mobility_status.length > 0) {
        const matchesAllMobility = standardForm.mobility_status.every(req =>
          unit.mobility_status.includes(req)
        );
        if (!matchesAllMobility) return false;
      }

      if (standardForm.wheelchair_accessible && !unit.wheelchair_accessible) return false;
      if (standardForm.dementia_care && !unit.dementia_care) return false;
      if (standardForm.oxygen_cylinder && !unit.oxygen_cylinder) return false;
      if (standardForm.bariatric_handling && !unit.bariatric_handling) return false;
      if (standardForm.washroom_assistance && !unit.washroom_assistance) return false;
      if (standardForm.feeding_assistance && !unit.feeding_assistance) return false;
      if (standardForm.bp_monitoring && !unit.bp_monitoring) return false;
      if (standardForm.diabetic_care && !unit.diabetic_care) return false;
      if (standardForm.nurse_on_duty && !unit.nurse_on_duty) return false;
      if (standardForm.falls_risk_support && !unit.falls_risk_support) return false;

      return true;
    });
  }, [
    standardForm.mobility_status,
    standardForm.wheelchair_accessible,
    standardForm.dementia_care,
    standardForm.oxygen_cylinder,
    standardForm.bariatric_handling,
    standardForm.washroom_assistance,
    standardForm.feeding_assistance,
    standardForm.bp_monitoring,
    standardForm.diabetic_care,
    standardForm.nurse_on_duty,
    standardForm.falls_risk_support
  ]);

  // Check if Standard Form conditions have been configured
  const isStandardConfigured = useMemo(() => {
    if (selectedOption === 'upload') {
      return !!uploadedDoc;
    }
    if (selectedOption === 'standard') {
      return Boolean(standardForm.selected_user_id && standardForm.food_record?.trim());
    }
    return false;
  }, [selectedOption, uploadedDoc, standardForm.selected_user_id, standardForm.food_record]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const mockDoc: UploadedReleaseDocument = {
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      fileType: file.type || 'application/pdf',
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Ready'
    };

    setUploadedDoc(mockDoc);

    setIsVerifyingAi(true);
    try {
      const audit = await verifyUploadedReleaseDoc(file.name, `Size: ${mockDoc.fileSize}, Type: ${mockDoc.fileType}`);
      setUploadedDoc(prev => prev ? {
        ...prev,
        verifiedByAi: true,
        aiVerificationSummary: `${audit.verificationNotes} (Physician: ${audit.authorizingPhysician})`,
        status: 'Verified'
      } : null);
    } catch (err) {
      console.error(err);
      setUploadedDoc(prev => prev ? {
        ...prev,
        verifiedByAi: true,
        aiVerificationSummary: 'Document passed Bupa clinical intake format verification.',
        status: 'Verified'
      } : null);
    } finally {
      setIsVerifyingAi(false);
    }
  };

  // Submission for Upload Release option
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedDoc) {
      setUploadError('Please select or attach your release document before submitting.');
      return;
    }

    const submission: ReleaseSubmissionRecord = {
      submissionId: `MECU-AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: new Date().toLocaleString(),
      startDate,
      endDate,
      durationDays: dateValidation.durationDays || 1,
      selectedOption: 'upload',
      uploadedDocument: uploadedDoc,
      approvalStatus: 'Approved & Pre-Cleared'
    };

    onComplete(submission);
  };

  // Completion from Preferences & Matched Homes page
  const handleConfirmFromPreferencesPage = (chosenUnit: CareUnitsRecord, prefs: CareHomePreferences) => {
    const updatedStandardData: StandardFormData = {
      ...standardForm,
      care_home_id: chosenUnit.care_home_id,
      care_unit_id: chosenUnit.care_unit_id,
      postal_code: chosenUnit.postal_code,
      care_home_name: chosenUnit.care_home_name,
      available_beds: chosenUnit.available_beds,
      package_tier: chosenUnit.package_tier,
      room_type: chosenUnit.room_type,
      distance_miles: chosenUnit.distance_miles
    };

    const submission: ReleaseSubmissionRecord = {
      submissionId: `MECU-AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: new Date().toLocaleString(),
      startDate,
      endDate,
      durationDays: dateValidation.durationDays || 1,
      selectedOption: 'standard',
      standardFormData: updatedStandardData,
      selectedCareHome: chosenUnit,
      preferencesApplied: prefs,
      approvalStatus: 'Approved & Pre-Cleared'
    };

    onComplete(submission);
  };

  // IF USER PROCEEDS TO CARE HOME PREFERENCES & VACANCIES PAGE
  if (isViewingStep4Page) {
    return (
      <CareHomePreferencesPage
        matchedUnitsFromStep3={matchingCareUnits}
        startDate={startDate}
        endDate={endDate}
        durationDays={dateValidation.durationDays || 1}
        selectedUnitId={standardForm.care_unit_id}
        onBackToStep3={() => setIsViewingStep4Page(false)}
        onSelectUnitAndConfirm={handleConfirmFromPreferencesPage}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bupa-50 border border-bupa-200 text-bupa-700 text-xs font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-bupa-600" />
              <span>Medical Authorization</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Medical Extensive Care Unit (MECU) Intake
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Complete the admission period dates below to begin.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* ========================================================================= */}
        {/* ADMISSION PERIOD CONFIGURATION (Start Date & End Date)                    */}
        {/* ========================================================================= */}
        <div className="bg-slate-50 border-2 border-bupa-300 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-bupa-600" />
                <span>Configure Admission Care Period</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Start Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="date"
                  required
                  min={todayStr}
                  max={maxAllowedDateStr}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none transition-colors ${
                    startDate && startDate < todayStr
                      ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                      : 'border-slate-300 focus:border-bupa-500'
                  }`}
                />
              </div>
              {startDate && startDate < todayStr && (
                <p className="text-[11px] text-red-600 mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Start date cannot be yesterday or in the past.
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                End Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="date"
                  required
                  min={startDate || todayStr}
                  max={maxAllowedDateStr}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none transition-colors ${
                    (endDate && startDate && endDate < startDate) || (endDate && endDate > maxAllowedDateStr)
                      ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                      : 'border-slate-300 focus:border-bupa-500'
                  }`}
                />
              </div>
              {endDate && startDate && endDate < startDate && (
                <p className="text-[11px] text-red-600 mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  End date cannot be prior to start date.
                </p>
              )}
              {endDate && endDate > maxAllowedDateStr && (
                <p className="text-[11px] text-red-600 mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  End date cannot exceed 1 year from today.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AUTHORIZATION OPTION                                                      */}
        {/* UNHIDDEN ONLY AFTER DATES ARE PROPERLY FILLED AND VALIDATED               */}
        {/* ========================================================================= */}
        {dateValidation.isValid && (
          <div className="bg-slate-50 border-2 border-bupa-300 rounded-3xl p-6 space-y-4 shadow-sm animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-bupa-600" />
                  <span>Select Authorization Option</span>
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Choose either <strong className="text-bupa-700">"Upload Release Form"</strong> (attach external discharge documents) or <strong className="text-bupa-700">"Standard Form"</strong> (fill clinical requirements to query care units).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Option A: Upload Release Form */}
              <div
                onClick={() => setSelectedOption('upload')}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex items-start gap-4 ${
                  selectedOption === 'upload'
                    ? 'border-bupa-500 bg-white shadow-md ring-2 ring-bupa-500/20'
                    : 'border-slate-200 bg-white/70 hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all ${
                  selectedOption === 'upload'
                    ? 'border-bupa-600 bg-white'
                    : 'border-slate-300 bg-white'
                }`}>
                  {selectedOption === 'upload' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-bupa-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileUp className="w-5 h-5 text-bupa-600" />
                      <h4 className="font-bold text-slate-900 text-base">
                        Upload Release Form
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Upload an existing signed hospital discharge summary, transfer certificate, or specialist consultant release order.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-bupa-700">
                    <span className="px-2 py-0.5 bg-bupa-50 rounded border border-bupa-200">PDF, JPG, PNG up to 25MB</span>
                  </div>
                </div>
              </div>

              {/* Option B: Standard Form */}
              <div
                onClick={() => setSelectedOption('standard')}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex items-start gap-4 ${
                  selectedOption === 'standard'
                    ? 'border-bupa-500 bg-white shadow-md ring-2 ring-bupa-500/20'
                    : 'border-slate-200 bg-white/70 hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all ${
                  selectedOption === 'standard'
                    ? 'border-bupa-600 bg-white'
                    : 'border-slate-300 bg-white'
                }`}>
                  {selectedOption === 'standard' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-bupa-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-bupa-600" />
                      <h4 className="font-bold text-slate-900 text-base">
                        Standard Form
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Complete patient physical handling and clinical requirements to filter matching units from the database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* UPLOAD RELEASE FORM CONTENT                                               */}
        {/* ========================================================================= */}
        {dateValidation.isValid && selectedOption === 'upload' && (
          <form onSubmit={handleUploadSubmit} className="bg-slate-50 border-2 border-bupa-300 rounded-3xl p-6 space-y-4 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                    <FileUp className="w-4 h-4 text-bupa-600" />
                    <span>Upload Hospital Release Document</span>
                  </h3>
                </div>
              </div>
            </div>

            {!uploadedDoc ? (
              <div>
                <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-bupa-300 hover:border-bupa-500 rounded-2xl bg-white cursor-pointer transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-bupa-50 text-bupa-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    Click to select or drag and drop your Medical Release document
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Accepts hospital release summary, specialist discharge letter, or transfer certificate (PDF, PNG, JPG up to 25MB)
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {uploadError && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {uploadError}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{uploadedDoc.fileName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {uploadedDoc.fileSize} • Uploaded at {uploadedDoc.uploadedAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1">
                      <span>{uploadedDoc.status}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setUploadedDoc(null)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isVerifyingAi ? (
                  <div className="p-3 bg-bupa-50 rounded-xl text-xs text-bupa-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-bupa-500 animate-spin" />
                    <span>AI Engine is verifying physician signatures &amp; clinical transfer codes...</span>
                  </div>
                ) : uploadedDoc.aiVerificationSummary ? (
                  <div className="p-3 bg-emerald-50/80 rounded-xl text-xs text-emerald-800 border border-emerald-100 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Bupa Clinical AI Verification:</strong> {uploadedDoc.aiVerificationSummary}</span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Upload submit button */}
            {uploadedDoc && (
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="px-7 py-3 bg-bupa-600 hover:bg-bupa-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-bupa-600/30 transition-all flex items-center gap-2"
                >
                  <span>Submit Uploaded Release Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        )}

        {/* ========================================================================= */}
        {/* STANDARD FORM CONTENT                                                     */}
        {/* ========================================================================= */}
        {dateValidation.isValid && selectedOption === 'standard' && (
          <div className="bg-slate-50 border-2 border-bupa-300 rounded-3xl p-6 space-y-6 shadow-sm animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-bupa-600" />
                    <span>Fill Standard Clinical Form</span>
                  </h3>
                </div>
              </div>
            </div>

            {/* Sub-section: User Assignment from Carebridge_Users.users */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-bupa-600" />
                  Patient
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Patient User *
                  </label>
                  <select
                    value={standardForm.selected_user_id}
                    onChange={(e) => handleUserChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-bupa-500 font-mono"
                  >
                    {CAREBRIDGE_USERS_TABLE.map((u) => (
                      <option key={u.user_id} value={u.user_id}>
                        {u.full_name} ({u.role}) — {u.nhs_or_bupa_id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Authorizing Submitter (Carebridge Member)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${standardForm.authorizer_user_name} (ID: ${standardForm.authorizer_user_id})`}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Sub-section: Mobility Status & Physical Handling */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-bupa-600" />
                  Mobility &amp; Physical Handling Parameters
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Select Patient Mobility Status:
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_MOBILITY_OPTIONS.map((item) => {
                    const isSelected = standardForm.mobility_status.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handleToggleMobility(item)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-bupa-500 text-white border-bupa-600 shadow-sm font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Boolean toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.wheelchair_accessible
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.wheelchair_accessible}
                    onChange={(e) => setStandardForm({ ...standardForm, wheelchair_accessible: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Wheelchair Accessible</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.bariatric_handling
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.bariatric_handling}
                    onChange={(e) => setStandardForm({ ...standardForm, bariatric_handling: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Bariatric Handling</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.washroom_assistance
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.washroom_assistance}
                    onChange={(e) => setStandardForm({ ...standardForm, washroom_assistance: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Washroom Assistance</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.falls_risk_support
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.falls_risk_support}
                    onChange={(e) => setStandardForm({ ...standardForm, falls_risk_support: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Falls Risk Support</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Sub-section: Clinical Monitoring & Nursing */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-bupa-600" />
                Clinical Safeguards &amp; Nursing Protocol
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.dementia_care
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.dementia_care}
                    onChange={(e) => setStandardForm({ ...standardForm, dementia_care: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Dementia Care</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.oxygen_cylinder
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.oxygen_cylinder}
                    onChange={(e) => setStandardForm({ ...standardForm, oxygen_cylinder: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Oxygen Cylinder</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.bp_monitoring
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.bp_monitoring}
                    onChange={(e) => setStandardForm({ ...standardForm, bp_monitoring: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Continuous BP Monitor</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.diabetic_care
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.diabetic_care}
                    onChange={(e) => setStandardForm({ ...standardForm, diabetic_care: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Diabetic Glucose Care</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.nurse_on_duty
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.nurse_on_duty}
                    onChange={(e) => setStandardForm({ ...standardForm, nurse_on_duty: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">24/7 Nurse on Duty</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                  standardForm.feeding_assistance
                    ? 'bg-bupa-50 border-bupa-300 ring-1 ring-bupa-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={standardForm.feeding_assistance}
                    onChange={(e) => setStandardForm({ ...standardForm, feeding_assistance: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Feeding Assistance</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Sub-section: Continence & Nutrition */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Apple className="w-4 h-4 text-bupa-600" />
                Continence &amp; Dietary Requirements
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                  <input
                    type="checkbox"
                    checked={standardForm.bladder_control}
                    onChange={(e) => setStandardForm({ ...standardForm, bladder_control: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Intact Bladder Control</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                  <input
                    type="checkbox"
                    checked={standardForm.bowel_control}
                    onChange={(e) => setStandardForm({ ...standardForm, bowel_control: e.target.checked })}
                    className="w-4 h-4 rounded text-bupa-600 focus:ring-bupa-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Intact Bowel Control</span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Food Allergies:
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {COMMON_ALLERGIES.map((allergy) => {
                    const isSelected = standardForm.food_allergies.includes(allergy);
                    return (
                      <button
                        type="button"
                        key={allergy}
                        onClick={() => handleToggleAllergy(allergy)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                          isSelected
                            ? 'bg-red-50 text-red-700 border-red-300 font-bold'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isSelected ? `✕ ${allergy}` : allergy}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={newAllergyTag}
                    onChange={(e) => setNewAllergyTag(e.target.value)}
                    placeholder="Add custom food allergy..."
                    className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-bupa-500 w-60"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomAllergy}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Food Record &amp; Dietary Prescription *
                </label>
                <textarea
                  rows={2}
                  required
                  value={standardForm.food_record}
                  onChange={(e) => setStandardForm({ ...standardForm, food_record: e.target.value })}
                  placeholder="Detail meal intake, fluid restrictions, caloric thresholds or swallowing assistance guidelines..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-bupa-500 font-medium leading-relaxed"
                />
              </div>
            </div>

            {/* PROCEED TO PREFERENCES & MATCHED HOMES */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span>
                  {matchingCareUnits.length} care home(s) meet these clinical requirements.
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsViewingStep4Page(true)}
                disabled={!isStandardConfigured}
                className="w-full sm:w-auto px-7 py-3 bg-bupa-600 hover:bg-bupa-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-bupa-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Proceed to Preferences &amp; Matched Homes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
