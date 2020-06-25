import React, { useState, useEffect } from 'react';
import Image from './Image';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import EmptyPage from './EmptyPage';
import Error from './Error';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';

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
    const location = useLocation();
    const id = parseInt(location.pathname.split('/')[2], 10);
    const { error, loading, data } = useQuery(GET_PRODUCT, {
        variables: { id }
    })
    const [count, setCount] = useState(1);
    const [variant, setVariant] = useState();
    useEffect(() => {
        if(data && data.product) {
            setVariant(data.product.variants[0]);
        }
    }, [data]);
    const reduceCount = () => {
        if(count > 1) setCount(count - 1);
    }
    const increaseCount = () => {
        if(count < 100) setCount(count + 1);
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
                <div className="cs-t">
                    <div className="cs-tl">
                        <div className="cs-q">
                            <button onClick={reduceCount}>-</button>
                            <div>{count.toString().padStart(2, '0')}</div>
                            <button onClick={increaseCount}>+</button>
                        </div>
                    </div>
                    <div>Total: ₹ {variant ? variant.price * count: 0}</div>
                </div>
                <div className="cs-o">
                    <button>Add to cart</button>
                </div>
            </div>
        </div>
    }
    if(error) return <Error msg="Something went wrong" />
    if(loading) return <Loading />
    return render()
}

export default Product;