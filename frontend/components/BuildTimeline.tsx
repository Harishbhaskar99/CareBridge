import React, { useState } from 'react';
import { 
  History, 
  Clock, 
  Tag, 
  Code2, 
  CheckCircle, 
  Copy, 
  Filter, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCode
} from 'lucide-react';
import { BuildSnapshot } from '../types';

interface BuildTimelineProps {
  snapshots: BuildSnapshot[];
  onSelectSnapshot: (snapshot: BuildSnapshot) => void;
}

export const BuildTimeline: React.FC<BuildTimelineProps> = ({ snapshots, onSelectSnapshot }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(snapshots[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = snapshots.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const handleCopyCode = (id: string, code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <History className="w-5 h-5 text-emerald-400" />
            <span>Build Timeline &amp; Session Iterations</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Chronological log of projects, code states, and components assembled yesterday and earlier.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
          {['all', 'dashboard', 'ai-agent', 'utility', 'web-app'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium capitalize transition-colors ${
                filterCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {cat === 'all' ? 'All Activity' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative mt-6 pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {filtered.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Card Container */}
              <div className="bg-slate-950/70 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition-all">
                {/* Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.projectName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400/90">
                      <Clock className="w-3.5 h-3.5" />
                      {item.relativeTime}
                    </span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="p-1 hover:text-white transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {item.summary}
                </p>

                {/* Prompt Snippet */}
                <div className="mt-3 p-2.5 bg-slate-900/90 rounded-lg border border-slate-800/80 text-xs text-slate-400 font-mono">
                  <span className="text-emerald-400 font-semibold mr-1.5">$ Prompt:</span>
                  <span>"{item.promptSnippet}"</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-slate-400 border border-slate-800 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  <span className="text-[10px] text-slate-500 ml-auto font-mono">
                    {item.filesModified.length} files touched
                  </span>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 animate-fadeIn space-y-3">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                      Touched Files:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.filesModified.map((file, fi) => (
                        <span key={fi} className="text-xs font-mono text-emerald-300 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                          {file}
                        </span>
                      ))}
                    </div>

                    {item.codePreview && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span>Code Snapshot Preview</span>
                          <button
                            onClick={() => handleCopyCode(item.id, item.codePreview)}
                            className="flex items-center gap-1 text-emerald-400 hover:underline"
                          >
                            {copiedId === item.id ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedId === item.id ? 'Copied' : 'Copy Code'}
                          </button>
                        </div>
                        <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300 border border-slate-800 overflow-x-auto max-h-40">
                          {item.codePreview}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
