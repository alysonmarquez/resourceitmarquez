export function KineticCommunity() {
  const line1 = ['PROJETOS', 'NETWORKING', 'VAGAS TECH', 'TECH GIRL', 'BACK-END', 'AULAS DE INGLÊS', 'OPEN SOURCE'];
  const line2 = ['MENTORIAS', 'CARREIRA', 'FREELAS', 'IA & AGENTES', 'NETWORKING', 'DISCORD', 'WHATSAPP'];

  const items1 = [...line1, ...line1, ...line1];
  const items2 = [...line2, ...line2, ...line2];

  return (
    <section aria-label="A Comunidade Não Para" className="py-20 border-t border-[#E6E9EF]/10 bg-[#030C1E] overflow-hidden select-none relative">
      
      {/* Background Spectral Halos */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#1D5171]/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#967189]/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E0A34A] font-semibold">
            Ecossistema Ativo
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#E6E9EF] tracking-tight">
          A COMUNIDADE <span className="text-logo-spectrum">NÃO PARA.</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#A1AEC2] max-w-lg mx-auto mt-2">
          Dezenas de desenvolvedores aprendendo, codando e colaborando em projetos reais todos os dias.
        </p>
      </div>

      {/* Kinetic Track 1 */}
      <div className="flex overflow-x-hidden mb-4 opacity-75 hover:opacity-100 transition-opacity">
        <div 
          className="flex items-center gap-6 whitespace-nowrap will-change-transform font-display text-2xl sm:text-4xl font-extrabold tracking-tight"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          {items1.map((item, idx) => (
            <div key={`k1-${idx}`} className="flex items-center gap-6">
              <span className="text-[#E6E9EF]/90 hover:text-white transition-colors">{item}</span>
              <span className="text-[#E0A34A] text-xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kinetic Track 2 */}
      <div className="flex overflow-x-hidden opacity-50 hover:opacity-100 transition-opacity">
        <div 
          className="flex items-center gap-6 whitespace-nowrap will-change-transform font-display text-xl sm:text-3xl font-bold tracking-tight text-[#A1AEC2]"
          style={{ animation: 'marquee-reverse 32s linear infinite' }}
        >
          {items2.map((item, idx) => (
            <div key={`k2-${idx}`} className="flex items-center gap-6">
              <span className="hover:text-[#E6E9EF] transition-colors">{item}</span>
              <span className="text-[#967189] text-lg">●</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
