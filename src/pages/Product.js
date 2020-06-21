import React, { useState } from 'react';
import Image from './Image';

const Product = () => {
    let [variant, setVariant] = useState('250g');
    let variants = ['250g', '500g', '1kg', '2kg', '5kg', '10kg'];
    return <div className="c-c">
        <div className="pp-c">
            <div className="pp-x">Sugar</div>
            <div className="pp-v">
                <div className="pp-i">
                    <Image src="https://picsum.photos/300/200" alt="product" />
                </div>
                <div className="pp-t">
                    <div className="pp-l">Sugar - Loose</div>
                    <div>₹ 100</div>
                </div>
            </div>
            <div className="pp-o">
                <div className="pp-q">
                    {variants.map(v => {
                        let select = () => setVariant(v);
                        return <div key={v} onClick={select} className={'pp-z' + (variant === v ? ' s' : '')}>{v}</div>
                    })}
                </div>
            </div>
            <div className="pp-d">
                <div>Regular sugar (no sulpher)</div>
            </div>
        </div>
        <div className="cs-b">
            <div className="cs-t">
                <div className="cs-tl">
                    <div className="cs-q">
                        <button>-</button>
                        <div>01</div>
                        <button>+</button>
                    </div>
                </div>
                <div>Total: ₹ 1000</div>
            </div>
            <div className="cs-o">
                <button>Add to cart</button>
            </div>
        </div>
    </div>
}

export default Product;