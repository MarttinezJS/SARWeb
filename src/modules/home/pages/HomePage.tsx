import { NewsFeed, SongHistory } from "../components";

export const RECENT_TRACKS = [
  { time: "10:30", title: "Canción 3", artist: "Artista C" },
  { time: "10:15", title: "Canción 2", artist: "Artista B" },
  { time: "10:00", title: "Canción 1", artist: "Artista A" },
];
export const SPONSORS = [
  { id: "1", name: "Minimal Natural", logo: "A", bgColor: "bg-[#1e3a34]" },
  { id: "2", name: "Company B", logo: "B", bgColor: "bg-[#f3e3c1]" },
  { id: "3", name: "Company C", logo: "C", bgColor: "bg-[#5e7456]" },
  { id: "4", name: "Company D", logo: "D", bgColor: "bg-[#1b3d36]" },
  { id: "5", name: "Company E", logo: "E", bgColor: "bg-[#b6bb7f]" },
  { id: "6", name: "Company F", logo: "F", bgColor: "bg-white" },
];
const NEWS = [
  {
    id: "featured",
    title: "La importancia de la radio en la era digital y su impacto social",
    excerpt:
      "Descubre cómo la radio sigue siendo un medio vital para la comunicación y la unión comunitaria en tiempos modernos.",
    category: "Destacado",
    date: "Hace 2 horas",
    author: "Redacción",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1470&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Entrevista exclusiva con artistas locales en nuestro estudio",
    excerpt:
      "Una charla íntima sobre la escena musical emergente y los desafíos que enfrentan los nuevos talentos.",
    category: "Cultura",
    date: "10 Oct, 2023",
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Gran concierto benéfico este fin de semana",
    excerpt:
      "Únete a nosotros para apoyar una buena causa con música en vivo, comida y actividades para toda la familia.",
    category: "Eventos",
    date: "09 Oct, 2023",
    author: "Eventos Team",
    image:
      "https://images.unsplash.com/photo-1459749411177-042180ce673f?q=80&w=1470&auto=format&fit=crop",
  },
];
const featured = NEWS.find((n) => n.isFeatured);
export const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex items-end justify-between pb-2">
        <h2 className="text-4xl font-extrabold title ">Últimas Noticias</h2>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content: News Feed */}
        <div className="lg:col-span-8 space-y-10">
          {/* Featured Post */}
          {featured && (
            <div className="relative group cursor-pointer rounded-3xl overflow-hidden aspect-video shadow-2xl">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 p-8 md:p-12 w-full">
                <span className="inline-block px-4 py-1.5 bg-brand-gold text-black text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                  {featured.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 group-hover:text-brand-gold transition-colors">
                  {featured.title}
                </h3>
                <p className="text-slate-300 text-lg line-clamp-2 max-w-2xl mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span>{featured.date}</span>
                  <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                  <span>Por {featured.author}</span>
                </div>
              </div>
            </div>
          )}
          <NewsFeed />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Recently Played */}
          <SongHistory />

          {/* Mini Sponsors */}
          <section className="glass-panel p-6">
            <h3 className="font-bold mb-5">Nuestros Patrocinadores</h3>
            <div className="grid grid-cols-2 gap-3">
              {SPONSORS.slice(0, 3).map((s) => (
                <div
                  key={s.id}
                  className={`${s.bgColor} aspect-square rounded-xl flex items-center justify-center shadow-inner hover:opacity-80 transition-opacity cursor-pointer`}
                >
                  <span className="text-2xl font-black text-black/20">
                    {s.logo}
                  </span>
                </div>
              ))}
              <div className="bg-slate-800/50 aspect-square rounded-xl flex items-center justify-center border border-dashed border-white/20 p-2 text-center group cursor-pointer hover:border-brand-gold transition-colors">
                <span className="text-[10px] text-slate-500 font-medium group-hover:text-brand-gold">
                  Tu marca aquí
                </span>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="bg-brand-gold/10 border border-brand-gold/20 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12">
              <span className="material-symbols-outlined text-9xl">mail</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-2">
              Suscríbete al boletín
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Recibe las últimas noticias directamente en tu bandeja de entrada.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold outline-none"
              />
              <button className="w-full bg-brand-gold text-black font-bold py-3 rounded-xl hover:shadow-lg shadow-brand-gold/20 transition-all active:scale-95">
                Suscribirse
              </button>
            </form>
          </section>
        </aside>
      </div>
    </div>
  );
};
