import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Image from './Image';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Error from './Error';
import Loading from './Loading';
import EmptyPage from './EmptyPage';
import { followLink } from './Home';
import { connect } from 'react-redux';

export const SearchContext = React.createContext({})

const SearchResult = (props) => {
    const history = useHistory();
    const search = useContext(SearchContext);
    const select = () => {
        followLink(history, props.content)
        search(false);
    }
    return <div className="ss-t" onClick={select}>
        <div className="ss-p"><Image src={props.content.image} alt={props.content.name} /></div>
        <div className="ss-m">
            <div className="ss-d">{props.content.name}</div>
            {/* <div className="ss-w">₹ 99</div> */}
        </div>
    </div>
}

const SEARCH = gql`
    query($str: String!) {
        search(str: $str) {
            id
            name
            type
            image
        }
    }
`

const Search = (props) => {
    const [search, setSearch] = useState('');
    const { error, loading, data } = useQuery(SEARCH, {
        variables: { str: search },
        skip: !search
    });
    const onSearch = ({ target: { value } }) => setSearch(value);
    const render = () => {
        if(error) return <Error msg="Something went wrong" />
        if(loading) return <Loading />
        if(search && data.search.length === 0) return <EmptyPage msg="No results" />
        return search ? data.search.map(s => <SearchResult key={s.id} content={s} />) : null
    }
    return <div className="ss-c">
        <div className="ss-h">
            <div className="ss-i">
                <input type="search" placeholder="Search" value={search} onChange={onSearch} />
                <img src="/close.svg" alt="search" onClick={props.close} />
            </div>
        </div>
        <div className="ss-r">
            {render()}
        </div>
    </div>
}

function Header(props) {
    const history = useHistory();
    const location = useLocation();
    const [search, setSearch] = useState(false);
    const showCart = () => {
        history.push('/cart');
    }
    const { cart } = props;
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
                {cart.length > 0 && <span>{cart.length}</span>}
                <img src="/cart.svg" alt="cart" />
            </button>
        </div>
        {search && <SearchContext.Provider value={setSearch}>
            <Search close={() => setSearch(false)} />
        </SearchContext.Provider>}
    </div>
}

const mapState = store => {
    return {
        cart: store.cart
    }
}

export default connect(mapState)(Header);