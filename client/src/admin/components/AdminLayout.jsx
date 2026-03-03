import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, CalendarDays,
    LogOut, ShieldCheck, Menu, X, ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const NAV_ITEMS = [
    { label: 'Overview', icon: LayoutDashboard, section: 'overview' },
    { label: 'Events', icon: CalendarDays, section: 'events' },
    { label: 'Users', icon: Users, section: 'users' },
];

const AdminLayout = ({ children, activeSection, onSectionChange }) => {
    const { admin, adminLogout } = useAdminAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await adminLogout();
        navigate('/admin/login');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-6 py-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C6A75E]/10 border border-[#C6A75E]/30 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-[#C6A75E]" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm tracking-wide">Admin Panel</p>
                        <p className="text-white/30 text-[10px] font-medium uppercase tracking-widest">Control Center</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {NAV_ITEMS.map(({ label, icon: Icon, section }) => {
                    const isActive = activeSection === section;
                    return (
                        <button
                            key={section}
                            onClick={() => { onSectionChange(section); setMobileOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                                ${isActive
                                    ? 'bg-[#C6A75E]/15 text-[#C6A75E] border border-[#C6A75E]/20'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="flex-1 text-left">{label}</span>
                            {isActive && <ChevronRight className="w-3 h-3 opacity-60" />}
                        </button>
                    );
                })}
            </nav>

            {/* Admin Info + Logout */}
            <div className="px-4 py-6 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#C6A75E] text-xs font-bold uppercase">
                            {admin?.username?.[0] || 'A'}
                        </span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-white text-xs font-bold truncate">{admin?.username}</p>
                        <p className="text-[#C6A75E] text-[10px] font-bold uppercase tracking-widest">Administrator</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col bg-[#0F0F0F] border-r border-white/5 fixed h-full top-0 left-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -256 }}
                            animate={{ x: 0 }}
                            exit={{ x: -256 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed left-0 top-0 h-full w-64 bg-[#0F0F0F] border-r border-white/5 z-50 lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden text-white/40 hover:text-white transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Admin Portal</p>
                            <h1 className="text-white font-bold text-lg capitalize">{activeSection}</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A75E]/10 border border-[#C6A75E]/20">
                        <div className="w-2 h-2 rounded-full bg-[#C6A75E] animate-pulse" />
                        <span className="text-[#C6A75E] text-[10px] font-bold uppercase tracking-widest">Live</span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
