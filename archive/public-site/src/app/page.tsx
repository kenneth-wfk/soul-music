import React from 'react';

// Authentic Mock Data for Kampar Heritage and Music Festival
const MOCK_NEWS = [
  {
    id: 1,
    title: "Join us at UTAR Hospital Lobby!",
    date: "Dec 11, 2025",
    excerpt: "The Christmas Choir performances brought so much joy to the community! Stay tuned for our 2026 events.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Community Music Time at Taman Bandar Baru",
    date: "Nov 2, 2025",
    excerpt: "A day filled with incredible local talents, fun activities, and heritage celebrations at 2203 Jalan Timah.",
    imageUrl: "https://images.unsplash.com/photo-1533174000222-297c48529bc2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Preparing for Soulfest 2026!",
    date: "Future Scope",
    excerpt: "We are gearing up for the biggest Kampar Heritage and Music Festival yet. Get ready for an unforgettable cultural journey.",
    imageUrl: "https://images.unsplash.com/photo-1540039155732-61ee01f28246?auto=format&fit=crop&q=80&w=800",
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden text-[#1e293b]">
      {/* Navbar Stub */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-white/40 py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
          <span className="text-[#008080]">SOUL</span>
          <span className="text-[#FF1493]">FEST</span>
        </h1>
        <div className="flex gap-6 items-center">
          <a href="#about" className="text-sm font-semibold hover:text-[#FF1493] transition-colors hidden md:block">About Us</a>
          <a href="#news" className="text-sm font-semibold hover:text-[#FF1493] transition-colors">Updates</a>
          <button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-gray-900 px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 shadow-md">
            Join the Festival
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
        <div className="glass-panel p-2 px-6 mb-8 text-[#FF1493] font-bold text-sm md:text-base border-[#FF1493]/20 bg-[#FF1493]/5">
          🎉 Kampar Heritage and Music Festival 2026
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-slate-900 leading-tight">
          A Day of Music, <br/> Food & <span className="text-[#008080]">Fun</span> in <span className="text-[#FF1493]">Kampar!</span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-700 max-w-2xl font-medium mb-10">
          Celebrating local community culture with vibrant performances, arts, and unmissable experiences. Supported by UTAR Music Club.
        </p>
        
      </section>

      {/* Newsfeed Section */}
      <section id="news" className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-3xl font-black tracking-tight mb-2 text-slate-900">Latest Updates</h3>
            <p className="text-slate-600 font-medium">Catch up on our community announcements and past events.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_NEWS.map((news) => (
            <article key={news.id} className="glass-panel overflow-hidden group hover:border-[#87CEEB] hover:shadow-[0_8px_30px_rgba(135,206,235,0.3)] transition-all cursor-pointer flex flex-col h-full bg-white/60">
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={news.imageUrl} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white py-1.5 px-3 rounded-full shadow-sm text-xs font-bold text-[#FF1493]">
                  {news.date}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h4 className="text-xl font-bold mb-3 leading-snug text-slate-900">{news.title}</h4>
                <p className="text-slate-700 text-sm flex-1 leading-relaxed">{news.excerpt}</p>
                <div className="mt-8 text-sm font-bold text-[#008080] flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Read More <span className="text-lg">&rarr;</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer Stub */}
      <footer className="mt-20 py-12 text-center text-gray-500 font-medium text-sm border-t border-gray-200/50">
        <p>Contact us: soulperformingmusic@gmail.com | 017-887 7386</p>
        <p className="mt-2">&copy; 2026 Kampar Heritage and Music Festival. All rights reserved.</p>
      </footer>
    </main>
  );
}
