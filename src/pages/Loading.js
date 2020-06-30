import React from 'react';

function Loading() {
    return <div className="lds">
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    </div>
}

export default Loading;