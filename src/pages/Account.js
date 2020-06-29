import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import { logout } from '../store/actions';

function AuthPage() {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    }
    return <div className="ad-c">
        <div>
            <div className="ad-d">
                <div className={'ad-a'}>
                    <div>Manage addresses</div>
                </div>
            </div>
        </div>
        <div>
            <div className="ad-d">
                <div className={'ad-a'}>
                    <div>No previous orders</div>
                </div>
            </div>
        </div>
        <div className="cs-o">
            <button onClick={onLogout}>Logout</button>
        </div>
    </div>
}

function Account() {
    const auth = useSelector(state => state.auth);
    return <div className="c-c a">
        {auth ? <AuthPage /> : <Login />}
    </div>
}

export default Account;