import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, User, Calendar, PlusCircle, LayoutDashboard, UserCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL, DEFAULT_PROFILE_IMAGE } from '../../services/api';

const HomeNavbar = ({ user, onLogout, onCreateEvent }) => {
    const navigate = useNavigate();

    return (
        <nav className="border-b border-[#C6A75E]/20 px-8 py-4 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div
                        onClick={() => navigate('/')}
                        className="w-10 h-10 bg-[#1C1917] rounded-full flex items-center justify-center border border-[#C6A75E] shadow-xl shadow-[#C6A75E]/10 cursor-pointer"
                    >
                        <Calendar className="w-5 h-5 text-[#C6A75E]" />
                    </div>
                    <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-xl font-bold tracking-tighter leading-none">EVENTIFY</span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C6A75E] mt-1">Premier Management</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <div className="flex items-center gap-3 group cursor-pointer outline-none">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">COORDINATOR</p>
                                    <p className="text-sm font-bold text-[#1C1917] group-hover:text-[#C6A75E] transition-colors">{user?.username || 'Member'}</p>
                                </div>
                                <div className="w-11 h-11 bg-[#F5F5F4] rounded-full flex items-center justify-center border border-[#C6A75E]/30 group-hover:border-[#C6A75E] transition-all group-data-[state=open]:border-[#C6A75E] group-data-[state=open]:shadow-lg group-data-[state=open]:shadow-[#C6A75E]/10 overflow-hidden">
                                    {user?.profileImage ? (
                                        <img
                                            src={`${SERVER_URL}${user.profileImage}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE; }}
                                        />
                                    ) : (
                                        <img
                                            src={DEFAULT_PROFILE_IMAGE}
                                            alt="Default Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="min-w-[240px] bg-white rounded-2xl p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] border border-[#C6A75E]/20 mt-2 z-[100] animate-in fade-in zoom-in duration-200"
                                sideOffset={5}
                                align="end"
                            >
                                <DropdownMenu.Label className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#78716C] border-b border-[#F5F5F4] mb-2">
                                    Event Tools
                                </DropdownMenu.Label>

                                <DropdownMenu.Item
                                    onSelect={onCreateEvent}
                                    className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest bg-[#1C1917] hover:bg-black text-white outline-none cursor-pointer transition-all group mb-2 border border-[#C6A75E]/50 shadow-lg shadow-[#C6A75E]/10"
                                >
                                    <PlusCircle className="w-4 h-4 text-[#C6A75E]" />
                                    Create Event
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                    onSelect={() => navigate('/dashboard')}
                                    className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#1C1917] rounded-xl hover:bg-[#F5F5F4] hover:text-[#C6A75E] outline-none cursor-pointer transition-colors group"
                                >
                                    <LayoutDashboard className="w-4 h-4 text-[#C6A75E]" />
                                    Dashboard Reflection
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                    onSelect={() => navigate('/profile')}
                                    className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#1C1917] rounded-xl hover:bg-[#F5F5F4] hover:text-[#C6A75E] outline-none cursor-pointer transition-colors group"
                                >
                                    <UserCircle className="w-4 h-4 text-[#C6A75E]" />
                                    Private Profile
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className="h-[1px] bg-[#F5F5F4] my-2" />

                                <DropdownMenu.Item
                                    onSelect={onLogout}
                                    className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-600 rounded-xl hover:bg-red-50 outline-none cursor-pointer transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Terminate Session
                                </DropdownMenu.Item>

                                <DropdownMenu.Arrow className="fill-white" />
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                </div>
            </div>
        </nav>
    );
};

export default HomeNavbar;
