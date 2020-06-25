import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Image from './Image';

export const SearchContext = React.createContext({})

const SearchResult = () => {
    const history = useHistory();
    const search = useContext(SearchContext);
    const select = () => {
        history.push('/product');
        search(false);
    }
    return <div className="ss-t" onClick={select}>
        <div className="ss-p"><Image src="https://picsum.photos/200/200" alt="product" /></div>
        <div className="ss-m">
            <div className="ss-d">Sugar - Loose</div>
            <div className="ss-w">₹ 99</div>
        </div>
    </div>
}

const Search = (props) => {
    return <div className="ss-c">
        <div className="ss-h">
            <div className="ss-i">
                <input type="search" placeholder="Search" />
                <img src="/close.svg" alt="search" onClick={props.close} />
            </div>
        </div>
        <div className="ss-r">
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
        </div>
    </div>
}

function Header() {
    const history = useHistory();
    const location = useLocation();
    const [search, setSearch] = useState(false);
    const showCart = () => {
        history.push('/cart');
    }
    if(location.pathname === '/cart') return null;
    return <div className="ph">
        <div className="ph-l">
            <div onClick={() => history.push('/')}>Telyshopper</div>
        </div>
        <div>
            <button className="c-b" onClick={() => setSearch(true)}>
                <img src="/search.svg" alt="search" />
            </button>
            <button className="c-b" onClick={showCart}>
                <span>99</span>
                <img src="/cart.svg" alt="cart" />
            </button>
        </div>
        {search && <SearchContext.Provider value={setSearch}>
            <Search close={() => setSearch(false)} />
        </SearchContext.Provider>}
    </div>
}

export default Header;