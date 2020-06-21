import React from 'react';
import { useHistory } from 'react-router-dom';
import Image from './Image';

const ProductCard = () => {
    const history = useHistory();
    const select = () => history.push('/product');
    return <div className="pc-c" onClick={select}>
        <div className="pc-j">
            <div className="pc-i">
                <Image src={'https://picsum.photos/220/200'} alt="product" />
            </div>
        </div>
        <div className="pc-t">
            <div className="pc-tl">
                <div className="pc-tt">Some product</div>
                <div className="pc-tb">details</div>
            </div>
            <div>
                <div className="pc-b">₹ 99</div>
            </div>
        </div>
    </div>
}

const Category = () => {
    return <div className="c-c">
        <div className="ct-c">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
}

export default Category;