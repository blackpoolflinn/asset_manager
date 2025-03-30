import React, { useState } from 'react'

const CreateItem = ({handleCreatedItem}) => {
    const [newName, setNewName] = useState('')
    const [newCost, setNewCost] = useState(null)
    const [newDescription, setNewDescription] = useState('')
    const [newVendor, setNewVendor] = useState('')
    const [newCount, setNewCount] = useState(null)
    let name = document.getElementById("name")
    let cost = document.getElementById("cost")
    let description = document.getElementById("description")
    let vendor = document.getElementById("vendor")
    let count = document.getElementById("count")
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState("")

    const handleCreateItem = () => {
        if(newName.length <= 0 || newName.trim().length <= 0 
        || newDescription.length <= 0 || newDescription.trim().length <= 0 
        || newVendor.length <= 0 || newVendor.trim().length <= 0 ||
        newCost == null || newCount == null){
            setError("Empty data fields detected")
            setShowError(true)
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
                name.value = '' //Resets fields so another item can be added
                cost.value = ''
                description.value = '' 
                vendor.value = ''
                count.value = '' 
                setNewName('')
                setNewDescription('')
                setNewCost(0.0)
                setNewCount(0)
                setNewVendor('')
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
                {!showError ? <></> : <div className="text-red-500 pt-1 text-center">{error}</div>}
            </div>
        </>
    )
}

export default CreateItem