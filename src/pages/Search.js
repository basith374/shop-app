import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from './Header';
import Image from './Image';

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

export default Search;