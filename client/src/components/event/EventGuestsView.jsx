import React from 'react';
import { Users, ArrowLeft } from 'lucide-react';

const EventGuestsView = ({ event, setView }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C6A75E]">
                    <Users className="w-4 h-4" /> Guest List
                </div>
                <button
                    type="button"
                    onClick={() => setView('details')}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#78716C] hover:text-[#1C1917] transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to Details
                </button>
            </div>
            <div className="bg-white rounded-2xl border border-[#C6A75E]/20 overflow-hidden">
                {event.attendees && event.attendees.length > 0 ? (
                    <div className="divide-y divide-[#C6A75E]/10 max-h-[40vh] overflow-y-auto">
                        {event.attendees.map((attendee, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-[#1C1917] flex items-center justify-center text-[#C6A75E] font-bold uppercase">
                                    {attendee.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#1C1917]">{attendee.name}</p>
                                    <p className="text-xs text-[#78716C]">{attendee.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <Users className="w-8 h-8 text-[#C6A75E]/30 mx-auto mb-3" />
                        <p className="text-sm font-medium text-[#78716C]">No guests registered yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventGuestsView;
