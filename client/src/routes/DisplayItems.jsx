import useItems from "../hooks/items";
import React, { useState } from 'react'
import CreateItem from "./CreateItem";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";
import { FaArrowDown } from "react-icons/fa";

const DisplayItems = () => {
    const[items, loadItems, addItem, removeItem] = useItems()
    const [addOpen, setAddOpen] = useState(false)

    const handleCreatedItem = (response, newName, newCost, newDescription, newVendor, newCount) => {
        addItem(response.id, newName, newCost, newDescription, newVendor, newCount)
    }

    return (
      <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=edit_square" />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="container">
          {/* Header */}
          <div className="bg-green-500/50 p-3 rounded-md flex justify-between items-center">
            <span className="font-semibold text-white">Inventory dashboard</span>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Inventory Table */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
              {/* Search Bar & Actions */}
                <div className="mb-4 flex justify-between items-center">
                    <div className="flex gap-2 w-1/3">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="p-2 border rounded flex-1" 
                        />
                        <button className="bg-green-500 text-white px-3 py-1 rounded">Search</button>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-green-500 text-white px-3 py-2 rounded">Export as CSV</button>
                    </div>
                </div>
              <table className="w-full border-collapse table-fixed overflow-x-auto">
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
                        <td className="p-2 border overflow-x-auto">{item.product_description}</td>
                        <td className="p-2 border">{item.product_vendor}</td>
                        <td className="p-2 border">{item.product_count}</td>
                        <td className="border hover:bg-red-500 h-full text-centre"><DeleteItem itemID={item.product_id} handleRemovedItem={(id) => {removeItem(id)}} /></td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Sidebar */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-center bg-green-500 text-white p-2 rounded">Manage Inventory</h2>
              {!addOpen ? <>
                <div className="flex mb-2 w-full gap-2">
                    <button className="bg-green-500/50 px-3 py-1 rounded w-full text-white font-semibold">Add</button>
                    <button className="px-3 py-1 rounded w-full outline-green-500 outline outline-1 font-semibold text-green-500" onClick={() => setAddOpen(!addOpen)}>Edit</button>
                </div>
                <CreateItem handleCreatedItem={handleCreatedItem}/>
                </> : <>
                <div className="flex mb-2 w-full gap-2">
                    <button className="px-3 py-1 rounded w-full outline-green-500 outline outline-1 font-semibold text-green-500" onClick={() => setAddOpen(!addOpen)}>Add</button>
                    <button className="bg-green-500/50 px-3 py-1 rounded w-full text-white font-semibold">Edit</button>
                </div>
                <EditItem/>
                </>}
            </div>
          </div>
        </div>
        </div>
        </>
      );

}

export default DisplayItems