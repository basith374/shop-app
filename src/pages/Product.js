import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion  } from 'framer-motion';
import _ from 'lodash';
import Image from './Image';
import EmptyPage from './EmptyPage';
import Error from './Error';
import Loading from './Loading';
import { addToCart, increaseQty, decreaseQty } from '../store/actions';
import { pageAnimator } from '../config';

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

const Product = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const history = useHistory();
    const params = useParams();
    const id = parseInt(params.id, 10);
    const { error, loading, data } = useQuery(GET_PRODUCT, {
        variables: { id }
    })
    const [variant, setVariant] = useState();
    const cartItem = _.find(cart, ['id', _.get(variant, 'id')]);
    const inCart = cartItem !== undefined;
    const qty = variant ? _.get(cartItem, 'qty', 0) : 0;
    useEffect(() => {
        if(data && data.product) {
            setVariant(data.product.variants[0]);
        }
    }, [data]);
    const decreaseCount = () => {
        dispatch(decreaseQty(variant));
    }
    const increaseCount = () => {
        dispatch(increaseQty(variant));
    }
    const onAdd = () => {
        dispatch(addToCart(data.product, variant));
    }
    const gotoCart = () => {
        history.push('/cart');
    }
    const render = () => {
        if(!data.product) return <EmptyPage msg="Couldn't find that one :(" />
        const product = data.product
        const image = product.images[0];
        const singleVariant = product.variants.length === 1;
        return <div className="c-c p">
            <motion.div className="pp-c" {...pageAnimator(history)}>
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
            </motion.div>
            <motion.div className="cs-b" initial={{ y: 129 }} animate={{ y: 0 }}>
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
                    {inCart && <button onClick={gotoCart}>View Cart</button>}
                    {!inCart && <button onClick={onAdd}>Add to cart</button>}
                </div>
            </motion.div>
        </div>
    }
    if(error) return <Error msg="Something went wrong" />
    if(loading) return <Loading />
    return render()
}

export default Product;