import React, { useState } from "react";
import useItems from "../hooks/items";

const EditItem = () => {
    const [isOpen, setIsOpen] = useState(false);
    const[items, loadItems, addItem, removeItem] = useItems()
    const [selectedItem, setSelectedItem] = useState({})

    const setItem = (id) => {
        setIsOpen(!isOpen)
        setSelectedItem(items[id])
    }

    return (
        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=edit_square" />
        <div className="relative inline-block text-left w-full py-2">
            { Object.keys(selectedItem).length === 0 ?
            <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-slate-400/15 hover:text-white px-4 rounded-md focus:outline-none mb-2 w-full text-black bg-white outline-slate-400/15 outline">
                <div className="flex justify-between">
                    <div className="opacity-25">Select item...</div>
                    <div className="font-bold text-xl">↓</div>
                </div>
            </button>
            :
            <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-slate-400/15 hover:text-white px-4 rounded-md focus:outline-none mb-2 w-full text-black bg-white outline-slate-400/15 outline">
                <div className="flex justify-between">
                    <div className="text-center align-middle">{selectedItem.product_name}</div>
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
        { Object.keys(selectedItem).length === 0 ?
        <></>
         : 
        <table className="w-full border-collapse table-fixed">
            <tbody className="w-full">
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border">Name</td>
                    <td className="p-2 border overflow-auto">{selectedItem.product_name}</td>
                    <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full"><span class="material-symbols-outlined">edit_square</span></button>
                    </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border">Cost</td>
                    <td className="p-2 border overflow-auto">{selectedItem.product_cost}</td>
                    <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full"><span class="material-symbols-outlined">edit_square</span></button>
                    </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border">Description</td>
                    <td className="p-2 border overflow-auto">{selectedItem.product_description}</td>
                    <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full"><span class="material-symbols-outlined">edit_square</span></button>
                    </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border w-1/4">Vendor</td>
                    <td className="p-2 border overflow-auto">{selectedItem.product_vendor}</td>
                    <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full"><span class="material-symbols-outlined">edit_square</span></button>
                    </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white text-center">
                    <td className="p-2 border">Count</td>
                    <td className="p-2 border overflow-auto">{selectedItem.product_count}</td>
                    <td className="border w-1/4 hover:bg-green-500/15">
                        <button className="w-full h-full"><span class="material-symbols-outlined">edit_square</span></button>
                    </td>
                </tr>
            </tbody>
        </table>
        }
        </>
    )

}

export default EditItem
