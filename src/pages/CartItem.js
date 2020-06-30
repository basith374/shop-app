
import React from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import Image from './Image';
import { increaseQty, decreaseQty } from '../store/actions';

const CartItem = (props) => {
    const { item } = props;
    const dispatch = useDispatch();
    const increment = () => {
        dispatch(increaseQty(item));
    }
    const decrement = () => {
        dispatch(decreaseQty(item));
    }
    return <div className="cs-i">
        <div className="cs-p"><Image src={item.image} alt={item.name} /></div>
        <div className="cs-f">
            <div>{item.name}</div>
            <div>₹ {item.price * item.qty}</div>
        </div>
        <div>
            <div className="cs-q">
                <button onClick={decrement}>-</button>
                <div>{item.qty.toString().padStart(2, '0')}</div>
                <button onClick={increment}>+</button>
            </div>
        </div>
    </div>
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
}

export default CartItem;