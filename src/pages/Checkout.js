import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Loading from './Loading';
import Error from './Error';
import { pageAnimator } from '../config';
import { clearCart } from '../store/actions';
import { Address, GET_ADDRESSES } from './Addresses';
import { GET_ORDERS } from './Orders';

// requires auth
const PLACE_ORDER = gql`
    mutation($address: Int!, $delivery: Float!, $items: [OrderItemInput!]!) {
        addOrder(AddressId: $address, deliveryCharge: $delivery, OrderItems: $items) {
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
            items {
                productVariantId
                name
                price
                qty
            }
            createdAt
        }
    }
`

const Checkout = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { error, loading, data } = useQuery(GET_ADDRESSES);
    const [ addOrder ] = useMutation(PLACE_ORDER, {
        update(cache, { data: { addOrder }}) {
            if(_.get(cache, 'data.data.ROOT_QUERY.orders')) {
                const { orders } = cache.readQuery({ query: GET_ORDERS })
                cache.writeQuery({
                    query: GET_ORDERS,
                    data: { orders: orders.concat([ addOrder ]) }
                })
            }
            dispatch(clearCart());
            history.push('/orderplaced');
        }
    });
    const history = useHistory();
    const [address, setAddress] = useState();
    const total = cart.reduce((c, i) => (i.qty * i.price) + c, 0);
    const addAddress = () => {
        history.push('/address');
    }
    const placeOrder = () => {
        addOrder({
            variables: {
                address,
                delivery: 20,
                items: cart.map(({ id, qty }) => ({ id, qty })),
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
    return <motion.div {...pageAnimator(history)} className="c-c p">
        <div className="ad-c">
            <div className="ad-t">Select address</div>
            {data.addresses.map(a => <Address address={a} key={a.id} selected={address === a.id} onSelect={setAddress} />)}
            <div className="ad-a b" onClick={addAddress}>
                <div>Add new</div>
            </div>
        </div>
        {address && foot()}
    </motion.div>
}

export default Checkout;