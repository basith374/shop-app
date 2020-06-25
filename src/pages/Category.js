import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Image from './Image';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import EmptyPage from './EmptyPage';
import Error from './Error';
import Loading from './Loading';

const ProductCard = (props) => {
    const { product } = props;
    const { images } = product;
    const { variants } = product;
    const history = useHistory();
    const select = () => history.push('/product/' + product.id);
    return <div className="pc-c" onClick={select}>
        <div className="pc-j">
            <div className="pc-i">
                <Image src={images[0].filename} alt={product.name} />
            </div>
        </div>
        <div className="pc-t">
            <div className="pc-tl">
                <div className="pc-tt">{product.name}</div>
                <div className="pc-tb"></div>
            </div>
            <div>
                <div className="pc-b">₹ {variants[0].price}</div>
            </div>
        </div>
    </div>
}

const GET_CATEGORY = gql`
    query($name: String!) {
        category(name: $name) {
            id
            products {
                id
                name
                images {
                    id
                    filename
                }
                variants {
                    id
                    price
                    name
                }
            }
        }
    }
`

const Category = () => {
    const location = useLocation();
    const name = location.pathname.split('/')[2];
    const { error, loading, data } = useQuery(GET_CATEGORY, {
        variables: { name }
    });
    const render = () => {
        if(!data.category) return <EmptyPage msg="We couldn't find that one :(" />
        const { products } = data.category;
        if(products.length === 0) return <EmptyPage msg="No products found :(" />
        return <div className="c-c">
            <div className="ct-c">
                {products.map(p => {
                    return <ProductCard key={p.id} product={p} />
                })}
            </div>
        </div>
    }
    if(error) return <Error msg="Something went wrong" />
    if(loading) return <Loading />
    return render()
}

export default Category;