import React from 'react';
import { PropTypes } from 'prop-types';

function EmptyPage(props) {
    return <div className="emp">
        <div className="emp-c">
            <div className="emp-i err"><img src="/shine.svg" alt="Empty" /></div>
            <div className="emp-t">{props.msg}</div>
        </div>
    </div>
}

EmptyPage.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default EmptyPage;