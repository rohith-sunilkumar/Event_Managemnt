import React from 'react';
import HomeNavbar from '../components/layout/HomeNavbar';
import EditProfileModal from '../components/profile/EditProfileModal';
import { useProfileController } from '../controllers/useProfileController';
import { motion } from 'framer-motion';
import { User, Shield, Calendar, MapPin, Mail, Edit3, Camera } from 'lucide-react';
import { SERVER_URL, DEFAULT_PROFILE_IMAGE } from '../services/api';

const Profile = () => {
    const {
        user, logout, updateProfile, statsData, loading,
        isEditModalOpen, handleCreateEventRedirect, toggleEditModal
    } = useProfileController();

    const stats = [
        { label: 'Total Events', value: statsData.totalEvents.toString(), icon: Calendar },
        { label: 'Total Attendees', value: statsData.totalAttendees.toLocaleString(), icon: User },
        { label: 'Success Rate', value: `${statsData.successRate}%`, icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-[#F5F5F4] selection:bg-[#C6A75E]/30 text-[#1C1917]">
            <HomeNavbar user={user} onLogout={logout} onCreateEvent={handleCreateEventRedirect} />

            <main className="max-w-7xl mx-auto px-8 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ProfileSidebar user={user} onEdit={() => toggleEditModal(true)} />
                    <div className="lg:col-span-2 space-y-8">
                        <StatsGrid stats={stats} loading={loading} />
                        <BiographyCard user={user} />
                        <InsightsBanner />
                    </div>
                </motion.div>
            </main>

            <EditProfileModal isOpen={isEditModalOpen} onClose={() => toggleEditModal(false)} user={user} onUpdate={updateProfile} />
        </div>
    );
};

/* Profile sidebar with avatar, info, and edit button */
const ProfileSidebar = ({ user, onEdit }) => (
    <div className="lg:col-span-1 space-y-8">
        <div className="bg-white rounded-[32px] p-8 border border-[#C6A75E]/20 shadow-xl shadow-[#C6A75E]/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A75E]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#C6A75E]/10 transition-colors" />

            <div className="relative flex flex-col items-center">
                <ProfileAvatar user={user} onEdit={onEdit} />

                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#1C1917] tracking-tight">{user?.username}</h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <Shield className="w-4 h-4 text-[#C6A75E]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A75E]">Verified Executive</span>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#C6A75E]/10 my-8" />

                <div className="w-full space-y-4">
                    <InfoRow icon={Mail} label="Email Address" value={user?.email} truncate />
                    <InfoRow icon={MapPin} label="Global Base" value={user?.location || 'Silicon Valley, CA'} />
                </div>

                <button
                    onClick={onEdit}
                    className="w-full mt-10 py-4 bg-[#1C1917] text-white rounded-2xl text-xs font-bold uppercase tracking-widest border border-[#C6A75E]/50 hover:bg-black transition-all shadow-lg shadow-[#C6A75E]/10 flex items-center justify-center gap-3"
                >
                    <Edit3 className="w-4 h-4 text-[#C6A75E]" /> Refine Profile
                </button>
            </div>
        </div>
    </div>
);

/* Avatar with camera edit button */
const ProfileAvatar = ({ user, onEdit }) => (
    <div className="relative mb-6">
        <div className="w-32 h-32 bg-[#1C1917] rounded-full flex items-center justify-center border-4 border-[#C6A75E]/10 shadow-2xl relative overflow-hidden">
            <img
                src={user?.profileImage ? `${SERVER_URL}${user.profileImage}` : DEFAULT_PROFILE_IMAGE}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE; }}
            />
        </div>
        <button
            onClick={onEdit}
            className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full border border-[#C6A75E]/20 flex items-center justify-center shadow-lg hover:border-[#C6A75E] transition-all group/cam"
        >
            <Camera className="w-5 h-5 text-[#1C1917] group-hover/cam:scale-110 transition-transform" />
        </button>
    </div>
);

/* Reusable info row (email, location) */
const InfoRow = ({ icon: Icon, label, value, truncate }) => (
    <div className="flex items-center gap-4 text-[#78716C]">
        <div className="w-10 h-10 rounded-xl bg-[#F5F5F4] flex items-center justify-center border border-[#C6A75E]/5">
            <Icon className="w-4 h-4 text-[#C6A75E]" />
        </div>
        <div className={truncate ? 'overflow-hidden' : ''}>
            <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className={`text-sm font-medium text-[#1C1917] ${truncate ? 'truncate' : ''}`}>{value}</p>
        </div>
    </div>
);

/* Stats grid with skeleton loading */
const StatsGrid = ({ stats, loading }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
            [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-[#C6A75E]/10 shadow-sm animate-pulse">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F4] mb-4" />
                    <div className="h-2 w-20 bg-[#F5F5F4] rounded mb-2" />
                    <div className="h-6 w-12 bg-[#F5F5F4] rounded" />
                </div>
            ))
        ) : (
            stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-[#C6A75E]/10 shadow-sm hover:border-[#C6A75E]/40 transition-colors group/stat">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F4] flex items-center justify-center border border-[#C6A75E]/5 mb-4 group-hover/stat:bg-[#C6A75E]/5 transition-colors">
                        <stat.icon className="w-5 h-5 text-[#C6A75E]" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#1C1917] tracking-tight">{stat.value}</p>
                </div>
            ))
        )}
    </div>
);

/* Biography card */
const BiographyCard = ({ user }) => (
    <div className="bg-white rounded-[32px] p-10 border border-[#C6A75E]/20 shadow-xl shadow-[#C6A75E]/5">
        <h2 className="text-xl font-bold text-[#1C1917] mb-8 flex items-center gap-4">
            <span className="w-2 h-8 bg-[#C6A75E] rounded-full" />
            Executive Biography
        </h2>
        <p className="text-[#78716C] leading-relaxed text-lg italic whitespace-pre-wrap">
            "{user?.bio || "Passionate about orchestrating high-impact events that bridge the gap between innovation and legacy. With a focus on premium aesthetics and seamless execution, I strive to create unforgettable experiences for the modern elite."}"
        </p>

        <div className="mt-10 pt-10 border-t border-[#C6A75E]/10 flex items-center gap-10">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A75E] mb-2">Member Since</p>
                <p className="text-sm font-bold text-[#1C1917]">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'March 2024'}
                </p>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A75E] mb-2">Account Rating</p>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Shield key={i} className="w-4 h-4 text-[#C6A75E]" />)}
                </div>
            </div>
        </div>
    </div>
);

/* Portfolio insights dark banner */
const InsightsBanner = () => (
    <div className="bg-[#1C1917] rounded-[32px] p-10 border border-[#C6A75E]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C6A75E]/10 to-transparent" />
        <div className="relative flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold text-white mb-2">Portfolio Insights</h2>
                <p className="text-[#78716C] text-sm">Review your impact across the global event network.</p>
            </div>
            <button className="px-8 py-4 bg-white text-[#1C1917] rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#C6A75E] hover:text-white transition-all">
                View Report
            </button>
        </div>
    </div>
);

export default Profile;
