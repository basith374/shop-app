import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { motion } from 'framer-motion';
import EmptyPage from './EmptyPage';
import Loading from './Loading';
import Error from './Error';
import { staggerAnimation } from '../config';

const SEARCH = gql`
    query($str: String) {
        search(str: $str) {
            name
            image
            type
            id
        }
    }
`

const Search = () => {
    const params = useParams();
    const { str } = params;
    const history = useHistory();
    const { error, loading, data } = useQuery(SEARCH, {
        variables: { str }
    })
    const render = () => {
        if(data.search.length === 0) return <EmptyPage msg={"Coudn't find that :("} />
        return <motion.div {...staggerAnimation.container} className="ct-c">
            {data.search.map(s => {
                let details = '';
                let price = '';
                const onClick = () => {
                    const id = s.type === 'product' ? s.id : s.name;
                    history.push('/' + s.type + '/' + id);
                }
                return <motion.div {...staggerAnimation.child} className="pc-c" onClick={onClick}>
                    <div className="pc-j">
                        <div className="pc-i">
                            <img src={s.image} alt={s.name} />
                        </div>
                    </div>
                    <div className="pc-t">
                        <div className="pc-tl">
                            <div className="pc-tt">{s.name}</div>
                            <div className="pc-tb">{details}</div>
                        </div>
                        <div>
                            <div className="pc-b">{price}</div>
                        </div>
                    </div>
                </motion.div>
            })}
        </motion.div>
    }
    if(error) return <Error msg="Something went wrong" />
    if(loading) return <Loading />
    return <div className="c-c">
        {render()}
    </div>
}

export default Search;