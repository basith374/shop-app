import React, { useState } from 'react';

const Image = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [id, setId] = useState('id/' + parseInt(Math.random() * 600) + '/');
    let img = props.src;
    if(img.startsWith('https://picsum')) {
        img = props.src.slice(0, 22) + id + props.src.slice(22);
    }
    return <div className="img-c">
        <img src={img} alt={props.alt} onLoad={() => setLoaded(true)} />
        {!loaded && <div className="img-p"></div>}
    </div>
}

export default Image;