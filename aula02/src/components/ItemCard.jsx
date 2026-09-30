
function ItemCard({ item }) {

    return (
        <div style={{ border: "1px solid #ddd", padding: 12, bodderRadius: 8 }} >
            <h1 style={{ margin: 0 }}> {item.titulo} </h1>
            <h3 style={{ marginTop: 6 }}> {item.professor} </h3>
        </div>
    )


}

export default ItemCard