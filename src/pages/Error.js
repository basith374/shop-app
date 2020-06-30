import React from 'react';
import { PropTypes } from 'prop-types';

function Error(props) {
    return <div className="emp">
        <div className="emp-c">
            <div className="emp-i"><img src="/error.svg" alt="Empty" /></div>
            <div className="emp-t">{props.msg}</div>
        </div>
    </div>
}

Error.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default Error;