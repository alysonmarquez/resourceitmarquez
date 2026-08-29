import { useState, useEffect } from 'react';
import { fetchRealPresence, PresenceData } from '../services/activityService';

export function MembersOnline() {
  const [presence, setPresence] = useState<PresenceData | null>(null);

  useEffect(() => {
    fetchRealPresence().then(data => {
      if (data) setPresence(data);
    });
  }, []);

  const avatars = [
    { name: 'Alyson Marquez', src: '/alyson-marquez.jpg' },
    { name: 'Tech Girl', src: '/techgirl.jpeg' },
    { name: 'Resource IT', src: '/resource-it-marquez.jpeg' }
  ];

  return (
    <div className="inline-flex items-center gap-3 p-2 pr-4 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 backdrop-blur-md shadow-sm">
      {/* Avatars Stack */}
      <div className="flex -space-x-2">
        {avatars.map((av, idx) => (
          <img
            key={idx}
            src={av.src}
            alt={av.name}
            className="w-7 h-7 rounded-full border-2 border-[#030C1E] object-cover"
          />
        ))}
      </div>

      {/* Online info */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
        <span className="text-xs font-mono text-[#E6E9EF]">
          <strong className="text-emerald-400">+{presence ? presence.online : 8}</strong> online construindo juntos
        </span>
      </div>
    </div>
  );
}
