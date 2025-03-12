import useItems from "../hooks/items";
import React, { useState } from 'react'

const DisplayItems = () => {
    const[items, loadItems, addItem] = useItems()
    const [newName, setNewName] = useState('')
    const [newCost, setNewCost] = useState(0.0)
    const [newDescription, setNewDescription] = useState('')
    const [newVendor, setNewVendor] = useState('')
    const [newCount, setNewCount] = useState(0)

    let name = document.getElementById("name")
    let cost = document.getElementById("cost")
    let description = document.getElementById("description")
    let vendor = document.getElementById("vendor")
    let count = document.getElementById("count")

    const handling = () => {
        if(newName.length <= 0 || newName.trim().length <= 0 
        || newCost.length <= 0 || newCost.trim().length <= 0 
        || newDescription.length <= 0 || newDescription.trim().length <= 0 
        || newVendor.length <= 0 || newVendor.trim().length <= 0
        || newCount.length <= 0 || newCount.trim().length <= 0){
            return //check that the deck isn't empty
        }
        fetch("/api/item", {
            method: "POST", //POST request to create a item
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: newName, cost: newCost, description: newDescription, vendor: newVendor, count: newCount}) 
            }).then(
              resp => resp.json()
            ).then((response) => {
                response_handling(response)
            })
    }

    const response_handling = (response) => {
        name.value = '' //Resest fields so another item can be added
        cost.value = ''
        description.value = '' 
        vendor.value = ''
        count.value = '' 
        addItem(response.id, newName, newCost, newDescription, newVendor, newCount) //handle new deck created without having to load all decks again
    }

    return (
        <>
            <div className="grid grid-rows-4 gap-1 text-center m-5">
                <div className="flex justify-between w-full font-bold">
                    <div>product name</div>
                    <div>product cost</div>
                    <div>product description</div>
                    <div>product vendor</div>
                    <div>product count</div>
                </div>
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
            <div className="flex flex-col mx-5">
                <input placeholder='name' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewName(e.target.value)} id="name"></input>
                <input placeholder='cost' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewCost(e.target.value)} id="cost" type="number" min={1}></input>
                <input placeholder='description' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewDescription(e.target.value)} id="description"></input>
                <input placeholder='vendor' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewVendor(e.target.value)} id="vendor"></input>
                <input placeholder='count' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewCount(e.target.value)} id="count" type="number" min={1}></input>
                <button className='bg-red-50 text-blue font-bold rounded-md px-8 py-2 mb-5' type='submit' onClick={() => {handling()}}>Create</button> {/* on click goes to handling function */}
            </div>
        </>
    )

}

export default DisplayItems