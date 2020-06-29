import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
    const location = useLocation();
    if(location.pathname === '/cart') return null;
    if(location.pathname === '/login') return null;
    return <motion.div className="ph" initial={{ y: -60 }} animate={{ y: 0 }}>
        <div className="ph-l">
            <div>Delivering to Thalassery</div>
        </div>
        <div>
        </div>
    </motion.div>
}

export default Header;