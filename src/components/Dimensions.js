import React from 'react';

function Dimensions({ record }) {
    return (
        <React.Fragment>
            <p key={"dimensions-" + record.SKU}>Dimensions: {record.height}x{record.width}x{record.length}</p>
        </React.Fragment>
    );
}

export default Dimensions;
