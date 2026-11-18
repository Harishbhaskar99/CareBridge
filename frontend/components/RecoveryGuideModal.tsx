import React from 'react';
import { 
  X, 
  HelpCircle, 
  PanelLeftClose, 
  HardDrive, 
  Sparkles, 
  FileCode2, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { WHERE_IS_MY_WORK_TIPS } from '../constants';

interface RecoveryGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecoveryGuideModal: React.FC<RecoveryGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Where is my work from yesterday?</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Understanding Vertex AI Studio session persistence &amp; how to retrieve code</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Steps */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-amber-200">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong>Quick Answer:</strong> In browser-based AI workspaces like Vertex AI Studio, each browser window or session starts with an active preview. Your past builds typically live in the <span className="underline font-semibold">Conversations / Sessions list</span> on the left-hand navigation bar, or in the browser's persistent cache.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {WHERE_IS_MY_WORK_TIPS.map((tip, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-850/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 border border-slate-700 rounded-full text-slate-300">
                      {tip.badge}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">Step 0{idx + 1}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-1.5">{tip.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Practical Checklist */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Actionable Retrieval Checklist
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Check other browser tabs:</strong> You might still have yesterday's preview tab open or pinned.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Scan LocalStorage:</strong> Click <em>"Run Cache Audit"</em> on this dashboard to check if any states or logs were retained.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Ask Gemini Reconstructor:</strong> Type keywords like <em>"we made a pricing card with annual toggle"</em> and Gemini will regenerate the code in seconds.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Got it, Let's Recover My Work
          </button>
        </div>

      </div>
    </div>
  );
};
