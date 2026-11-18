import React from 'react';
import { HelpCircle, Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface QuickAnswerBannerProps {
  onOpenGuide: () => void;
  onJumpToReconstruct: () => void;
}

export const QuickAnswerBanner: React.FC<QuickAnswerBannerProps> = ({
  onOpenGuide,
  onJumpToReconstruct
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 p-6 sm:p-8 shadow-2xl">
      {/* Decorative Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Workspace Retrieval Assistant</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            "Where is what we built yesterday?"
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            In Vertex AI Studio, your applications are stored as individual 
            <span className="text-emerald-400 font-semibold"> chat sessions in the left sidebar</span>. 
            If you started a new session today or opened an empty tab, your previous code is safe in that thread, or cached in your browser.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              1. Left sidebar chat history
            </span>
            <span className="flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              2. Browser localStorage cache
            </span>
            <span className="flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              3. Gemini AI Reconstructor
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
          <button
            onClick={onOpenGuide}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all shadow-md"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Visual Recovery Guide</span>
          </button>

          <button
            onClick={onJumpToReconstruct}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reconstruct Lost Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
