import { useState } from 'react'
import { supabase } from "../supabase";
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { alert(error.message); setLoading(false); return }

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', data.user.id).single()

    if (profile?.role !== 'admin') {
      alert('Access denied')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <main className="w-full max-w-md">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-300 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-700" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-8 space-y-7">

            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-600/15 border border-gray-500/25">
                <Sparkles className="w-3.5 h-3.5 text-gray-300" />
                <span className="text-gray-300 text-xs font-medium">Admin Portal</span>
              </div>
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Sign in to manage your portfolio</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Email</label>
                <div className="flex items-center bg-white/8 border border-white/15 rounded-xl overflow-hidden focus-within:border-gray-400/60 transition-colors">
                  <Mail className="w-4 h-4 text-gray-500 ml-4 shrink-0" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent px-3 py-3 text-gray-100 placeholder-gray-400 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Password</label>
                <div className="flex items-center bg-white/8 border border-white/15 rounded-xl overflow-hidden focus-within:border-gray-400/60 transition-colors">
                  <Lock className="w-4 h-4 text-gray-500 ml-4 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent px-3 py-3 text-gray-100 placeholder-gray-400 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="mr-4 shrink-0 p-2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="relative group/btn w-full mt-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-300 rounded-xl opacity-50 blur group-hover/btn:opacity-70 transition duration-300" />
                <div className="relative h-11 bg-[#0f0f0f] rounded-xl border border-white/10 flex items-center justify-center gap-2 overflow-hidden">
                  <div className="absolute inset-0 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-gray-400/20 to-gray-300/20" />
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="relative text-sm font-medium text-white">Sign In</span>
                      <LogIn className="relative w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}