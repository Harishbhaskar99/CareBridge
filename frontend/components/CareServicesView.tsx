import React from 'react';
import { ArrowLeft, Building2, UserCheck, CheckCircle2, ShieldCheck, PhoneCall, Calendar } from 'lucide-react';
import { CareServiceOffering } from '../types';
import { MOCK_CARE_SERVICES } from '../constants';

interface CareServicesViewProps {
  onBackToHome: () => void;
  onSwitchToMecu: () => void;
}

export const CareServicesView: React.FC<CareServicesViewProps> = ({ onBackToHome, onSwitchToMecu }) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-800 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to My Bupa Home</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Bupa Care Services
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Aged care residences, home visiting nursing, and personalized rehabilitation.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onSwitchToMecu}
          className="px-4 py-2 bg-bupa-50 hover:bg-bupa-100 text-bupa-700 border border-bupa-200 text-xs font-bold rounded-xl transition-colors"
        >
          Switch to Medical Extensive Care Unit →
        </button>
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_CARE_SERVICES.map((service) => (
          <div 
            key={service.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-bold">
                {service.category}
              </span>
              <h3 className="font-bold text-slate-900 text-lg mt-2">{service.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Coverage:</span>
                <span className="font-semibold text-emerald-700">{service.bupaCoverLevel}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Availability:</span>
                <span className="font-medium text-slate-700">{service.availability}</span>
              </div>
              <button 
                onClick={() => alert(`Inquiry submitted for ${service.title}. A Bupa Care Coordinator will contact you.`)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all text-center"
              >
                Inquire &amp; Book Care Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
