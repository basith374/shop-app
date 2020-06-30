import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {
    const cart = useSelector(state => state.cart);
    const history = useHistory();
    return <div className="pf">
        <div className="pf-t" onClick={() => history.push('/')}>
            <button className="c-b">
                <img src="/browser.svg" alt="search" />
            </button>
        </div>
        <div className="pf-t" onClick={() => history.push('/search')}>
            <button className="c-b">
                <img src="/search.svg" alt="search" />
            </button>
        </div>
        <div className="pf-t" onClick={() => history.push('/cart')}>
            <button className="c-b">
                {cart.length > 0 && <span>{cart.length}</span>}
                <img src="/cart.svg" alt="cart" />
            </button>
        </div>
        <div className="pf-t" onClick={() => history.push('/account')}>
            <button className="c-b">
                <img src="/user.svg" alt="search" />
            </button>
        </div>
    </div>
}

export default Footer;