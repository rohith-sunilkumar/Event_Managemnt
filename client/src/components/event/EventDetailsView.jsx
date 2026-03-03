import React from 'react';
import { AlignLeft, Users, UserPlus, CheckCircle2, User, Mail } from 'lucide-react';

const EventDetailsView = ({
    event,
    isCreator,
    setView,
    isAlreadyRegistered,
    name,
    setName,
    email,
    setEmail,
    handleRegister,
    isRegistering
}) => {
    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C6A75E]">
                    <AlignLeft className="w-4 h-4" /> The Narrative
                </div>
                <p className="text-[#78716C] text-base font-medium leading-[1.6] tracking-wide italic whitespace-pre-line">
                    {event.description}
                </p>
                {isCreator && (
                    <button
                        type="button"
                        onClick={() => setView('guests')}
                        className="mt-2 px-5 py-2 bg-[#C6A75E]/10 text-[#C6A75E] hover:bg-[#C6A75E] hover:text-white border border-[#C6A75E]/30 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
                    >
                        <Users className="w-3 h-3" /> View Guests ({event.attendees?.length || 0})
                    </button>
                )}
            </div>

            {!isCreator && (
                <div className="mt-8 pt-6 border-t border-[#C6A75E]/10">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C6A75E] mb-4">
                        <UserPlus className="w-4 h-4" /> Attend This Event
                    </div>
                    {isAlreadyRegistered ? (
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-medium">You&apos;re registered for this event.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <FormInput
                                    icon={User}
                                    label="Name"
                                    type="text"
                                    value={name}
                                    onChange={setName}
                                    placeholder="Your name"
                                />
                                <FormInput
                                    icon={Mail}
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    placeholder="your@email.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isRegistering}
                                className="w-full sm:w-auto px-6 py-2.5 bg-[#1C1917] hover:bg-black text-white text-sm font-bold rounded-full border border-[#C6A75E] transition-all disabled:opacity-50"
                            >
                                {isRegistering ? 'Registering...' : 'Register to Attend'}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </>
    );
};

const FormInput = ({ icon: Icon, label, type, value, onChange, placeholder }) => (
    <div className="space-y-1.5">
        <label className="text-[9px] font-bold uppercase tracking-widest text-[#78716C]">{label}</label>
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#C6A75E]/20 rounded-xl text-[#1C1917] placeholder-[#78716C]/50 focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/30"
                required
            />
        </div>
    </div>
);

export default EventDetailsView;
