import React, { useState } from "react";
import useItems from "../hooks/items";

const EditItem = ({handleEditedItem, items}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null)
    const [nameOpen, setNameOpen] = useState(false)
    const [costOpen, setCostOpen] = useState(false)
    const [descriptionOpen, setDescriptionOpen] = useState(false)
    const [vendorOpen, setVendorOpen] = useState(false)
    const [countOpen, setCountOpen] = useState(false)
    const [newName, setNewName] = useState('')
    const [newCost, setNewCost] = useState(0.0)
    const [newDescription, setNewDescription] = useState('')
    const [newVendor, setNewVendor] = useState('')
    const [newCount, setNewCount] = useState(0)

    const setItem = (id) => {
        setIsOpen(!isOpen)
        setSelectedItem(id)
    }

    const handleEditItem = (selectedItem, type, itemData) => {
        fetch(`/api/items/${type}/${selectedItem.product_id}`, {
            method: "PATCH", //PATCH request which updates data
            headers: {
                "Content-type": "application/json" //formatting so the server is able to use the data
            },
            body: JSON.stringify({data: itemData})}) //stringifying the body to send the data to server
        .then(resp => resp.json())
        .then(handleEditedItem(selectedItem.product_id, type, itemData)) 
    }

    const setName = (selectedItem, type, data) => {
        setNameOpen(!nameOpen)
        handleEditItem(selectedItem, type, data)
    }
    const setCost = (selectedItem, type, data) => {
        setCostOpen(!costOpen)
        handleEditItem(selectedItem, type, data)
    }
    const setDescription = (selectedItem, type, data) => {
        setDescriptionOpen(!descriptionOpen)
        handleEditItem(selectedItem, type, data)
    }
    const setVendor = (selectedItem, type, data) => {
        setVendorOpen(!vendorOpen)
        handleEditItem(selectedItem, type, data)
    }
    const setCount = (selectedItem, type, data) => {
        setCountOpen(!countOpen)
        handleEditItem(selectedItem, type, data)
    }

    return (
        <>
        <div className="relative inline-block text-left w-full py-2">
            { items[selectedItem] == null && items[selectedItem] == undefined ?
            <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-slate-400/15 hover:text-white hover:opacity-100 opacity-25 font-semibold px-4 rounded-md focus:outline-none mb-2 w-full bg-white outline-slate-400/15 outline">
                <div className="flex justify-between">
                    <div className="">Select item...</div>
                    <div className="font-bold text-xl">↓</div>
                </div>
            </button>
            :
            <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-slate-400/15 hover:text-white font-semibold px-4 rounded-md text-black focus:outline-none mb-2 w-full bg-white outline-slate-400/15 outline">
                <div className="flex justify-between">
                    <div className="text-center align-middle">{items[selectedItem].product_name}</div>
                    <div className="font-bold text-xl">↓</div>
                </div>
            </button>}
            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul className="py-2 text-gray-700 flex flex-col">
                    <div className="flex justify-between px-4 py-2 cursor-pointer">
                        <div>ID</div>
                        <div>Name</div>
                    </div>
                    {items !== null && items.map((item, i) => ( //checks whether items array is empty and continues if not
                        <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer" key={i} onClick={() => setItem(i)}>
                        <div className="flex justify-between">
                            <div>{item.product_id}</div>
                            <div>{item.product_name}</div>
                        </div>
                        </button>
                    ))}
                </ul>
                </div>
            )}
        </div>
        { items[selectedItem] == null && items[selectedItem] == undefined ?
        <></>
         : 
        <table className="w-full border-collapse table-fixed">
            <tbody className="w-full">
            <tr className="odd:bg-gray-50 even:bg-white text-center">
                <td className="p-2 border">Name</td>
                    {!nameOpen ? <>
                        <td className="p-2 border overflow-auto">{items[selectedItem].product_name}</td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setNameOpen(!nameOpen)}><span class="material-symbols-outlined">edit_square</span></button>
                        </td>
                    </> : <>
                        <td className="p-2 border overflow-auto"><input type="text" placeholder={items[selectedItem].product_name} className="w-full p-2 border rounded" onChange={e => setNewName(e.target.value)} id="name" min={1}/></td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setName(items[selectedItem], "product_name", newName)}>Submit</button>
                        </td>
                    </>
                    }
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border">Cost</td>
                    {!costOpen ? <>
                        <td className="p-2 border overflow-auto">{items[selectedItem].product_cost}</td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setCostOpen(!costOpen)}><span class="material-symbols-outlined">edit_square</span></button>
                        </td>
                    </> : <>
                        <td className="p-2 border overflow-auto"><input type="number" placeholder={items[selectedItem].product_cost} className="w-full p-2 border rounded" onChange={e => setNewCost(e.target.value)} id="cost" min={1}/></td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setCost(items[selectedItem], "product_cost", newCost)}>Submit</button>
                        </td>
                    </>
                    }
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border">Description</td>
                    {!descriptionOpen ? <>
                        <td className="p-2 border overflow-auto">{items[selectedItem].product_description}</td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setDescriptionOpen(!descriptionOpen)}><span class="material-symbols-outlined">edit_square</span></button>
                        </td>
                    </> : <>
                        <td className="p-2 border overflow-auto"><input type="text" placeholder={items[selectedItem].product_description} className="w-full p-2 border rounded" onChange={e => setNewDescription(e.target.value)} id="description" min={1}/></td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setDescription(items[selectedItem], "product_description", newDescription)}>Submit</button>
                        </td>
                    </>
                    }
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border">Vendor</td>
                    {!vendorOpen ? <>
                        <td className="p-2 border overflow-auto">{items[selectedItem].product_vendor}</td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setVendorOpen(!vendorOpen)}><span class="material-symbols-outlined">edit_square</span></button>
                        </td>
                    </> : <>
                        <td className="p-2 border overflow-auto"><input type="text" placeholder={items[selectedItem].product_vendor} className="w-full p-2 border rounded" onChange={e => setNewVendor(e.target.value)} id="vendor" min={1}/></td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setVendor(items[selectedItem], "product_vendor", newVendor)}>Submit</button>
                        </td>
                    </>
                    }
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border">Count</td>
                    {!countOpen ? <>
                        <td className="p-2 border overflow-auto">{items[selectedItem].product_count}</td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setCountOpen(!countOpen)}><span class="material-symbols-outlined">edit_square</span></button>
                        </td>
                    </> : <>
                        <td className="p-2 border overflow-auto"><input type="number" placeholder="Count" className="w-full p-2 border rounded" onChange={e => setNewCount(e.target.value)} id="count" min={1}/></td>
                        <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full" onClick={() => setCount(items[selectedItem], "product_count", newCount)}>Submit</button>
                        </td>
                    </>
                    }
                </tr>
            </tbody>
        </table>
        }
        </>
    )

}

export default EditItem
