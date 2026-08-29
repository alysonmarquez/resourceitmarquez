import { useState, useEffect } from 'react';
import { Terminal, Check, Copy } from 'lucide-react';
import { terminalLogs } from '../data/communityData';

export function CommunityTerminal() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => (prev < terminalLogs.length ? prev + 1 : 1));
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-[#E6E9EF]/10 bg-[#030C1E]/90 shadow-2xl overflow-hidden font-mono text-left">
      
      {/* Terminal Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#071528] border-b border-[#E6E9EF]/10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#246386]" />
          <span className="text-xs text-[#E6E9EF]">resourceit-cli ~ node status</span>
        </div>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#103653]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#1D5171]" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 sm:p-5 text-xs space-y-3 min-h-[190px]">
        {terminalLogs.slice(0, visibleCount).map((log, idx) => (
          <div key={idx} className="space-y-1 animate-subir">
            <div className="text-[#A1AEC2] flex items-center gap-1">
              <span className="text-[#246386] font-bold">❯</span>
              <span>{log.command}</span>
            </div>
            <div className="text-emerald-400 pl-3">
              {log.output}
            </div>
          </div>
        ))}
        
        {/* Blinking Cursor */}
        <div className="flex items-center gap-1 text-[#246386]">
          <span>❯</span>
          <span className="w-2 h-4 bg-[#E0A34A] animate-pulse" />
        </div>
      </div>

    </div>
  );
}
