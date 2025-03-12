import useItems from "../hooks/items";
import React, { useState } from 'react'

const DisplayItems = () => {
    const[items, loadItems] = useItems()

    return (
        <>
            <div className="grid grid-rows-4 gap-1 w-full">
                {items !== null && items.map((item, i) => ( //checks whether items array is empty and continues if not
                    <div className="flex justify-between w-full" key={i}>
                        <div>{item.product_name}</div>
                        <div>{item.product_cost}</div>
                        <div>{item.product_description}</div>
                        <div>{item.product_vendor}</div>
                        <div>{item.product_count}</div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col">

            </div>
        </>
    )

}

export default DisplayItems