import useItems from "../hooks/items";
import React, { useState } from 'react'
import CreateItem from "./CreateItem";
import DeleteItem from "./DeleteItem";
import Header from "./Header";

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
        addItem(response.id, newName, newCost, newDescription, newVendor, newCount)
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="bg-green-200 p-3 rounded-md flex justify-between items-center">
            <span className="font-semibold">Inventory dashboard</span>
            <input 
                type="text" 
                placeholder="Search" 
                className="p-2 border rounded w-1/3" 
            />
            <div className="flex gap-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded">Add new product</button>
                <button className="bg-green-500 text-white px-3 py-1 rounded">Export as CSV</button>
            </div>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Inventory Table */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="p-2 border">Product ID</th>    
                    <th className="p-2 border">Product Name</th>
                    <th className="p-2 border">Product Cost</th>
                    <th className="p-2 border">Product Description</th>
                    <th className="p-2 border">Product Vendor</th>
                    <th className="p-2 border">Product Count</th>
                    <th className="p-2 border"></th>
                    </tr>
                </thead>
                <tbody>
                    {items !== null && items.map((item, i) => ( //checks whether items array is empty and continues if not
                    <tr key={i} className="odd:bg-gray-50 even:bg-white text-center">
                        <td className="p-2 border">{item.product_id}</td>
                        <td className="p-2 border">{item.product_name}</td>
                        <td className="p-2 border">{item.product_cost}</td>
                        <td className="p-2 border">{item.product_description}</td>
                        <td className="p-2 border">{item.product_vendor}</td>
                        <td className="p-2 border">{item.product_count}</td>
                        <td className="p-2 border">
                        <DeleteItem itemID={item.product_id} handleRemovedItem={(id) => {removeItem(id)}} />
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {/* Sidebar */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-center bg-green-500 text-white p-2 rounded">Manage Inventory</h2>
                <div className="space-y-3">
                <input type="text" placeholder="Enter product ID" className="w-full p-2 border rounded" />
                <div className="flex justify-between items-center border p-2 rounded">
                    <button className="bg-gray-300 px-3 py-1 rounded">-</button>
                    <span>46</span>
                    <button className="bg-gray-300 px-3 py-1 rounded">+</button>
                </div>
                <select className="w-full p-2 border rounded">
                    <option>Select status</option>
                </select>
                <select className="w-full p-2 border rounded">
                    <option>Select product type</option>
                </select>
                <input type="text" placeholder="Enter vendor name" className="w-full p-2 border rounded" />
                <button className="w-full bg-green-500 text-white p-2 rounded">Submit</button>
                </div>
            </div>
            </div>
        </div>
    );

}

export default DisplayItems

//<CreateItem handleCreatedItem={handleCreatedItem}/>