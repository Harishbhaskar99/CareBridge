import React, { useState } from 'react';
import { Sparkles, ArrowRight, Code, Layers, FileText, Copy, Check, Lightbulb, RefreshCw } from 'lucide-react';
import { reconstructProjectFromDescription } from '../services/geminiService';
import { ReconstructedProject, BuildSnapshot } from '../types';

interface ProjectReconstructorProps {
  onSaveToTimeline: (snapshot: BuildSnapshot) => void;
}

export const ProjectReconstructor: React.FC<ProjectReconstructorProps> = ({ onSaveToTimeline }) => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReconstructedProject | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleMemories = [
    'A real-time token usage monitor with dark theme and area charts',
    'A live video avatar chat assistant using Kai and speech transcription',
    'A SaaS pricing calculator with annual discount slider and Stripe modal',
    'A personal habit tracker with daily streaks and local storage persistence'
  ];

  const handleReconstruct = async (textToUse?: string) => {
    const input = textToUse || description;
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const reconstructed = await reconstructProjectFromDescription(input);
      setResult(reconstructed);
    } catch (err) {
      console.error(err);
      setError('Unable to reconstruct project. Please check network connectivity or retry with additional keywords.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToTimeline = () => {
    if (!result) return;
    const newSnapshot: BuildSnapshot = {
      id: `reconstructed-${Date.now()}`,
      projectName: result.title,
      timestamp: new Date().toISOString(),
      relativeTime: 'Reconstructed Just Now',
      category: 'web-app',
      summary: result.summary,
      promptSnippet: result.originalPromptSuggestion,
      filesModified: result.keyComponents.map((c) => c.name),
      status: 'saved_locally',
      tags: result.techStack,
      codePreview: result.keyComponents[0]?.suggestedCodeSnippet || ''
    };
    onSaveToTimeline(newSnapshot);
    alert('Project snapshot added to your Build Timeline!');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex items-start gap-3 pb-4 border-b border-slate-800">
        <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            AI Session Reconstructor
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Can't find yesterday's chat? Describe what we built and Gemini 2.5 will reconstruct the file breakdown, prompts, and code.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="mt-5 space-y-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            What do you remember building yesterday?
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="e.g. We built a customer feedback portal with sentiment analysis tags, star ratings, and an export CSV button..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500 flex items-center gap-1 mr-1">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            Quick cues:
          </span>
          {sampleMemories.map((sample, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDescription(sample);
                handleReconstruct(sample);
              }}
              className="text-[11px] px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700/60 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => handleReconstruct()}
            disabled={isLoading || !description.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Reconstructing Architecture...
              </>
            ) : (
              <>
                <span>Reconstruct Project Spec</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl">
            {error}
          </div>
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div className="mt-8 pt-6 border-t border-slate-800 animate-fadeIn space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md">
                Reconstructed Architecture
              </span>
              <h4 className="text-xl font-bold text-white mt-1">{result.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{result.summary}</p>
            </div>

            <button
              onClick={handleAddToTimeline}
              className="self-start sm:self-auto px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              + Save to Timeline
            </button>
          </div>

          {/* Tech Stack & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Identified Tech Stack
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {result.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-emerald-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                Core Features
              </h5>
              <ul className="space-y-1 text-xs text-slate-400">
                {result.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suggested Prompt to Rebuild */}
          <div className="p-4 bg-slate-950/90 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Ready-to-Paste Studio Prompt (Copy this to re-generate the entire app)
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.originalPromptSuggestion);
                  setCopiedPrompt(true);
                  setTimeout(() => setCopiedPrompt(false), 2000);
                }}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
              >
                {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedPrompt ? 'Copied' : 'Copy Prompt'}
              </button>
            </div>
            <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
              "{result.originalPromptSuggestion}"
            </p>
          </div>

          {/* Key Components Code Preview */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              Reconstructed Components ({result.keyComponents.length})
            </h5>
            <div className="space-y-3">
              {result.keyComponents.map((comp, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-white">{comp.name}</span>
                    {comp.suggestedCodeSnippet && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(comp.suggestedCodeSnippet || '');
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 2000);
                        }}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Copy Code
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{comp.description}</p>
                  {comp.suggestedCodeSnippet && (
                    <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-48">
                      {comp.suggestedCodeSnippet}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
