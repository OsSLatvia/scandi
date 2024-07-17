import React from 'react';

function Weight({ record }){
    return (
        <React.Fragment>
            <p key={"weight-" + record.SKU}>Weight: {record.weight} kg</p>
        </React.Fragment>
    );
}

export default Weight;
