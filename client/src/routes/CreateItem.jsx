import React, { useState } from 'react'

const CreateItem = ({handleCreatedItem}) => {
    const [newName, setNewName] = useState('')
    const [newCost, setNewCost] = useState(0.0)
    const [newDescription, setNewDescription] = useState('')
    const [newVendor, setNewVendor] = useState('')
    const [newCount, setNewCount] = useState(0)

    const handleCreateItem = () => {
        if(newName.length <= 0 || newName.trim().length <= 0 
        || newCost.length <= 0 || newCost.trim().length <= 0 
        || newDescription.length <= 0 || newDescription.trim().length <= 0 
        || newVendor.length <= 0 || newVendor.trim().length <= 0
        || newCount.length <= 0 || newCount.trim().length <= 0){
            return
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
                handleCreatedItem(response, newName, newCost, newDescription, newVendor, newCount)
            })
    }

    return (
        <>
            <div className="space-y-3">
                <input type="text" placeholder="Enter product name" className="w-full p-2 border rounded" onChange={e => setNewName(e.target.value)} id="name"/>
                <input type="number" placeholder="Enter product cost" className="w-full p-2 border rounded" onChange={e => setNewCost(e.target.value)} id="cost" min={1}/>
                <input type="text" placeholder="Enter product description" className="w-full p-2 border rounded" onChange={e => setNewDescription(e.target.value)} id="description"/>
                <input type="text" placeholder="Enter product vendor" className="w-full p-2 border rounded" onChange={e => setNewVendor(e.target.value)} id="vendor"/>
                <input type="number" placeholder="Enter product count" className="w-full p-2 border rounded" onChange={e => setNewCount(e.target.value)} id="count" min={1}/>
                <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-500/50" onClick={() => {handleCreateItem()}}>Create</button>
            </div>
        </>
    )
}

export default CreateItem