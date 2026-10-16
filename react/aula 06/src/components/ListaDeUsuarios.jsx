import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';


function ListaDeUsuarios() {


    const [mostrar, setMostrar] = useState(false);


    function fecharModal() {

        setMostrar(false);

    }


    return (

        <>
            <Modal show={mostrar} onHide={fecharModal}>

                <Modal.Header closeButton>
                    <Modal.Title>Lista de Usuários</Modal.Title>
                </Modal.Header>


                <Modal.Body>


                    Formulário


                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModal}>
                        Fechar
                    </Button>
                </Modal.Footer>


            </Modal>


        </>

    )


}


export default ListaDeUsuarios