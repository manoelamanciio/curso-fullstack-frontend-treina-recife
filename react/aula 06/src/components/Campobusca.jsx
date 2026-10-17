import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

/**
 * Campo de texto com busca por nome (autocomplete).
 * O usuário digita, a lista filtra, e ao escolher um item o ID dele vai para o pai.
 *
 * Props:
 *  - id: id do input
 *  - opcoes: lista de objetos { id, nome }
 *  - valorId: ID selecionado hoje ("" quando nada foi escolhido)
 *  - onSelecionar(id): chamada com o ID escolhido (ou "" se a pessoa mudou o texto)
 *  - placeholder, required
 *
 * Para limpar o campo a partir do pai, troque a "key" do componente.
 */
function CampoBusca({ id, opcoes, valorId, onSelecionar, placeholder, required = false }) {
    const [texto, setTexto] = useState("");
    const [aberto, setAberto] = useState(false);
    const inputRef = useRef(null);

    const termo = texto.trim().toLowerCase();
    const filtradas = opcoes.filter((o) => (o.nome ?? "").toLowerCase().includes(termo));

    // Só vale como preenchido se a pessoa escolheu um item da lista
    useEffect(() => {
        if (required && inputRef.current) {
            inputRef.current.setCustomValidity(valorId ? "" : "Selecione um item da lista.");
        }
    }, [valorId, required]);

    const escolher = (opcao) => {
        setTexto(opcao.nome);
        onSelecionar(String(opcao.id));
        setAberto(false);
    };

    const digitar = (e) => {
        const valor = e.target.value;
        setTexto(valor);
        setAberto(true);

        // Se o texto for exatamente o nome de um único item, já seleciona
        const exatas = opcoes.filter(
            (o) => (o.nome ?? "").toLowerCase() === valor.trim().toLowerCase()
        );
        onSelecionar(exatas.length === 1 ? String(exatas[0].id) : "");
    };

    const aoPressionarTecla = (e) => {
        // Enter não deve enviar o formulário enquanto a lista está aberta
        if (e.key === "Enter" && aberto) {
            e.preventDefault();
            if (filtradas.length === 1) {
                escolher(filtradas[0]);
            }
        }
        if (e.key === "Escape") {
            setAberto(false);
        }
    };

    return (
        <div className="position-relative">
            <Form.Control
                ref={inputRef}
                type="text"
                id={id}
                value={texto}
                onChange={digitar}
                onFocus={() => setAberto(true)}
                onBlur={() => setAberto(false)}
                onKeyDown={aoPressionarTecla}
                placeholder={placeholder}
                autoComplete="off"
                required={required}
            />

            {aberto && (
                <ListGroup
                    className="position-absolute w-100 shadow text-start"
                    style={{ zIndex: 1050, maxHeight: 220, overflowY: "auto" }}
                >
                    {filtradas.length === 0 ? (
                        <ListGroup.Item disabled>Nenhum resultado</ListGroup.Item>
                    ) : (
                        filtradas.map((o) => (
                            <ListGroup.Item
                                key={o.id}
                                action
                                active={String(o.id) === String(valorId)}
                                // mouseDown evita que o input perca o foco antes do clique
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    escolher(o);
                                }}
                            >
                                {o.nome}
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            )}
        </div>
    );
}

export default CampoBusca;