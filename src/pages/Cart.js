import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import EmptyPage from './EmptyPage';
import CartItem from './CartItem';
import { pageAnimation } from '../config';

const Cart = (props) => {
    const history = useHistory();
    const checkout = () => history.push('/checkout');
    const { cart } = props;
    const total = cart.reduce((c, i) => (i.qty * i.price) + c, 0);
    const render = () => {
        if(cart.length === 0) return <EmptyPage msg="Empty cart" />
        return <div className="cs-c">
            <div className="cs-l">
                {cart.map(i => <CartItem key={i.id} item={i} />)}
            </div>
            <div className="cs-b" key={1}>
                <div className="cs-t">
                    <div className="cs-tl">{cart.length} Item{cart.length === 1 ? '' : 's'}</div>
                    <div>Total: ₹ {total}</div>
                </div>
                <div className="cs-o">
                    <button onClick={checkout}>Checkout</button>
                </div>
            </div>
        </div>
    }
    return <motion.div {...pageAnimation} className="c-c c">
        <div className="cs-h">
            <button onClick={history.goBack}><img src="/back.svg" alt="back" /> Cart</button>
        </div>
        <div className="cs-e">
            {render()}
        </div>
    </motion.div>
}

const mapState = store => {
    return {
        cart: store.cart
    }
}

export default connect(mapState)(Cart);