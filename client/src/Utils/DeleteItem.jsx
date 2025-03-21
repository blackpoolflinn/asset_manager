import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteItem = ({handleRemovedItem, itemID}) => {

    const handleRemoveItem = () => {
        fetch(`/api/items/${itemID}`, {
            method: "DELETE" 
        })
        .then((resp) => {
            handleRemovedItem(itemID)
        })
    }

    return (
        <button className='duration-200 w-full min-h-full justify-center' onClick={handleRemoveItem}><span class="material-symbols-outlined"><RiDeleteBin6Line /></span></button>
    )
}

export default DeleteItem