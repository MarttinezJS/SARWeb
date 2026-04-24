const SPONSORS = [
  { id: "1", name: "Minimal Natural", logo: "A", bgColor: "bg-[#1e3a34]" },
  { id: "2", name: "Company B", logo: "B", bgColor: "bg-[#f3e3c1]" },
  { id: "3", name: "Company C", logo: "C", bgColor: "bg-[#5e7456]" },
  { id: "4", name: "Company D", logo: "D", bgColor: "bg-[#1b3d36]" },
  { id: "5", name: "Company E", logo: "E", bgColor: "bg-[#b6bb7f]" },
  { id: "6", name: "Company F", logo: "F", bgColor: "bg-white" },
];
export const SponsorsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-1000">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
          Nuestros Patrocinadores
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Agradecemos a nuestros patrocinadores por su apoyo continuo. Su
          contribución es esencial para mantener la calidad de nuestra
          programación y llegar a nuestra audiencia.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
        {SPONSORS.map((sponsor) => (
          <div key={sponsor.id} className="group relative">
            <div className="absolute -inset-1 bg-white/5 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div
              className={`relative aspect-square ${sponsor.bgColor} rounded-2xl shadow-xl flex items-center justify-center p-12 transition-all duration-500 group-hover:scale-[1.02] cursor-pointer border border-white/5`}
            >
              <span className="text-7xl font-black text-black/10 select-none">
                {sponsor.logo}
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-1/2 h-1/2 border-2 border-black/5 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-700">
                  <span className="text-xl font-bold text-black/40 -rotate-45 group-hover:rotate-0 transition-transform">
                    {sponsor.logo}
                  </span>
                </div>
                <p className="mt-4 text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">
                  {sponsor.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership Box */}
      <div className="glass-panel p-12 text-center max-w-4xl mx-auto border-brand-blue/20 bg-linear-to-br from-brand-blue/5 to-transparent">
        <h3 className="text-3xl font-extrabold text-white mb-6">
          Conviértete en Patrocinador
        </h3>
        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
          Si estás interesado en patrocinar Sigue Adelante Radio, contáctenos
          para discutir las oportunidades disponibles y cómo podemos ayudarte a
          alcanzar tus objetivos de marketing.
        </p>
        <button className="bg-brand-blue text-white font-black px-12 py-4 rounded-xl hover:bg-opacity-90 hover:scale-105 transition-all shadow-xl shadow-brand-blue/20">
          Contáctenos
        </button>
      </div>
    </div>
  );
};
