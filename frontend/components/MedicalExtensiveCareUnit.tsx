import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  UserPlus, 
  Bed, 
  RefreshCw,
  FileCheck2,
  FileUp,
  Calendar,
  Building2,
  MapPin
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ExtensiveCarePatientCase, TelemetryPoint, ReleaseSubmissionRecord } from '../types';
import { MOCK_EXTENSIVE_CARE_CASES, MOCK_TELEMETRY_SERIES } from '../constants';
import { triageExtensiveCareRequest, ClinicalTriageAssessment } from '../services/geminiService';
import { ReleaseFormIntake } from './ReleaseFormIntake';

interface MedicalExtensiveCareUnitProps {
  onBackToHome: () => void;
}

export const MedicalExtensiveCareUnit: React.FC<MedicalExtensiveCareUnitProps> = ({ onBackToHome }) => {
  const [activeMecuTab, setActiveMecuTab] = useState<'authorization-form' | 'ward-telemetry'>('authorization-form');
  const [releaseSubmission, setReleaseSubmission] = useState<ReleaseSubmissionRecord | null>(null);

  const [cases, setCases] = useState<ExtensiveCarePatientCase[]>(MOCK_EXTENSIVE_CARE_CASES);
  const [selectedCase, setSelectedCase] = useState<ExtensiveCarePatientCase>(cases[0]);
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>(MOCK_TELEMETRY_SERIES);
  
  // Triage state
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [triageInput, setTriageInput] = useState('');
  const [isTriaging, setIsTriaging] = useState(false);
  const [triageResult, setTriageResult] = useState<ClinicalTriageAssessment | null>(null);

  // Admission form state
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientRelation, setNewPatientRelation] = useState<'Primary Member' | 'Spouse' | 'Parent' | 'Child'>('Parent');
  const [newWard, setNewWard] = useState('Medical Extensive Care Unit - Ward 2A (Cardiac Telemetry)');

  const handleSimulateVitalsUpdate = () => {
    const newHr = Math.floor(70 + Math.random() * 12);
    const newSpo2 = Math.min(100, Math.floor(97 + Math.random() * 3));
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTelemetry((prev) => [...prev.slice(1), { time: now, hr: newHr, spo2: newSpo2, bpSystolic: 120 + Math.floor(Math.random() * 6) }]);
    setSelectedCase((prev) => ({
      ...prev,
      heartRate: newHr,
      spo2: newSpo2
    }));
  };

  const handleRunTriage = async () => {
    if (!triageInput.trim()) return;
    setIsTriaging(true);
    try {
      const result = await triageExtensiveCareRequest(triageInput);
      setTriageResult(result);
    } catch (err) {
      console.error(err);
      alert('Triage assessment service unavailable. Please contact the on-duty MECU desk immediately.');
    } finally {
      setIsTriaging(false);
    }
  };

  const handleReleaseFormCompleted = (record: ReleaseSubmissionRecord) => {
    setReleaseSubmission(record);
    setActiveMecuTab('ward-telemetry');
  };

  const handleAddAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName) return;
    const newCase: ExtensiveCarePatientCase = {
      id: `MECU-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: newPatientName,
      relation: newPatientRelation,
      unitWard: newWard,
      admissionType: 'High Dependency (HDU)',
      admittedAt: 'Just admitted (Registration Completed)',
      attendingPhysician: 'Dr. Katherine Miller, FRACP (Intensive Liaison)',
      status: 'Under Observation',
      heartRate: 76,
      bloodPressure: '120/80',
      spo2: 98,
      respiratoryRate: 15,
      temperature: 36.7,
      bupaGuaranteeOfPayment: 'Approved ($0 Out of Pocket)'
    };
    setCases([newCase, ...cases]);
    setSelectedCase(newCase);
    setShowAdmissionModal(false);
    setNewPatientName('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-bupa-600 hover:text-bupa-800 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to My Bupa Home</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-bupa-500 text-white rounded-2xl shadow-md">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Medical Extensive Care Unit (MECU)
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Step-by-step admission period dates, release authorization, matched care home vacancies &amp; ward telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Switch between Authorization Form and Telemetry Dashboard */}
        <div className="flex items-center gap-2 p-1 bg-slate-200/80 rounded-2xl">
          <button
            onClick={() => setActiveMecuTab('authorization-form')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMecuTab === 'authorization-form'
                ? 'bg-white text-bupa-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-bupa-600" />
            <span>Release Authorization {releaseSubmission && '✓'}</span>
          </button>

          <button
            onClick={() => setActiveMecuTab('ward-telemetry')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMecuTab === 'ward-telemetry'
                ? 'bg-white text-bupa-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-bupa-600" />
            <span>Ward &amp; Telemetry Feed</span>
          </button>
        </div>
      </div>

      {/* Active Submission Summary Badge */}
      {releaseSubmission && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs animate-fadeIn shadow-sm">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-950 text-sm">
                  Authorization #{releaseSubmission.submissionId} Approved
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono text-[10px] font-bold">
                  $0 Out-of-Pocket
                </span>
              </div>

              <div className="text-emerald-700 text-xs flex flex-wrap items-center gap-2 mt-1">
                <span className="flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  Period: {releaseSubmission.startDate} to {releaseSubmission.endDate} ({releaseSubmission.durationDays} days)
                </span>
                <span>•</span>
                {releaseSubmission.selectedCareHome && (
                  <span className="flex items-center gap-1 font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    Care Home: {releaseSubmission.selectedCareHome.care_home_name || releaseSubmission.selectedCareHome.care_home_id}
                  </span>
                )}
                <span>•</span>
                <span>
                  Method: {releaseSubmission.selectedOption === 'upload' ? 'Uploaded Release Form' : 'Standard Form (care_units)'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveMecuTab('authorization-form')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 bg-white border border-emerald-200 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
          >
            Modify Preferences / Care Period
          </button>
        </div>
      )}

      {/* VIEW 1: MANDATORY STEP-BY-STEP PROGRESSIVE INTAKE & PREFERENCES */}
      {activeMecuTab === 'authorization-form' && (
        <ReleaseFormIntake
          onComplete={handleReleaseFormCompleted}
          existingSubmission={releaseSubmission}
        />
      )}

      {/* VIEW 2: WARD TELEMETRY & CLINICAL MONITORING */}
      {activeMecuTab === 'ward-telemetry' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Quick AI Clinical Triage Header Drawer Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Need urgent clinical triage evaluation?</h3>
              <p className="text-xs text-slate-500">Run an instant assessment on symptoms and hospital transfer readiness.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTriageOpen(!isTriageOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-bupa-700 bg-bupa-50 hover:bg-bupa-100 border border-bupa-200 rounded-xl transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-bupa-500" />
                <span>{isTriageOpen ? 'Close AI Advisor' : 'AI Clinical Triage Advisor'}</span>
              </button>
              <button
                onClick={() => setShowAdmissionModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-bupa-600 hover:bg-bupa-700 rounded-xl shadow-sm transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Admit / Transfer Patient</span>
              </button>
            </div>
          </div>

          {/* AI Triage Panel Drawer (When Activated) */}
          {isTriageOpen && (
            <div className="bg-gradient-to-br from-bupa-900 to-bupa-800 text-white rounded-3xl p-6 shadow-xl border border-bupa-700 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-bupa-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-bupa-400" />
                  <h3 className="font-bold text-base">Bupa MECU Smart Clinical Triage</h3>
                </div>
                <button 
                  onClick={() => setIsTriageOpen(false)}
                  className="text-xs text-bupa-300 hover:text-white"
                >
                  Close Triage
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-bupa-200 uppercase tracking-wider mb-2">
                    Describe patient clinical state, vitals, or transfer diagnosis:
                  </label>
                  <textarea
                    value={triageInput}
                    onChange={(e) => setTriageInput(e.target.value)}
                    rows={3}
                    placeholder="e.g. 72yo male, post-CABG day 2 with sudden SpO2 drop to 91% on room air, tachycardia 115bpm, needs high dependency transfer..."
                    className="w-full bg-bupa-950/80 border border-bupa-600 rounded-xl p-3 text-xs text-white placeholder:text-bupa-400 focus:outline-none focus:border-bupa-400 font-sans"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[11px] text-bupa-300">
                      Real-time protocol matching against Bupa Diamond Hospital Guidelines.
                    </span>
                    <button
                      onClick={handleRunTriage}
                      disabled={isTriaging || !triageInput.trim()}
                      className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-xs disabled:opacity-50 transition-all"
                    >
                      {isTriaging ? 'Evaluating Acuity...' : 'Analyze Triage Acuity'}
                    </button>
                  </div>
                </div>

                {triageResult ? (
                  <div className="bg-bupa-950/90 rounded-2xl p-4 border border-bupa-600 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 uppercase tracking-wider font-mono">
                        Triage Output
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 rounded-full font-bold">
                        {triageResult.urgencyLevel}
                      </span>
                    </div>
                    <div className="text-white font-semibold">{triageResult.recommendedUnit}</div>
                    <p className="text-bupa-200 leading-relaxed">{triageResult.clinicalSummary}</p>
                    
                    <div className="pt-2 border-t border-bupa-800">
                      <span className="text-bupa-300 font-bold block mb-1">Recommended Interventions:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-bupa-100">
                        {triageResult.suggestedInterventions.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-[11px] text-emerald-300 font-mono pt-1">
                      ✓ {triageResult.bupaCoverageNote}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 border border-dashed border-bupa-700 rounded-2xl text-center text-bupa-300 text-xs">
                    <Stethoscope className="w-8 h-8 text-bupa-400 mb-2" />
                    <span>Enter clinical observations to get immediate admission recommendations &amp; unit assignment.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Patient Case Selector Tabs */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-bupa-600" />
                Enrolled Family &amp; Dependent Cases in Extensive Care
              </span>
              <span className="text-xs font-mono text-emerald-600 font-bold">
                All cases 100% pre-authorized
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cases.map((patientCase) => {
                const isSelected = selectedCase.id === patientCase.id;
                return (
                  <div
                    key={patientCase.id}
                    onClick={() => setSelectedCase(patientCase)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-bupa-500 bg-bupa-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{patientCase.patientName}</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {patientCase.relation}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        patientCase.status.includes('Critical') 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {patientCase.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {patientCase.unitWard}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <span className="font-mono text-bupa-600 font-semibold">
                        Case #{patientCase.id}
                      </span>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {patientCase.bupaGuaranteeOfPayment}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Extensive Care Monitor Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Live Telemetry & Clinical Vitals */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <span className="text-[11px] font-semibold uppercase text-slate-400 font-mono">Heart Rate</span>
                  <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-1">
                    <span>{selectedCase.heartRate}</span>
                    <span className="text-xs text-slate-500 font-normal">bpm</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">Normal Sinus Rhythm</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <span className="text-[11px] font-semibold uppercase text-slate-400 font-mono">Blood Pressure</span>
                  <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-1">
                    <span>{selectedCase.bloodPressure}</span>
                    <span className="text-xs text-slate-500 font-normal">mmHg</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">Target MAP Maintained</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <span className="text-[11px] font-semibold uppercase text-slate-400 font-mono">Pulse Oximetry</span>
                  <div className="text-2xl font-black text-bupa-600 mt-1 flex items-baseline gap-1">
                    <span>{selectedCase.spo2}%</span>
                    <span className="text-xs text-slate-500 font-normal">SpO2</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">Room Air Oxygenation</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <span className="text-[11px] font-semibold uppercase text-slate-400 font-mono">Temperature</span>
                  <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-1">
                    <span>{selectedCase.temperature}°</span>
                    <span className="text-xs text-slate-500 font-normal">C</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">Afebrile</span>
                </div>
              </div>

              {/* Real-time Telemetry Trend Chart */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <Activity className="w-5 h-5 text-bupa-500" />
                      <span>Continuous Extensive Care Telemetry Feed</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Synchronized with Medical Extensive Care High-Dependency Ward
                    </p>
                  </div>

                  <button
                    onClick={handleSimulateVitalsUpdate}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Simulate Beat</span>
                  </button>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0079C8" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0079C8" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                      <YAxis domain={[50, 110]} stroke="#94a3b8" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#002240', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                        itemStyle={{ color: '#bae6fd' }}
                      />
                      <Area type="monotone" dataKey="hr" stroke="#0079C8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHr)" name="Heart Rate (BPM)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Live Ward Telemetry Link Active
                  </span>
                  <span>Updated: Real-time 1000Hz</span>
                </div>
              </div>
            </div>

            {/* Right Col: Ward Admission Info & Intensivist Direct Liaison */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-bupa-500" />
                  <span>Attending Clinical Leadership</span>
                </h3>

                <div className="p-4 rounded-2xl bg-bupa-50/70 border border-bupa-100">
                  <div className="text-xs text-bupa-600 font-semibold uppercase font-mono">
                    Attending Intensivist
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {selectedCase.attendingPhysician}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Medical Extensive Care Unit Director
                  </div>
                  <div className="mt-3 pt-3 border-t border-bupa-200/60 flex items-center gap-2">
                    <a
                      href="tel:18002872"
                      className="flex-1 text-center py-2 bg-bupa-600 hover:bg-bupa-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                    >
                      Request Doctor Call
                    </a>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-400">Assigned Ward:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[180px]">
                      {selectedCase.unitWard}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-400">Care Acuity:</span>
                    <span className="font-semibold text-bupa-700">{selectedCase.admissionType}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-400">Admission Timestamp:</span>
                    <span className="font-semibold text-slate-800">{selectedCase.admittedAt}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Bupa GOP Settlement:</span>
                    <span className="font-bold text-emerald-600">{selectedCase.bupaGuaranteeOfPayment}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Hotline */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl p-5 shadow-lg space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-white animate-bounce" />
                  <h4 className="font-bold text-sm">Urgent Hospital Transfer or ICU Bed Dispatch</h4>
                </div>
                <p className="text-xs text-red-100 leading-relaxed">
                  If an in-home patient requires immediate intensive care transfer or high dependency bed pre-allocation, call the MECU command desk directly.
                </p>
                <a
                  href="tel:000"
                  className="block w-full text-center py-2.5 bg-white text-red-700 font-extrabold text-xs rounded-xl shadow hover:bg-red-50 transition-colors"
                >
                  Emergency Dispatch (1800 2872 999)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Patient Admission Modal */}
      {showAdmissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Admit Patient to Medical Extensive Care Unit
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Registers a dependent or family member into Bupa's pre-cleared extensive care ward bed.
            </p>

            <form onSubmit={handleAddAdmission} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g. Thomas Jenkins"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-bupa-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Relationship to Member
                </label>
                <select
                  value={newPatientRelation}
                  onChange={(e) => setNewPatientRelation(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-bupa-500"
                >
                  <option value="Primary Member">Primary Member</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Target Extensive Care Unit Ward
                </label>
                <select
                  value={newWard}
                  onChange={(e) => setNewWard(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-bupa-500"
                >
                  <option value="Medical Extensive Care Unit - Ward 2A (Cardiac Telemetry)">
                    MECU - Ward 2A (Cardiac Telemetry &amp; Acute)
                  </option>
                  <option value="Medical Extensive Care Unit - Ward 4B (Acute Cardio-Pulmonary)">
                    MECU - Ward 4B (Acute Cardio-Pulmonary)
                  </option>
                  <option value="Extensive Care Unit - Post-Op Neuro High Care">
                    MECU - Post-Op Neuro High Dependency
                  </option>
                </select>
              </div>

              <div className="p-3 bg-bupa-50 text-bupa-700 text-xs rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Bupa Guarantee of Payment applies automatically ($0 out of pocket).</span>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAdmissionModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-bupa-600 hover:bg-bupa-700 text-white rounded-xl text-xs font-bold shadow-md shadow-bupa-600/20"
                >
                  Confirm MECU Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
