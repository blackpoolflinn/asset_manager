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
        <button className='w-1/2 duration-200 hover:bg-red-600/50 text-blue font-bold hover:text-white' onClick={handleRemoveItem}>Delete</button>
    )
}

export default DeleteItem