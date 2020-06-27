
import React from 'react';
import { connect } from 'react-redux';
import Image from './Image';
import { increaseQty, decreaseQty } from '../store/actions';

const CartItem = (props) => {
    const { item } = props;
    const increment = () => {
        props.increaseQty(item);
    }
    const decrement = () => {
        props.decreaseQty(item);
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

const mapState = store => {
    return {}
}

const actionCreators = {
    increaseQty,
    decreaseQty,
}

export default connect(mapState, actionCreators)(CartItem);