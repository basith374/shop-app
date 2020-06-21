import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Search from './Search';

export const SearchContext = React.createContext({})

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