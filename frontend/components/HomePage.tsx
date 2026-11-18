import React from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  UserCheck, 
  Clock, 
  Sparkles, 
  Building2, 
  CalendarCheck,
  AlertCircle
} from 'lucide-react';
import { BupaMember, ActivePortalView } from '../types';

interface HomePageProps {
  member: BupaMember;
  onSelectOption: (option: ActivePortalView) => void;
  activeMecuCasesCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  member,
  onSelectOption,
  activeMecuCasesCount
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome & Member Status Banner */}
      <div className="bg-gradient-to-r from-bupa-700 via-bupa-600 to-bupa-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-bupa-100 border border-white/20 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{member.coverageStatus}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome to My Bupa, {member.name.split(' ')[0]}
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-bupa-100 max-w-2xl leading-relaxed">
              Your member health portal connects you directly to dedicated clinical teams, extensive acute care units, and personalized care services.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-xs font-mono space-y-1.5 self-start md:self-auto min-w-[240px]">
            <div className="text-bupa-200 text-[10px] uppercase font-bold tracking-wider">Member Details</div>
            <div className="text-white font-bold">{member.membershipNumber}</div>
            <div className="text-bupa-100">{member.planType}</div>
            <div className="text-emerald-300 font-semibold pt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Guarantee of Payment: Active
            </div>
          </div>
        </div>
      </div>

      {/* Core Selection Section - Medical Extensive Care Unit vs Care Service */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Please Select Your Service Portal
          </h2>
          <p className="text-sm text-slate-500">
            Choose between acute hospital-level extensive care monitoring or personalized community care services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* OPTION 1: Medical Extensive Care Unit */}
          <div 
            onClick={() => onSelectOption('medical-extensive-care')}
            className="group relative cursor-pointer bg-white rounded-3xl p-7 border-2 border-bupa-100 hover:border-bupa-500 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bupa-500 to-bupa-700 flex items-center justify-center text-white shadow-lg shadow-bupa-500/30 group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-8 h-8 animate-pulse text-white" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    High Acuity Clinical Unit
                  </span>
                  {activeMecuCasesCount > 0 && (
                    <span className="text-[10px] text-bupa-600 font-semibold mt-1">
                      {activeMecuCasesCount} Active Admission Logged
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-bupa-600 transition-colors flex items-center gap-2">
                <span>Medical Extensive Care Unit</span>
                <span className="text-xs font-mono text-slate-400">(MECU)</span>
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Direct access for intensive clinical monitoring, high-dependency ward coordination, 24/7 intensivist telemetry, critical admission approvals, and acute hospital liaison.
              </p>

              {/* Feature Points */}
              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-bupa-500 flex-shrink-0" />
                  <span>Real-time patient telemetry &amp; vitals tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-bupa-500 flex-shrink-0" />
                  <span>On-duty Chief Intensivist consultation &amp; medical ward updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-bupa-500 flex-shrink-0" />
                  <span>Fast-track admission triage &amp; pre-authorization guarantee</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-bupa-600 group-hover:text-bupa-700">
                Open Medical Extensive Care Portal
              </span>
              <div className="w-9 h-9 rounded-full bg-bupa-50 text-bupa-600 group-hover:bg-bupa-500 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* OPTION 2: Care Service */}
          <div 
            onClick={() => onSelectOption('care-service')}
            className="group relative cursor-pointer bg-white rounded-3xl p-7 border-2 border-slate-200 hover:border-emerald-500 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Community &amp; Assisted Living
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Care Services
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Comprehensive care packages including Bupa Aged Care residences, in-home visiting nurse packages, post-operative rehabilitation, and assisted living coordination.
              </p>

              {/* Feature Points */}
              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Visiting registered nurses &amp; wound care therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Aged care residential suites &amp; respite booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Personalized recovery schedules &amp; allied health plans</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                Explore Care Services
              </span>
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Clinical Guidance & Hotline Box */}
      <div className="p-4 rounded-2xl bg-bupa-50 border border-bupa-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-bupa-600 flex-shrink-0" />
          <div className="text-slate-700">
            <strong>Need urgent medical transfer or emergency admission?</strong> Medical Extensive Care staff can coordinate direct hospital-to-hospital transport and guarantee payment without out-of-pocket delays.
          </div>
        </div>
        <button
          onClick={() => onSelectOption('medical-extensive-care')}
          className="px-4 py-2 bg-bupa-600 hover:bg-bupa-700 text-white font-bold rounded-xl whitespace-nowrap shadow-sm"
        >
          Go to Extensive Care Unit
        </button>
      </div>
    </div>
  );
};
