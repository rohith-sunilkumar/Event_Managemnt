import React from 'react';
import { useRegisterController } from '../controllers/useAuthController';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';

const Register = () => {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        error,
        isSuccess,
        isLoading,
        handleSubmit
    } = useRegisterController();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F4] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl border border-[#C6A75E]/20 overflow-hidden">
                    <div className="p-10">
                        <div className="flex justify-center mb-10">
                            <div className="p-4 rounded-full border border-[#C6A75E] flex items-center justify-center">
                                <UserPlus className="w-8 h-8 text-[#C6A75E]" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-center text-[#1C1917] mb-3 tracking-tight">Request Membership</h2>
                        <p className="text-center text-[#78716C] mb-10 font-medium">Join our premier event network</p>

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

                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-600"
                            >
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">Welcome to the circle. Redirecting...</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[#78716C] ml-1">Preferred Handle</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#78716C] group-focus-within:text-[#C6A75E] transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-4 bg-transparent border-b-2 border-[#78716C]/20 text-[#1C1917] placeholder-[#78716C]/50 focus:outline-none focus:border-[#C6A75E] transition-all"
                                        placeholder="Display Name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
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

                            <div className="space-y-2">
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
                                disabled={isLoading || isSuccess}
                                className="w-full py-4 bg-[#1C1917] hover:bg-black text-white font-bold rounded-full border border-[#C6A75E] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#C6A75E]/20 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-[#C6A75E]/30 border-t-[#C6A75E] rounded-full animate-spin" />
                                        <span>Submitting Request...</span>
                                    </div>
                                ) : (
                                    'JOIN THE CIRCLE'
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-[#78716C] font-medium">
                                Already identified?{' '}
                                <Link to="/login" className="text-[#C6A75E] hover:text-[#C6A75E]/80 font-bold underline underline-offset-4 transition-colors">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
