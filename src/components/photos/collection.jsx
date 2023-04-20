import React from 'react'

function Collection({ name, image }) {
    return (
        <div className="collection">
            <img className="collection__big" src={image} alt="Item" />
            <h4>{name}</h4>
        </div>
    );
}


export default Collection
