import React from 'react';
import { motion } from 'framer-motion';

const OrderPlaced = () => {
    return <div className="c-c ch">
        <div className="emp">
            <div >
                <svg className="emp-i" width="200" viewBox="0 0 50 50">
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} strokeWidth="2" fill="none" stroke="#2ecc71" d="M 5, 25 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0" />
                    <motion.path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 1" strokeWidth="2" fill="none" stroke="#2ecc71" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .5 }} d="M14,26 L 22,33 L 35,16" />
                </svg>
                <div className="emp-t x">Order placed</div>
            </div>
        </div>
    </div>
}

export default OrderPlaced;