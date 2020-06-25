import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Image from './Image';
import EmptyPage from './EmptyPage';
import Error from './Error';
import Loading from './Loading';
import { addToCart, increaseQty, decreaseQty } from '../store/actions';

const GET_PRODUCT = gql`
    query($id: Int!) {
        product(id: $id) {
            name
            description
            variants {
                id
                name
                price
            }
            images {
                id
                filename
            }
        }
    }
`

const Product = (props) => {
    const { cart } = props;
    const location = useLocation();
    const id = parseInt(location.pathname.split('/')[2], 10);
    const { error, loading, data } = useQuery(GET_PRODUCT, {
        variables: { id }
    })
    const [variant, setVariant] = useState();
    const qty = variant ? _.get(_.find(cart, ['id', variant.id]), 'qty', 0) : 0;
    useEffect(() => {
        if(data && data.product) {
            setVariant(data.product.variants[0]);
        }
    }, [data]);
    const decreaseCount = () => {
        props.decreaseQty(variant);
    }
    const increaseCount = () => {
        props.increaseQty(variant);
    }
    const onAdd = () => {
        props.addToCart(data.product, variant);
    }
    const render = () => {
        if(!data.product) return <EmptyPage msg="Couldn't find that one :(" />
        const product = data.product
        const image = product.images[0];
        const singleVariant = product.variants.length === 1;
        return <div className="c-c">
            <div className="pp-c">
                <div className="pp-x">{data.product.name}</div>
                <div className="pp-i">
                    <div className="pp-v">
                        <Image src={image && image.filename} alt="product" />
                    </div>
                </div>
                {singleVariant && <div className="pp-g">
                    <div className="pp-t">
                        <div className="pp-l">{product.variants[0].name}</div>
                        <div>₹ {product.variants[0].price}</div>
                    </div>
                </div>}
                {!singleVariant && <div className="pp-o">
                    <div className="pp-q">
                        {product.variants.map(v => {
                            let select = () => setVariant(v);
                            return <div key={v.id} onClick={select} className={'pp-z' + (variant === v ? ' s' : '')}>{v.name} - {v.price}</div>
                        })}
                    </div>
                </div>}
                <div className="pp-g">
                    <div className="pp-d">
                        <div>{product.description}</div>
                    </div>
                </div>
            </div>
            <div className="cs-b">
                {variant && qty > 0 && <div className="cs-t">
                    <div className="cs-tl">
                        <div className="cs-q">
                            <button onClick={decreaseCount}>-</button>
                            <div>{qty.toString().padStart(2, '0')}</div>
                            <button onClick={increaseCount}>+</button>
                        </div>
                    </div>
                    <div>Total: ₹ {variant ? variant.price * qty: 0}</div>
                </div>}
                <div className="cs-o">
                    <button onClick={onAdd}>Add to cart</button>
                </div>
            </div>
        </div>
    }
    if(error) return <Error msg="Something went wrong" />
    if(loading) return <Loading />
    return render()
}

const mapState = store => {
    return {
        cart: store.cart,
    }
}

const actionCreators = {
    addToCart,
    increaseQty,
    decreaseQty,
}

export default connect(mapState, actionCreators)(Product);