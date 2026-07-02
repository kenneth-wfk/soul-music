import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden text-[#1e293b]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-white/40 py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
          <span className="text-[#008080]">Soul</span>
          <span className="text-[#FF1493]">Performing</span>
          <span className="text-[#008080]">Music</span>
        </h1>
        <div className="flex gap-6 items-center">
          <a href="#about" className="text-sm font-semibold hover:text-[#FF1493] transition-colors hidden md:block">About</a>
          <a href="#lessons" className="text-sm font-semibold hover:text-[#FF1493] transition-colors hidden md:block">Lessons</a>
          <a href="#contact" className="text-sm font-semibold hover:text-[#FF1493] transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
        <div className="glass-panel p-2 px-6 mb-8 text-[#008080] font-bold text-sm md:text-base border-[#008080]/20 bg-[#008080]/5">
          🎵 Welcome to Soul Performing Music
        </div>

        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-slate-900 leading-tight">
          Discover Your <br />
          <span className="text-[#008080]">Rhythm</span>,
          <span className="text-[#FF1493]"> Master</span> Your <br />
          <span className="text-[#008080]">Instrument</span>
        </h2>

        <p className="text-lg md:text-xl text-slate-700 max-w-2xl font-medium mb-10">
          Comprehensive music lessons for all ages and skill levels. Passionate instructors guiding you on your musical journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-center">
          <a
            href="https://wa.me/60178877386"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-64 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 text-lg font-bold transition-transform hover:scale-105 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="mailto:soulperformingmusic@gmail.com"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-64 rounded-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-gray-900 px-8 py-4 text-lg font-bold transition-transform hover:scale-105 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email Us
          </a>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.facebook.com/soulperformingmusic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-64 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white px-8 py-4 text-lg font-bold transition-transform hover:scale-105 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </a>
          <a
            href="https://www.instagram.com/soulperforming/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-64 rounded-full bg-gradient-to-tr from-[#F77737] via-[#FD1D1D] to-[#833AB4] hover:opacity-90 text-white px-8 py-4 text-lg font-bold transition-transform hover:scale-105 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </a>
        </div>
      </section>

      {/* Lessons Section */}
      <section id="lessons" className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900">What We Offer</h3>
          <p className="text-slate-600 font-medium">Comprehensive music lessons tailored to your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Piano Lessons",
              description: "From classical to contemporary, learn to play the piano at your own pace with our expert instructors.",
              icon: "🎹"
            },
            {
              title: "Guitar Lessons",
              description: "Acoustic, electric, or bass - master the guitar with structured lessons for all skill levels.",
              icon: "🎸"
            },
            {
              title: "Vocal Training",
              description: "Develop your voice with professional vocal techniques and performance coaching.",
              icon: "🎤"
            },
            {
              title: "Violin Lessons",
              description: "Learn the beautiful art of violin playing with personalized instruction.",
              icon: "🎻"
            },
            {
              title: "Drum Lessons",
              description: "Feel the beat and learn percussion techniques from basic to advanced.",
              icon: "🥁"
            },
            {
              title: "Music Theory",
              description: "Build a strong foundation in music theory to enhance your musical journey.",
              icon: "📚"
            }
          ].map((lesson, idx) => (
            <div key={idx} className="glass-panel p-8 bg-white/60 hover:shadow-[0_8px_30px_rgba(135,206,235,0.3)] transition-all">
              <div className="text-5xl mb-4">{lesson.icon}</div>
              <h4 className="text-xl font-bold mb-3 text-slate-900">{lesson.title}</h4>
              <p className="text-slate-700">{lesson.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <div className="glass-panel p-8 md:p-12 bg-white/60">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6 text-slate-900">About Soul Performing Music</h3>
          <p className="text-lg text-slate-700 mb-4">
            At Soul Performing Music, we believe that music is for everyone. Whether you're a complete beginner picking up an instrument for the first time, or an experienced musician looking to refine your technique, our passionate instructors are here to guide you every step of the way.
          </p>
          <p className="text-lg text-slate-700">
            We offer a supportive and encouraging environment where students can explore their musical talents, build confidence, and develop a lifelong love for music.
          </p>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900">Find & Contact Us</h3>
          <p className="text-slate-600 font-medium">Visit us or get in touch</p>
        </div>
        
        <div className="glass-panel p-8 md:p-12 bg-white/60">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center md:text-left w-full md:w-1/2">
              <div className="text-5xl mb-4">📍</div>
              <h4 className="text-xl font-bold mb-2 text-slate-900">Our Studio</h4>
              <p className="text-slate-700 mb-4">2203, Jalan Timah, Taman Bandar Baru</p>
              <p className="text-slate-700 mb-6">31900 Kampar, Perak</p>
              
              <h4 className="text-xl font-bold mb-4 text-slate-900">Contact Us</h4>
              <div className="space-y-3 mb-6">
                <a 
                  href="mailto:soulperformingmusic@gmail.com" 
                  className="text-slate-700 hover:text-[#008080] transition-colors flex items-center justify-center md:justify-start gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  soulperformingmusic@gmail.com
                </a>
                <a 
                  href="tel:+60178877386" 
                  className="text-slate-700 hover:text-[#008080] transition-colors flex items-center justify-center md:justify-start gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  017-887 7386
                </a>
              </div>
              
              <div className="flex justify-center md:justify-start">
                <a 
                  href="https://maps.app.goo.gl/DiNxWQHSH9AXKnXV9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008080] hover:bg-[#006060] text-white px-6 py-3 font-bold transition-transform hover:scale-105 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Open Map
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7956.891853020919!2d101.14514009999999!3d4.3270332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cae31fad4172e1%3A0x2807af55ca7590ee!2sSoul%20Performing%20Music%20Enterprise!5e0!3m2!1sen!2smy!4v1782968102170!5m2!1sen!2smy" 
                width="100%" 
                height="400" 
                style={{border:0, borderRadius:'1rem'}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Soul Performing Music Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-12 text-center text-gray-500 font-medium text-sm border-t border-gray-200/50">
        <p>© 2026 Soul Performing Music. All rights reserved.</p>
      </footer>
    </main>
  );
}
