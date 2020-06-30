import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PropTypes } from 'prop-types';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import Image from './Image';
import { pageAnimator } from '../config';

// requires auth
export const GET_ORDERS = gql`
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
            items {
                productVariantId
                name
                price
                qty
                image {
                    filename
                }
            }
            createdAt
        }
    }
`

function OrderItem(props) {
    const { order } = props;
    const { status } = order;
    const renderStatus = () => {
        if(status === 0) return <div>Ordered</div>
        if(status === 1) return <div>Processing</div>
        if(status === 2) return <div>Dispatched</div>
        if(status === 3) return <div>Delivered</div>
        if(status === 4) return <div>Cancelled</div>
        return null
    }
    const reorderable = status === 4 || status === 3;
    return <div className="ad-a">
        <div className="ad-s">Order #{order.id}</div>
        <div className="ad-r">
            {order.items.map(i => {
                return <div key={i.productVariantId} className="ad-o">
                    <div className="ad-oi"><Image src={i.image.filename} alt={i.name} /></div>
                    <div className="ad-ot">{i.name} x {i.qty}</div>
                    <div>{i.qty * i.price}</div>
                </div>
            })}
        </div>
        <div>
            <div>{renderStatus()}</div>
            {reorderable && <div>Reorder</div>}
        </div>
    </div>
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
}

function Order() {
    const history = useHistory();
    const { error, loading, data } = useQuery(GET_ORDERS);
    if(loading) return <Loading />
    if(error) return <Error msg="Something went wrong" />
    return <motion.div {...pageAnimator(history)} className="c-c p">
        <div className="ttx">Your orders</div>
        <div className="ad-c">
            {data.orders.map(o => <OrderItem key={o.id} order={o} />)}
        </div>
    </motion.div>
}

export default Order;