import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loading from './Loading';
import Error from './Error';
import { pageAnimation } from '../config';
import { clearCart } from '../store/actions';

const Address = (props) => {
    return <div className="ad-d">
        <div className={'ad-a' + (props.selected ? ' s' : '')} onClick={() => props.setAddress(props.address.id)}>
            <div>{props.address.streetAddress}</div>
            <div>{props.address.locality}</div>
            <div>{props.address.landmark}</div>
            <div>{props.address.phoneno}</div>
            {props.selected && <img src="/correct.svg" alt="checked" />}
        </div>
    </div>
}

export const GET_ADDRESSES = gql`
    query {
        addresses {
            id
            streetAddress
            locality
            landmark
            phoneno
        }
    }
`

const PLACE_ORDER = gql`
    mutation($address: Int!, $delivery: Float!, $items: [OrderItemInput!]!) {
        addOrder(AddressId: $address, deliveryCharge: $delivery, OrderItems: $items) {
            id
        }
    }
`

const GET_ORDERS = gql`
    query {
        orders {
            id
            total
            deliveryCharge
            address {
                id
                streetAddress
                locality
                landmark
                phoneno
            }
            status
            items
            createdAt
        }
    }
`

const Checkout = (props) => {
    const { error, loading, data } = useQuery(GET_ADDRESSES);
    const [ addOrder ] = useMutation(PLACE_ORDER, {
        update(cache, { data: { addOrder }}) {
            const { orders } = cache.readQuery({ query: GET_ORDERS })
            cache.writeQuery({
                query: GET_ORDERS,
                data: { orders: orders.concat([ addOrder ]) }
            })
            props.clearCart();
            history.push('/orderplaced');
        }
    });
    const history = useHistory();
    const [address, setAddress] = useState();
    const total = props.cart.reduce((c, i) => (i.qty * i.price) + c, 0);
    const addAddress = () => {
        history.push('/address');
    }
    const placeOrder = () => {
        console.log(typeof address)
        props.cart.forEach(f => {
            console.log(typeof f.id, typeof f.qty)
        })
        addOrder({
            variables: {
                address,
                delivery: 20,
                items: props.cart.map(({ id, qty }) => ({ id, qty })),
            },
        })
    }
    if(loading) return <Loading />
    if(error) return <Error msg="Something went wrong" />
    const foot = () => {
        const curAddress = _.find(data.addresses, ['id', address]);
        let selectedAaddress = ''
        if(curAddress) {
            const { streetAddress } = curAddress;
            selectedAaddress = _.truncate('Deliver to ' + streetAddress, { length: 25 });
        }
        return <motion.div initial={{ y: 129 }} animate={{ y: 0 }} className="cs-b">
            <div className="cs-t">
                <div className="cs-tl">
                    {selectedAaddress}
                </div>
                <div>Total: ₹ {total}</div>
            </div>
            <div className="cs-o">
                <button onClick={placeOrder}>Place order</button>
            </div>
        </motion.div>
    }
    return <motion.div {...pageAnimation} className="c-c">
        <div className="ad-c">
            <div className="ad-t">Select address</div>
            {data.addresses.map(a => <Address address={a} key={a.id} selected={address === a.id} setAddress={setAddress} />)}
            <div className="ad-a b" onClick={addAddress}>
                <div>Add new</div>
            </div>
        </div>
        {address && foot()}
    </motion.div>
}

const mapState = store => {
    return {
        cart: store.cart
    }
}

const actionCreators = {
    clearCart
}

export default connect(mapState, actionCreators)(Checkout);