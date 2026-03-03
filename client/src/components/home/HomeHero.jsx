import React from 'react';
import { motion } from 'framer-motion';

const HomeHero = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-20 border-l-4 border-[#C6A75E] pl-8"
        >
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#C6A75E] mb-4">Curated Collection</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Your Exclusive Events</h1>
            <p className="text-[#78716C] text-lg font-medium leading-relaxed">Refining the art of coordination. Manage your prestigious gatherings with absolute precision and elegance.</p>
        </motion.div>
    );
};

export default HomeHero;
