import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/react-hooks';
import _ from 'lodash';
import { gql } from 'apollo-boost';
import { GET_ADDRESSES } from './Addresses';
import { pageAnimator } from '../config';

// requires auth
const ADD_ADDRESS = gql`
    mutation($houseName: String!, $streetAddress: String!, $locality: String!, $landmark: String!, $pincode: String!) {
        addAddress(houseName: $houseName, streetAddress: $streetAddress, locality: $locality, landmark: $landmark, pincode: $pincode, type: "Home") {
            id
        }
    }
`

// requires auth
const UPDATE_ADDRESS = gql`
    mutation($id: Int!, $streetAddress: String!, $locality: String!, $landmark: String!, $pincode: String!) {
        updateAddress(id: $id, houseName: $houseName, streetAddress: $streetAddress, locality: $locality, landmark: $landmark, pincode: $pincode, type: "Home")
    }
`

// requires auth
const DELETE_ADDRESS = gql`
    mutation($id: Int!) {
        deleteAddress(id: $id) {
            id
        }
    }
`

const Address = () => {
    const history = useHistory();
    const params = useParams();
    const id = parseInt(params.id, 10);
    // queries
    const { data } = useQuery(GET_ADDRESSES);
    const curAddress = data ? _.find(data.addresses, ['id', id]) : null;
    const [ addAddress ] = useMutation(ADD_ADDRESS, {
        update(cache, { data: { addAddress }}) {
            const { addresses } = cache.readQuery({ query: GET_ADDRESSES })
            cache.writeQuery({
                query: GET_ADDRESSES,
                data: { addresses: addresses.concat([ addAddress ]) }
            })
            history.goBack()
        }
    });
    const [ updateAddress ] = useMutation(UPDATE_ADDRESS);
    const [ deleteAddress ] = useMutation(DELETE_ADDRESS, {
        update(cache) {
            const { addresses } = cache.readQuery({ query: GET_ADDRESSES })
            cache.writeQuery({
                query: GET_ADDRESSES,
                data: { addresses: addresses.filter(a => a.id !== id) }
            })
            history.goBack()
        }
    });
    // refs
    const house = useRef();
    const address = useRef();
    const landmark = useRef();
    const locality = useRef();
    const pincode = useRef();
    //
    useEffect(() => {
        if(curAddress) {
            const { houseName, streetAddress, locality: loc, landmark: lan, pincode: pin } = curAddress;
            house.current.value = houseName;
            address.current.value = streetAddress;
            landmark.current.value = lan;
            locality.current.value = loc;
            pincode.current.value = pin;
        }
    }, [curAddress]);
    // 
    const onSave = () => {
        const variables = {
            houseName: house.current.value,
            streetAddress: address.current.value,
            landmark: landmark.current.value,
            locality: locality.current.value,
            pincode: pincode.current.value,
        }
        if(_.get(data, 'address')) {
            updateAddress({
                variables: { ...variables, id },
                update(cache) {
                    const { addresses } = cache.readQuery({ query: GET_ADDRESSES, variables: { id } })
                    cache.writeQuery({
                        query: GET_ADDRESSES,
                        data: { addresses: addresses.map(a => a.id === id ? {...a, ...variables} : a) },
                    })
                    history.goBack();
                }
            })
        } else {
            addAddress({ variables })
        }
    }
    const onDelete = () => {
        deleteAddress({
            variables: { id }
        })
    }
    return <motion.div {...pageAnimator(history)} className="c-c p">
        <div className="ax-c">
            <div className="">
                <div className="ttx">{curAddress ? 'Edit' : 'Add new'} address</div>
                <div className="grp">
                    <div className="lbl">House name/Flat no</div>
                    <input type="text" ref={house} />
                </div>
                <div className="grp">
                    <div className="lbl">Road</div>
                    <input type="text" ref={address} />
                </div>
                <div className="grp">
                    <div className="lbl">Landmark</div>
                    <input type="text" ref={landmark} />
                </div>
                <div className="grp">
                    <div className="lbl">Area</div>
                    <input type="text" ref={locality} />
                </div>
                <div className="grp">
                    <div className="lbl">Pincode</div>
                    <input type="text" ref={pincode} />
                </div>
                <div className="grp">
                    <button onClick={onSave}>{_.get(data, 'address') ? 'Update' : 'Save'}</button>
                </div>
            </div>
            {curAddress && <div className="sect hr">
                <div className="ttx">Delete address</div>
                <div className="grp">
                    <button className="red" onClick={onDelete}>Delete</button>
                </div>
            </div>}
        </div>
    </motion.div>
}

export default Address;