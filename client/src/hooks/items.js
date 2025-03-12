import { useEffect, useState } from 'react'

const useItems = () => {
    const[items, setItems] = useState(null)

    useEffect(() => {
        if(!items){ //if items is empty load items
            loadItems()
        }
    }, [items]) //setting items array as a dependcy

    const loadItems = () => {
        fetch(`/api/items`)
        .then(res => res.json())
        .then(data => setItems(data.result), console.log('loaded')) //loads all the items
    }

    const addItem = (id, name, cost, description, vendor, count) => { //function used for when new item is added without having to completly reload all items
        console.log("adding items")
        console.log(id, name, cost, description, vendor, count)
        setItems(old => {
            console.log(old)
          return [
            ...old,  //returns all the old items
            {product_id: id, product_name: name, product_cost: cost, product_description: description, product_vendor: vendor, product_count: count} //plus the new item
          ]
        })
    } 

    return [items, loadItems, addItem] //exporting all the functions for useItems hook

}

export default useItems