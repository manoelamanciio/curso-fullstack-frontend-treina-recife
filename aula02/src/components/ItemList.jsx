
import ItemCard from "./ItemCard"

function ItemList({ it }) {

    return (
        <div> {it.map((i) => (<ItemCard key={i.id} item={i} />))}</div>
    )

}

export default ItemList