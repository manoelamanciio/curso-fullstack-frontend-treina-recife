
import Header from "./components/Header.jsx"
import ItemList from "./components/ItemList.jsx"
import Footer from "./components/Footer.jsx"
function Teste() {

    const itens = [
        { id: 1, titulo: "react", professor: "Manoel" },
        { id: 2, titulo: "html", professor: "Amaires" },
        { id: 3, titulo: "css", professor: "Maria" }
    ]


    return (<div>
        <Header />
        <ItemList it={itens} />
        <Footer />
    </div>
    )

}
export default Teste