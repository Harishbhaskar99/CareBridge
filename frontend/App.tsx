import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { MedicalExtensiveCareUnit } from './components/MedicalExtensiveCareUnit';
import { CareServicesView } from './components/CareServicesView';
import { CURRENT_BUPA_MEMBER, MOCK_EXTENSIVE_CARE_CASES } from './constants';
import { ActivePortalView, BupaMember } from './types';

export default function App() {
  const [member] = useState<BupaMember>(CURRENT_BUPA_MEMBER);
  const [activeView, setActiveView] = useState<ActivePortalView>('home');
  const [activeCasesCount] = useState(MOCK_EXTENSIVE_CARE_CASES.length);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Authenticated Navbar */}
      <Navbar
        member={member}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {activeView === 'home' && (
          <HomePage
            member={member}
            onSelectOption={(option) => setActiveView(option)}
            activeMecuCasesCount={activeCasesCount}
          />
        )}

        {activeView === 'medical-extensive-care' && (
          <MedicalExtensiveCareUnit
            onBackToHome={() => setActiveView('home')}
          />
        )}

        {activeView === 'care-service' && (
          <CareServicesView
            onBackToHome={() => setActiveView('home')}
            onSwitchToMecu={() => setActiveView('medical-extensive-care')}
          />
        )}
      </main>

      {/* Clinical Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-bupa-700">Bupa Health Insurance &amp; Hospital Care</span>
            <span>•</span>
            <span>Member Services: 1800 2872 2273</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Guarantee of Payment Verified</span>
            <span>Clinical Governance Protected</span>
            <span>Privacy &amp; Telehealth Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
