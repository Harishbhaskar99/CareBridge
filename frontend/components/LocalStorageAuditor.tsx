import React, { useState, useEffect } from 'react';
import { HardDrive, RefreshCw, Eye, Download, Check, AlertCircle, Trash2 } from 'lucide-react';
import { StorageInspectionResult } from '../types';

export const LocalStorageAuditor: React.FC = () => {
  const [entries, setEntries] = useState<StorageInspectionResult[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<StorageInspectionResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanStorage = () => {
    setIsScanning(true);
    setTimeout(() => {
      const results: StorageInspectionResult[] = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            const raw = localStorage.getItem(key) || '';
            let parsedType = 'string';
            try {
              const obj = JSON.parse(raw);
              parsedType = Array.isArray(obj) ? 'array' : typeof obj;
            } catch {
              parsedType = 'text/plain';
            }
            results.push({
              key,
              byteSize: new Blob([raw]).size,
              lastModified: 'Cached on this browser',
              snippet: raw.length > 250 ? raw.slice(0, 250) + '...' : raw,
              parsedType
            });
          }
        }
      } catch (err) {
        console.error('Storage scan error:', err);
      }
      setEntries(results);
      setIsScanning(false);
    }, 400);
  };

  useEffect(() => {
    scanStorage();
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (key: string, content: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSeedDemoData = () => {
    try {
      localStorage.setItem('yesterday_project_state', JSON.stringify({
        project: 'Smart Inventory Hub',
        lastBuildTime: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        author: 'User Session',
        components: ['InventoryTable.tsx', 'StockChart.tsx', 'AddProductModal.tsx'],
        notes: 'Completed the real-time stock alert logic and responsive tables.'
      }, null, 2));
      localStorage.setItem('devvault_preferences', JSON.stringify({
        autoSave: true,
        defaultCategory: 'web-app',
        theme: 'dark'
      }));
      scanStorage();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearKey = (key: string) => {
    if (confirm(`Remove key "${key}" from browser storage?`)) {
      localStorage.removeItem(key);
      scanStorage();
      if (selectedEntry?.key === key) setSelectedEntry(null);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <HardDrive className="w-5 h-5 text-emerald-400" />
            <span>Browser Cache &amp; Storage Scanner</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Scans the current origin for saved states, component cache, or credentials stored yesterday.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scanStorage}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-emerald-400' : ''}`} />
            {isScanning ? 'Scanning...' : 'Rescan Storage'}
          </button>
          <button
            onClick={handleSeedDemoData}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
            title="Adds a demo snapshot to local storage to simulate restored project data"
          >
            + Store Sample Backup
          </button>
        </div>
      </div>

      {/* Storage stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-[11px] text-slate-400 uppercase font-mono">Keys Discovered</span>
          <div className="text-xl font-bold text-white mt-0.5">{entries.length}</div>
        </div>
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-[11px] text-slate-400 uppercase font-mono">Total Volume</span>
          <div className="text-xl font-bold text-emerald-400 mt-0.5">
            {(entries.reduce((acc, curr) => acc + curr.byteSize, 0) / 1024).toFixed(1)} KB
          </div>
        </div>
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-[11px] text-slate-400 uppercase font-mono">Domain Scope</span>
          <div className="text-xs font-mono text-slate-300 truncate mt-1.5">
            {typeof window !== 'undefined' ? window.location.hostname || 'Local Preview' : 'Local'}
          </div>
        </div>
      </div>

      {/* Table or Empty state */}
      {entries.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
          <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-300">No active keys found in current localStorage</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            If your project was built in a different subdomain or Incognito window, it may not be in this storage partition. Click below to add sample recovery data!
          </p>
          <button
            onClick={handleSeedDemoData}
            className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-medium hover:bg-emerald-500/20"
          >
            Create Sample Session Cache
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Storage Key</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Preview</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {entries.map((entry) => (
                <tr key={entry.key} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-emerald-300 max-w-[180px] truncate">
                    {entry.key}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">
                      {entry.parsedType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {(entry.byteSize / 1024).toFixed(2)} KB
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 max-w-[200px] truncate">
                    {entry.snippet}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                        title="View Full Content"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const val = localStorage.getItem(entry.key) || '';
                          handleCopy(val, entry.key);
                        }}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                        title="Copy to Clipboard"
                      >
                        {copiedKey === entry.key ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleClearKey(entry.key)}
                        className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded transition-colors"
                        title="Delete key"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Raw Inspector Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="font-mono text-sm font-bold text-emerald-400">
                Key: {selectedEntry.key}
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded"
              >
                Close
              </button>
            </div>
            <pre className="mt-4 p-3 bg-slate-950 rounded-xl text-xs text-slate-300 max-h-96 overflow-auto font-mono whitespace-pre-wrap border border-slate-800">
              {localStorage.getItem(selectedEntry.key)}
            </pre>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  const val = localStorage.getItem(selectedEntry.key) || '';
                  handleDownload(selectedEntry.key, val);
                }}
                className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-semibold rounded-lg text-xs hover:bg-emerald-400"
              >
                Download as JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
