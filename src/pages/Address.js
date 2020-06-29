import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/react-hooks';
import _ from 'lodash';
import { gql } from 'apollo-boost';
import { GET_ADDRESSES } from './Checkout';

// requires auth
const GET_ADDRESS = gql`
    query($id: Int!) {
        address(id: $id) {
            streetAddress
            locality
            landmark
            pincode
        }
    }
`

// requires auth
const ADD_ADDRESS = gql`
    mutation($address: String!, $locality: String!, $landmark: String!, $pincode: String!) {
        addAddress(streetAddress: $address, locality: $locality, landmark: $landmark, pincode: $pincode, name: "Default", type: "Home") {
            id
        }
    }
`

// requires auth
const UPDATE_ADDRESS = gql`
    mutation($id: Int!, $address: String!, $locality: String!, $landmark: String!, $pincode: String!) {
        updateAddress(id: $id, streetAddress: $address, locality: $locality, landmark: $landmark, pincode: $pincode, name: "Default", type: "Home")
    }
`

const Address = () => {
    const history = useHistory();
    const params = useParams();
    const id = parseInt(params.id, 10);
    // queries
    const { data } = useQuery(GET_ADDRESS);
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
    // refs
    const address = useRef();
    const landmark = useRef();
    const locality = useRef();
    const pincode = useRef();
    //
    useEffect(() => {
        if(_.get(data, 'address')) {
            const { streetAddress, locality, landmark, pincode } = data.address;
            address.current.value = streetAddress;
            landmark.current.value = landmark;
            locality.current.value = locality;
            pincode.current.value = pincode;
        }
    }, [data]);
    // 
    const onSave = () => {
        const variables = {
            address: address.current.value,
            landmark: landmark.current.value,
            locality: locality.current.value,
            pincode: pincode.current.value,
        }
        if(_.get(data, 'address')) {
            updateAddress({
                variables: { ...variables, id },
                update(cache) {
                    const { address } = cache.readQuery({ query: GET_ADDRESS, variables: { id } })
                    cache.writeQuery({
                        query: GET_ADDRESS,
                        data: { address: {...address, ...variables} },
                    })
                    history.goBack();
                }
            })
        } else {
            addAddress({ variables })
        }
    }
    return <motion.div initial={{ x: 200 }} animate={{ x: 0 }} className="c-c">
        <div className="ax-c">
            <div className="sect">
                <div className="ttx">Add new address</div>
                <div className="grp">
                    <div className="lbl">Address</div>
                    <input type="text" ref={address} />
                </div>
                <div className="grp">
                    <div className="lbl">Landmark</div>
                    <input type="text" ref={landmark} />
                </div>
                <div className="grp">
                    <div className="lbl">Locality</div>
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
            {_.get(data, 'address') && <div className="sect hr">
                <div className="ttx">Delete address</div>
                <div className="grp">
                    <button className="red">Delete</button>
                </div>
            </div>}
        </div>
    </motion.div>
}

export default Address;