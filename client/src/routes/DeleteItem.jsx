import React, { useState } from 'react'

const DeleteItem = ({handleRemovedItem, itemID}) => {

    const handleRemoveItem = () => {
        fetch(`/api/items/${itemID}`, {
            method: "DELETE" 
        })
        .then((resp) => {
            handleRemovedItem(itemID)
        })
    }

    return (
        <button className='duration-200 hover:text-red-500' onClick={handleRemoveItem}>Delete</button>
    )
}

export default DeleteItem