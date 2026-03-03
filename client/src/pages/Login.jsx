import React from 'react';
import { useLoginController } from '../controllers/useAuthController';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        isLoading,
        handleSubmit
    } = useLoginController();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F4] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-2xl border border-[#C6A75E]/20 overflow-hidden">
                    <div className="p-10">
                        <div className="flex justify-center mb-10">
                            <div className="p-4 rounded-full border border-[#C6A75E] flex items-center justify-center">
                                <LogIn className="w-8 h-8 text-[#C6A75E]" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-center text-[#1C1917] mb-3 tracking-tight">Refined Access</h2>
                        <p className="text-center text-[#78716C] mb-10 font-medium">Elevating your event management experience</p>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-[#78716C] ml-1">Email Credentials</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#78716C] group-focus-within:text-[#C6A75E] transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-4 bg-transparent border-b-2 border-[#78716C]/20 text-[#1C1917] placeholder-[#78716C]/50 focus:outline-none focus:border-[#C6A75E] transition-all"
                                        placeholder="your@elegantname.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-[#78716C] ml-1">Private Key</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#78716C] group-focus-within:text-[#C6A75E] transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-4 bg-transparent border-b-2 border-[#78716C]/20 text-[#1C1917] placeholder-[#78716C]/50 focus:outline-none focus:border-[#C6A75E] transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-[#1C1917] hover:bg-black text-white font-bold rounded-full border border-[#C6A75E] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#C6A75E]/20"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-[#C6A75E]/30 border-t-[#C6A75E] rounded-full animate-spin" />
                                        <span>Authorizing Access...</span>
                                    </div>
                                ) : (
                                    'AUTHENTICATE'
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-[#78716C] font-medium">
                                New to our inner circle?{' '}
                                <Link to="/register" className="text-[#C6A75E] hover:text-[#C6A75E]/80 font-bold underline underline-offset-4 transition-colors">
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
