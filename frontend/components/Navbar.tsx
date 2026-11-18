import React from 'react';
import { ShieldCheck, PhoneCall, Bell, User, HeartPulse, ChevronRight } from 'lucide-react';
import { BupaMember, ActivePortalView } from '../types';

interface NavbarProps {
  member: BupaMember;
  activeView: ActivePortalView;
  onNavigate: (view: ActivePortalView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ member, activeView, onNavigate }) => {
  return (
    <header className="bg-bupa-700 text-white shadow-md sticky top-0 z-50">
      {/* Top Clinical Alert / Priority Line */}
      <div className="bg-bupa-800/90 text-bupa-100 px-4 sm:px-8 py-1.5 text-xs flex items-center justify-between border-b border-bupa-600/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="font-semibold text-white">24/7 Bupa Medical Priority Line:</span>
          <span className="hidden sm:inline text-bupa-200">Immediate access to on-call Critical Care Specialists</span>
        </div>
        <a 
          href="tel:1800-BUPA-CARE" 
          className="flex items-center gap-1.5 font-bold text-white hover:text-bupa-200 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>1800 2872 2273</span>
        </a>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Current View */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group text-left"
            title="Return to My Bupa Home"
          >
            <div className="bg-white text-bupa-700 font-black text-xl px-2.5 py-1 rounded-md tracking-tighter shadow-sm flex items-center gap-1 group-hover:scale-105 transition-transform">
              <span>Bupa</span>
              <HeartPulse className="w-4 h-4 text-bupa-500" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-tight text-white group-hover:text-bupa-200 transition-colors">
                My Bupa
              </span>
              <span className="text-[11px] text-bupa-200 block">Health &amp; Care Portal</span>
            </div>
          </button>

          {/* Breadcrumb if inside MECU or Care Services */}
          {activeView !== 'home' && (
            <div className="hidden md:flex items-center gap-2 text-xs text-bupa-200 border-l border-bupa-600 pl-4 ml-2">
              <button 
                onClick={() => onNavigate('home')} 
                className="hover:text-white underline underline-offset-2"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-bupa-400" />
              <span className="font-semibold text-white px-2 py-0.5 bg-bupa-600/50 rounded-md">
                {activeView === 'medical-extensive-care' ? 'Medical Extensive Care Unit (MECU)' : 'Care Services'}
              </span>
            </div>
          )}
        </div>

        {/* Member Profile Quick Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-sm font-bold text-white">{member.name}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Member" />
            </div>
            <span className="text-[11px] font-mono text-bupa-200">
              No: {member.membershipNumber} • {member.tier}
            </span>
          </div>

          <div className="relative">
            <img 
              src={member.avatarUrl} 
              alt={member.name} 
              className="w-10 h-10 rounded-full border-2 border-white/80 object-cover shadow-inner"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-bupa-700 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};
