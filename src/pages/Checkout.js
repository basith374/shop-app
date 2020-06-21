import React, { useState } from 'react';

const Address = (props) => {
    return <div className={'ad-a' + (props.selected ? ' s' : '')} onClick={() => props.setAddress(props.address.id)}>
        <div>{props.address.address}</div>
        <div>{props.address.locality}</div>
        <div>{props.address.landmark}</div>
        <div>{props.address.phone}</div>
        {props.selected && <img src="/correct.svg" alt="checked" />}
    </div>
}

const Checkout = () => {
    const [address, setAddress] = useState(1);
    const addresses = [
        {
            id: 1,
            address: 'Kenz, Valakathan vayal',
            locality: 'Dharmadam',
            landmark: 'Near Coronation School',
            phone: '9995243664',
        },
        {
            id: 2,
            address: 'SANA',
            locality: 'Dharmadam',
            landmark: 'Behind Post Office',
            phone: '9995243664',
        },
    ]
    return <div className="c-c">
        <div className="ad-c">
            {addresses.map(a => <Address address={a} key={a.address} selected={address === a.id} setAddress={setAddress} />)}
        </div>
        <div className="cs-b">
            <div className="cs-t">
                <div className="cs-tl">
                    Deliver to Home
                </div>
                <div>Total: ₹ 1000</div>
            </div>
            <div className="cs-o">
                <button>Place order</button>
            </div>
        </div>
    </div>
}

export default Checkout;