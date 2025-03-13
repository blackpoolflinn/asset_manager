import useItems from "../hooks/items";
import React, { useState } from 'react'
import CreateItem from "./CreateItem";
import DeleteItem from "./DeleteItem";

const DisplayItems = () => {
    const[items, loadItems, addItem, removeItem] = useItems()

    let name = document.getElementById("name")
    let cost = document.getElementById("cost")
    let description = document.getElementById("description")
    let vendor = document.getElementById("vendor")
    let count = document.getElementById("count")

    const handleCreatedItem = (response, newName, newCost, newDescription, newVendor, newCount) => {
        name.value = '' //Resest fields so another item can be added
        cost.value = ''
        description.value = '' 
        vendor.value = ''
        count.value = '' 
        addItem(response.id, newName, newCost, newDescription, newVendor, newCount) //handle new deck created without having to load all decks again
    }

    return (
        <>
            <div className="grid grid-rows-4 gap-1 text-center m-auto outline">
                <div className="grid grid-cols-6 w-full font-bold outline">
                    <div>product name</div>
                    <div>product cost</div>
                    <div>product description</div>
                    <div>product vendor</div>
                    <div>product count</div>
                    <div></div>
                </div>
                {items !== null && items.map((item, i) => ( //checks whether items array is empty and continues if not
                    <div className="grid grid-cols-6 w-full py-3 outline" key={i}>
                        <div className="overflow-y-auto">{item.product_name}</div>
                        <div className="overflow-y-auto">{item.product_cost}</div>
                        <div className="overflow-y-auto">{item.product_description}</div>
                        <div className="overflow-y-auto">{item.product_vendor}</div>
                        <div className="overflow-y-auto">{item.product_count}</div>
                        <DeleteItem itemID={item.product_id} handleRemovedItem={(id) => {removeItem(id)}} />
                    </div>
                ))}
            </div>
            <CreateItem handleCreatedItem={handleCreatedItem}/>
        </>
    )

}

export default DisplayItems