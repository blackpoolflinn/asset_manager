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
            <div className="flex flex-col mx-5 w-min">
                <input placeholder='name' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewName(e.target.value)} id="name"></input>
                <input placeholder='cost' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewCost(e.target.value)} id="cost" type="number" min={1}></input>
                <input placeholder='description' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewDescription(e.target.value)} id="description"></input>
                <input placeholder='vendor' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewVendor(e.target.value)} id="vendor"></input>
                <input placeholder='count' className='placeholder:opacity-50 focus:outline-none' onChange={e => setNewCount(e.target.value)} id="count" type="number" min={1}></input>
                <button className='bg-red-50 text-blue font-bold rounded-md px-8 py-2 mb-5' type='submit' onClick={() => {handleCreateItem()}}>Create</button> {/* on click goes to handling function */}
            </div>
        </>
    )
}

export default CreateItem