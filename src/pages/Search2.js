import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Image from './Image';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { motion } from 'framer-motion';
import { PropTypes } from 'prop-types';
import Error from './Error';
import Loading from './Loading';
import EmptyPage from './EmptyPage';
import { followLink } from './Home';

const SearchResult = (props) => {
    const history = useHistory();
    const select = () => {
        followLink(history, props.content)
    }
    return <div className="ss-t" onClick={select}>
        <div className="ss-p"><Image src={props.content.image} alt={props.content.name} /></div>
        <div className="ss-m">
            <div className="ss-d">{props.content.name}</div>
            {/* <div className="ss-w">₹ 99</div> */}
        </div>
    </div>
}

SearchResult.propTypes = {
    content: PropTypes.object.isRequired,
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

const Search = () => {
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
        <motion.div initial={{ padding: 0 }} animate={{ padding: 15 }} className="ss-h">
            <div className="ss-i">
                <input type="search" placeholder="Search" value={search} onChange={onSearch} />
                <img src="/close.svg" alt="search" onClick={() => setSearch('')} />
            </div>
        </motion.div>
        <div className="ss-r">
            {render()}
        </div>
    </div>
}

export default Search;