import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, CalendarDays, UserCheck, Globe,
    Trash2, AlertCircle, RefreshCw, X
} from 'lucide-react';
import api, { SERVER_URL } from '../../services/api';
import AdminLayout from '../components/AdminLayout';

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex items-center gap-5"
    >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-white text-3xl font-bold">{value ?? '—'}</p>
        </div>
    </motion.div>
);

// ── Confirm Dialog ──────────────────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            >
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <h3 className="text-white font-bold text-lg">Confirm Delete</h3>
                </div>
                <p className="text-white/50 text-sm mb-8">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
                    >Cancel</button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 text-sm font-bold transition-all"
                    >Delete</button>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
);

// ── Overview Section ────────────────────────────────────────────────────────
const OverviewSection = ({ stats, loading }) => (
    <div className="space-y-6">
        <p className="text-white/30 text-sm font-medium">Real-time platform statistics</p>
        {loading ? (
            <div className="flex items-center justify-center h-48">
                <div className="w-8 h-8 border-2 border-[#C6A75E]/30 border-t-[#C6A75E] rounded-full animate-spin" />
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Total Users" value={stats?.totalUsers} icon={Users} color="bg-blue-500/10 text-blue-400" />
                <StatCard label="Total Events" value={stats?.totalEvents} icon={CalendarDays} color="bg-[#C6A75E]/10 text-[#C6A75E]" />
                <StatCard label="Total Attendees" value={stats?.totalAttendees} icon={UserCheck} color="bg-emerald-500/10 text-emerald-400" />
                <StatCard label="Public Events" value={stats?.publicEvents} icon={Globe} color="bg-purple-500/10 text-purple-400" />
            </div>
        )}
    </div>
);

// ── Events Section ──────────────────────────────────────────────────────────
const EventsSection = ({ events, loading, onDelete }) => (
    <div className="space-y-4">
        <p className="text-white/30 text-sm font-medium">{events.length} events found</p>
        {loading ? (
            <div className="flex items-center justify-center h-48">
                <div className="w-8 h-8 border-2 border-[#C6A75E]/30 border-t-[#C6A75E] rounded-full animate-spin" />
            </div>
        ) : (
            <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30">Event</th>
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden md:table-cell">Category</th>
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden lg:table-cell">Creator</th>
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden md:table-cell">Date</th>
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden md:table-cell">Visibility</th>
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden sm:table-cell">Attendees</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {events.map((event, i) => (
                                <motion.tr
                                    key={event._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center relative">
                                                {event.image ? (
                                                    <img
                                                        src={event.image.startsWith('/') ? `${SERVER_URL}${event.image}` : event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                            e.currentTarget.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center"
                                                    style={{ display: event.image ? 'none' : 'flex' }}
                                                >
                                                    <CalendarDays className="w-5 h-5 text-[#C6A75E]/40" />
                                                </div>
                                            </div>
                                            <span className="text-white text-sm font-medium truncate max-w-[160px]">{event.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-white/40 text-xs">{event.category}</span>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <span className="text-white/40 text-xs">{event.createdBy?.username || '—'}</span>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-white/40 text-xs">{event.date}</span>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${event.visibility === 'public'
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'bg-white/5 text-white/30'
                                            }`}>
                                            {event.visibility}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span className="text-white/40 text-xs">{event.attendees?.length || 0}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => onDelete(event._id, event.title)}
                                            className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {events.length === 0 && (
                        <div className="text-center py-16 text-white/20 text-sm">No events found</div>
                    )}
                </div>
            </div>
        )}
    </div>
);

// ── Users Section ───────────────────────────────────────────────────────────
const UsersSection = ({ users, loading, onDelete }) => (
    <div className="space-y-4">
        <p className="text-white/30 text-sm font-medium">{users.length} users registered</p>
        {loading ? (
            <div className="flex items-center justify-center h-48">
                <div className="w-8 h-8 border-2 border-[#C6A75E]/30 border-t-[#C6A75E] rounded-full animate-spin" />
            </div>
        ) : (
            <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30">User</th>
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden md:table-cell">Email</th>
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden sm:table-cell">Role</th>
                                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden lg:table-cell">Joined</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {users.map((user, i) => (
                                <motion.tr
                                    key={user._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-[#C6A75E]/10 border border-[#C6A75E]/20 flex items-center justify-center flex-shrink-0">
                                                {user.profileImage ? (
                                                    <img
                                                        src={`${SERVER_URL}${user.profileImage}`}
                                                        alt={user.username}
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                ) : (
                                                    <span className="text-[#C6A75E] text-xs font-bold uppercase">{user.username?.[0]}</span>
                                                )}
                                            </div>
                                            <span className="text-white text-sm font-medium">{user.username}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-white/40 text-xs">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${user.role === 'admin'
                                            ? 'bg-[#C6A75E]/10 text-[#C6A75E]'
                                            : 'bg-white/5 text-white/30'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <span className="text-white/30 text-xs">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => onDelete(user._id, user.username)}
                                                className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && (
                        <div className="text-center py-16 text-white/20 text-sm">No users found</div>
                    )}
                </div>
            </div>
        )}
    </div>
);

// ── Main Dashboard ──────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const [section, setSection] = useState('overview');
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(null); // { type, id, label }
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchSection = useCallback(async (sec) => {
        setLoading(true);
        try {
            if (sec === 'overview') {
                const res = await api.get('/admin/stats');
                setStats(res.data.stats);
            } else if (sec === 'events') {
                const res = await api.get('/admin/events');
                setEvents(res.data.events);
            } else if (sec === 'users') {
                const res = await api.get('/admin/users');
                setUsers(res.data.users);
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchSection(section); }, [section, fetchSection]);

    const handleDeleteConfirm = async () => {
        if (!confirm) return;
        try {
            if (confirm.type === 'event') {
                await api.delete(`/admin/events/${confirm.id}`);
                setEvents(prev => prev.filter(e => e._id !== confirm.id));
                showToast('Event deleted');
            } else {
                await api.delete(`/admin/users/${confirm.id}`);
                setUsers(prev => prev.filter(u => u._id !== confirm.id));
                showToast('User deleted');
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Delete failed', 'error');
        } finally {
            setConfirm(null);
        }
    };

    return (
        <AdminLayout activeSection={section} onSectionChange={setSection}>
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium shadow-2xl ${toast.type === 'error'
                            ? 'bg-red-500/10 border-red-500/20 text-red-400'
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            }`}
                    >
                        {toast.msg}
                        <button onClick={() => setToast(null)}><X className="w-4 h-4 opacity-60" /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confirm Dialog */}
            {confirm && (
                <ConfirmDialog
                    message={`Are you sure you want to delete "${confirm.label}"? This action cannot be undone.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setConfirm(null)}
                />
            )}

            {/* Refresh Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => fetchSection(section)}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/20 text-sm transition-all disabled:opacity-40"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Section Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {section === 'overview' && <OverviewSection stats={stats} loading={loading} />}
                    {section === 'events' && (
                        <EventsSection
                            events={events}
                            loading={loading}
                            onDelete={(id, label) => setConfirm({ type: 'event', id, label })}
                        />
                    )}
                    {section === 'users' && (
                        <UsersSection
                            users={users}
                            loading={loading}
                            onDelete={(id, label) => setConfirm({ type: 'user', id, label })}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </AdminLayout>
    );
};

export default AdminDashboard;
