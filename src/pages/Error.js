import React from 'react';

export default (props) => {
    return <div className="emp">
        <div className="emp-c">
            <div className="emp-i"><img src="/error.svg" alt="Empty" /></div>
            <div className="emp-t">{props.msg}</div>
        </div>
    </div>
}