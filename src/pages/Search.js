import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import EmptyPage from './EmptyPage';
import Loading from './Loading';
import Error from './Error';

const Search = () => {
    const location = useLocation();
    const history = useHistory();
    const { error, loading, data } = useQuery(gql`
        query($str: String) {
            search(str: $str) {
                name
                image
                type
                id
            }
        }
    `, {
        variables: {
            str: location.pathname.split('/').slice(2).join('')
        }
    })
    const render = () => {
        if(data.search.length === 0) return <EmptyPage msg={"Coudn't find that :("} />
        return <div className="ct-c">
            {data.search.map(s => {
                let details = '';
                let price = '';
                const onClick = () => {
                    const id = s.type === 'product' ? s.id : s.name;
                    history.push('/' + s.type + '/' + id);
                }
                return <div className="pc-c" onClick={onClick}>
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
                </div>
            })}
        </div>
    }
    if(error) return <Error msg="Something went wrong" />
    if(loading) return <Loading />
    return <div className="c-c">
        {render()}
    </div>
}

export default Search;