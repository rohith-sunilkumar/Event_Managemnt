import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
    const { adminLogin } = useAdminAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await adminLogin(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(198,167,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(198,167,94,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A75E]/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-[#111111] border border-white/5 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden">
                    <div className="p-10">
                        {/* Logo */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-[#C6A75E]/10 border border-[#C6A75E]/30 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-8 h-8 text-[#C6A75E]" />
                            </div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
                            <p className="text-white/40 text-sm mt-1 font-medium">Restricted access — admins only</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#C6A75E] transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C6A75E]/50 focus:bg-white/8 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#C6A75E] transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C6A75E]/50 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-[#C6A75E] hover:bg-[#C6A75E]/90 text-black font-bold rounded-xl transition-all duration-300 text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        <span>Authenticating...</span>
                                    </div>
                                ) : 'Access Dashboard'}
                            </button>
                        </form>
                    </div>

                    {/* Bottom bar */}
                    <div className="px-10 py-4 bg-white/[0.02] border-t border-white/5 text-center">
                        <p className="text-[11px] text-white/20 font-medium">Event Management System · Admin v1.0</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
