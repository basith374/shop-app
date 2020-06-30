import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { motion } from 'framer-motion';

const hidden_routes = [
    '/cart',
    '/login',
    '/account',
    '/orders',
    '/addresses',
    '/address',
    '/address/:id',
    '/checkout',
]

function Header() {
    const location = useLocation();
    for(let r of hidden_routes) {
        if(matchPath(location.pathname, { path: r})) return null;
    }
    return <motion.div className="ph" initial={{ y: -60 }} animate={{ y: 0 }}>
        <div className="ph-l">
            <div>Delivering to Thalassery</div>
        </div>
        <div>
        </div>
    </motion.div>
}

export default Header;