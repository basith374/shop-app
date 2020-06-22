import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Image from './Image';

const CartItem = () => {
    const [count, setCount] = useState(1);
    const increment = () => setCount(count + 1);
    const decrement = () => {
        if(count > 0) setCount(count - 1);
    }
    return <div className="cs-i">
        <div className="cs-p"><Image src="https://picsum.photos/200/200" alt="product" /></div>
        <div className="cs-f">
            <div>Oranges</div>
            <div>₹ 99</div>
        </div>
        <div>
            <div className="cs-q">
                <button onClick={decrement}>-</button>
                <div>{count.toString().padStart(2, '0')}</div>
                <button onClick={increment}>+</button>
            </div>
        </div>
    </div>
}

const Cart = () => {
    const history = useHistory();
    const checkout = () => history.push('/checkout')
    return <div className="c-c c">
        <div className="cs-h">
            <button onClick={history.goBack}><img src="/back.svg" alt="back" /> Cart</button>
        </div>
        <div className="cs-l">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
        </div>
        <div className="cs-b">
            <div className="cs-t">
                <div className="cs-tl">2 Items</div>
                <div>Total: ₹ 1000</div>
            </div>
            <div className="cs-o">
                <button onClick={checkout}>Checkout</button>
            </div>
        </div>
    </div>
}

export default Cart;