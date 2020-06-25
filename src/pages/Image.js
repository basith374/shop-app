import React, { useState } from 'react';

const Image = (props) => {
    const [loaded, setLoaded] = useState(false);
    let img = props.src;
    return <div className="img-c">
        <img src={img} alt={props.alt} onLoad={() => setLoaded(true)} />
        {!loaded && <div className="img-p"></div>}
    </div>
}

export default Image;