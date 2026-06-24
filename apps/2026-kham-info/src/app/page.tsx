export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#3e3b32] font-sans selection:bg-[#a3b18a] selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#f4f1ea]/90 backdrop-blur-sm border-b border-[#e2dfd6]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-[#2b3a28]">
            KHAM 2026
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#about" className="hover:text-[#588157] transition-colors">About</a>
            <a href="#lineup" className="hover:text-[#588157] transition-colors">Lineup</a>
            <a href="#tickets" className="hover:text-[#588157] transition-colors">Tickets</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10">
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#588157] blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#a3b18a] blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#588157] font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
            The Spirit of Nature & Sound
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#2b3a28] mb-6 leading-tight">
            KHAM FESTIVAL
            <br />
            <span className="text-4xl md:text-6xl lg:text-7xl font-light text-[#588157]">2026</span>
          </h1>
          <p className="text-lg md:text-xl text-[#5a5649] max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the harmonious blend of traditional rhythms and contemporary beats, set against a breathtaking natural landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#tickets" className="px-8 py-4 bg-[#344e41] text-[#f4f1ea] rounded-none hover:bg-[#2b3a28] transition-colors font-medium tracking-wide w-full sm:w-auto">
              GET TICKETS
            </a>
            <a href="#lineup" className="px-8 py-4 border border-[#344e41] text-[#344e41] rounded-none hover:bg-[#344e41] hover:text-[#f4f1ea] transition-colors font-medium tracking-wide w-full sm:w-auto">
              DISCOVER LINEUP
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#eae6dc]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-[#a3b18a] flex-1"></div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2b3a28]">ABOUT THE FESTIVAL</h2>
            <div className="h-px bg-[#a3b18a] flex-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-[#5a5649] leading-relaxed">
              <p>
                Rooted in deep cultural heritage, the Kham Festival celebrates the indigenous music and arts that have echoed through our forests for generations.
              </p>
              <p>
                Like the Rainforest World Music Festival, we aim to bring together artists who draw inspiration from nature, creating a unique acoustic environment where modern and traditional sounds converge.
              </p>
              <p>
                Join us for three days of workshops, cultural displays, and unforgettable performances under the canopy.
              </p>
            </div>
            <div className="aspect-square bg-[#d9d4c5] p-8 flex flex-col justify-center items-center text-center relative">
              {/* Minimalist illustration placeholder */}
              <div className="w-24 h-24 border border-[#588157] rounded-full mb-6 flex items-center justify-center">
                <div className="w-16 h-16 border border-[#a3b18a] rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-[#344e41] mb-2">August 14-16, 2026</h3>
              <p className="text-[#5a5649]">Sacred Grove Amphitheater</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lineup Section (Placeholder) */}
      <section id="lineup" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2b3a28] mb-4">ARTIST LINEUP</h2>
            <p className="text-[#588157] tracking-widest uppercase text-sm">To be announced</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-[#eae6dc] mb-4 relative overflow-hidden flex items-center justify-center transition-colors group-hover:bg-[#d9d4c5]">
                   <span className="text-[#a3b18a] text-6xl font-light opacity-50">+</span>
                </div>
                <h3 className="text-lg font-bold text-[#344e41]">Artist {item}</h3>
                <p className="text-[#5a5649] text-sm">Genre / Origin</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2b3a28] text-[#eae6dc] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tighter mb-4 text-[#f4f1ea]">KHAM 2026</h3>
            <p className="text-[#a3b18a] max-w-sm mb-6">
              A celebration of music, culture, and nature. Connecting roots to the future.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#f4f1ea] mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-[#a3b18a]">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#lineup" className="hover:text-white transition-colors">Lineup</a></li>
              <li><a href="#tickets" className="hover:text-white transition-colors">Tickets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#f4f1ea] mb-4 uppercase text-sm tracking-wider">Follow Us</h4>
            <ul className="space-y-2 text-[#a3b18a]">
              <li><a href="https://www.facebook.com/khamfestival" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-[#344e41] text-sm text-[#a3b18a] flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2026 Kham Festival. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
