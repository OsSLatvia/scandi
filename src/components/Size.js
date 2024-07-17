import React from 'react';

function Size({ record }) {
    return (
        <React.Fragment>
            <p key={"size-" + record.SKU}>Size: {record.size} MB</p>
        </React.Fragment>
    );
}

export default Size;
