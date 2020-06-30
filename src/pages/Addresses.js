import React from 'react';
import { motion } from 'framer-motion';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { pageAnimator } from '../config';
import Loading from './Loading';
import Error from './Error';

export const Address = (props) => {
    return <div className="ad-d">
        <div className={'ad-a' + (props.selected ? ' s' : '')} onClick={() => props.onSelect(props.address.id)}>
            <div>{props.address.houseName}</div>
            <div>{props.address.streetAddress}</div>
            <div>{props.address.locality}, {props.address.landmark}</div>
            <div>{props.address.pincode}</div>
            {props.selected && <img src="/correct.svg" alt="checked" />}
        </div>
    </div>
}

Address.propTypes = {
    address: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.bool,
}

// requires auth
export const GET_ADDRESSES = gql`
    query {
        addresses {
            id
            houseName
            streetAddress
            locality
            landmark
            phoneno
            pincode
        }
    }
`

function Addresses() {
    const history = useHistory();
    const { error, loading, data } = useQuery(GET_ADDRESSES);
    const addAddress = () => {
        history.push('/address');
    }
    const onSelect = (id) => {
        history.push('/address/' + id)
    }
    if(loading) return <Loading />
    if(error) return <Error msg="Something went wrong" />
    return <motion.div {...pageAnimator(history)} className="c-c p">
        <div className="ttx">Address book</div>
        <div className="ad-c">
            {data.addresses.map(a => <Address address={a} key={a.id} onSelect={() => onSelect(a.id)} />)}
            <div className="ad-a b" onClick={addAddress}>
                <div>Add new</div>
            </div>
        </div>
    </motion.div>
}

export default Addresses;