import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function AdminLogin() {
  async function handleLogin(formData: FormData) {
    'use server';
    const username = formData.get('username');
    const password = formData.get('password');

    // TODO: REMOVE BEFORE GO LIVE! Mock Auth Bypass
    if (username === 'itadmin' && password === 'support') {
      const cookieStore = await cookies();
      cookieStore.set('admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 86400, // 24 hours
      });
      redirect('/');
    } else {
      // Throw error to UI not supported easily with pure server actions without useFormState, 
      // but we will simply redirect back to login for now in mock mode.
      redirect('/login?error=Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-slate-200 font-sans">
      <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Soulfest <span className="text-primary">Admin</span></h1>
          <p className="text-sm text-white/50">Enter your credentials to access the secure portal.</p>
        </div>
        
        <form action={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1 block">Username</label>
            <input 
              name="username" 
              type="text" 
              required 
              defaultValue="itadmin"
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1 block">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              defaultValue="support"
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button type="submit" className="mt-4 bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
}
