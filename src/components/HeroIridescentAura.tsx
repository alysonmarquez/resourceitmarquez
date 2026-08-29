interface HeroIridescentAuraProps {
  isTechGirl?: boolean;
}

export function HeroIridescentAura({ isTechGirl }: HeroIridescentAuraProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      
      {/* 1. Organic Fluid Iridescent Wave (Inspired directly by the right-hand magma/iridescent wave of the official logo) */}
      <div className="absolute -top-10 -right-20 sm:-right-10 w-[350px] sm:w-[550px] lg:w-[750px] h-[500px] sm:h-[700px] lg:h-[850px] opacity-75 sm:opacity-85 mix-blend-screen animate-float-aura-right">
        
        {/* Deep Petroleum Blue / Teal Fluid Base */}
        <div className="absolute top-[10%] right-[15%] w-[280px] sm:w-[450px] h-[350px] sm:h-[500px] rounded-[45%_55%_70%_30%/45%_30%_70%_55%] bg-gradient-to-br from-[#103653] via-[#1D5171] to-[#246386] blur-[60px] sm:blur-[80px] opacity-70 animate-breathe" />

        {/* Molten Gold Accent Magma Ribbon */}
        <div className="absolute top-[20%] right-[22%] w-[180px] sm:w-[320px] h-[220px] sm:h-[380px] rounded-[60%_40%_50%_50%/40%_60%_50%_50%] bg-gradient-to-tr from-[#E0A34A] via-[#f59e0b] to-[#fbbf24] blur-[45px] sm:blur-[60px] opacity-55 animate-float-aura" />

        {/* Dusty Rose Silky Fluid Overlay */}
        <div className="absolute top-[35%] right-[10%] w-[220px] sm:w-[380px] h-[260px] sm:h-[420px] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-gradient-to-tl from-[#967189] via-[#997074] to-[#c084fc] blur-[55px] sm:blur-[75px] opacity-60 animate-breathe" />

        {/* Soft Coral Refraction Accent */}
        <div className="absolute top-[45%] right-[25%] w-[150px] sm:w-[260px] h-[180px] sm:h-[300px] rounded-[50%_50%_30%_70%/50%_30%_70%_50%] bg-gradient-to-r from-[#997074] via-[#E0A34A] to-[#246386] blur-[40px] sm:blur-[55px] opacity-50" />
      </div>

      {/* 2. Left Subtle Atmospheric Ambient Light (Keeps left side elegant & readable) */}
      <div className="absolute top-1/4 -left-20 w-[300px] sm:w-[500px] h-[400px] sm:h-[600px] opacity-45 mix-blend-screen animate-float-aura">
        <div className="w-full h-full rounded-[60%_40%_50%_50%/50%_60%_40%_50%] bg-gradient-to-tr from-[#103653] via-[#1D5171] to-[#967189] blur-[80px] sm:blur-[100px]" />
      </div>

      {/* 3. Subtle Hairline Circuit Light Paths (Echoing the tech circuits next to the wave) */}
      <svg 
        className="absolute top-10 right-0 w-full max-w-3xl h-[600px] opacity-[0.07] stroke-[#E6E9EF]" 
        viewBox="0 0 800 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M700 50L600 150H450L400 200V350L300 450H150" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M750 180L680 250V400L600 480H400" strokeWidth="1.5" />
        <circle cx="450" cy="150" r="4" fill="#E0A34A" />
        <circle cx="400" cy="200" r="4" fill="#967189" />
        <circle cx="680" cy="250" r="4" fill="#246386" />
        <circle cx="600" cy="480" r="4" fill="#E0A34A" />
      </svg>

    </div>
  );
}
