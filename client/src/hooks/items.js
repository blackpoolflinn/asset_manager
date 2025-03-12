import { useEffect, useState } from 'react'

const useItems = () => {
    const[items, setItems] = useState(null)

    useEffect(() => {
        if(!items){ //if cards array is empty load cards
            loadItems()
        }
    }, [items]) //setting cards array as a dependcy

    const loadItems = () => {
        fetch(`/items`)
        .then(res => res.json())
        .then(data => setItems(data.result), console.log('loaded')) //loads all the items in the deck
    }

    return [items, loadItems] //exporting all the functions for useItems hook

}

export default useItems