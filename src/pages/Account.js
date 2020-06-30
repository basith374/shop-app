import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import { logout } from '../store/actions';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { motion } from 'framer-motion';
import { GET_ORDERS } from './Orders';
import { pageAnimator } from '../config';

function Orders() {
    const { error, loading, data } = useQuery(GET_ORDERS);
    const history = useHistory();
    const showOrders = () => {
        if(data.orders.length) history.push('/orders');
    }
    const render = () => {
        if(error) return <div>Couldn&apos;t find any orders</div>
        if(loading) return <div>Finding previous orders...</div>
        if(data.orders.length === 0) return <div>No previous orders</div>
        return <div>{data.orders.length} Previous Orders</div>
    }
    return <div>
        <div className="ad-a" onClick={showOrders}>
            {render()}
        </div>
    </div>
}

function AuthPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth);
    const onLogout = () => {
        dispatch(logout());
    }
    return <motion.div className="c-c p" {...pageAnimator(history)}>
        <div className="ttx">Hello, {auth.name}</div>
        <div className="ad-c x">
            <div>
                <div className="ad-a" onClick={() => history.push('/addresses')}>
                    <div>Manage addresses</div>
                </div>
            </div>
            <Orders />
            <div className="cs-o">
                <button onClick={onLogout} className="red">Logout</button>
            </div>
        </div>
    </motion.div>
}

function Account() {
    const auth = useSelector(state => state.auth);
    return auth ? <AuthPage /> : <Login />
}

export default Account;