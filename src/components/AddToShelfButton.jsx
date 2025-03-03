import React, { useState, useEffect } from "react";
import style from "../styles/bookcontent.module.css";
import BookLecture from "./BookLecture";
import {getLeituraByUser, addLeitura, updateLeitura} from "../services/librisApiService";

export default function AddToShelfButton({ bookId, username, perfilId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchLeitura = async () => {
            try {
                const response = await getLeituraByUser(username);
                response.data.data.content.forEach(livro => {
                    if (livro.googleId == bookId) {
                        setStatus(livro.id);
                        setSelectedCategory(livro.status);
                    }
                });
                
            } catch(e) {
                console.log(e);
            }
        }
        if (username) fetchLeitura();
    }, [bookId, username])

    const handleSelect = async (category) => {
        const body = {
            "perfilId": 1,
            "googleId": bookId,
            "pagina": 1,
            "status": category
        }

        if (status == null) {
            const response = await addLeitura(body);
            setStatus(response.data.data.id);
        } else {
            updateLeitura(status, body);
        }

        setSelectedCategory(category);
        setIsOpen(false);
        if (category === "LIDO") {
            setShowModal(true);
        }
    };

    return (
        <div className={style.plButtonAddEstante}>
            
            <button 
                className={style.plButtonAddEstante}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedCategory ? selectedCategory : "Adicionar à estante"}
               
            </button>

            {isOpen && (
                <ul className={style.dropdownLecture}>
                    <li onClick={() => handleSelect("LENDO")}>
                        Lendo 
                    </li>
                    <li onClick={() => handleSelect("LIDO")}>
                        Lido 
                    </li>
                    <li onClick={() => handleSelect("ABANDONADO")}>
                        Abandonado 
                    </li>
                </ul>
            )}

            {showModal && <BookLecture bookId={bookId} onClose={() => setShowModal(false)} />}
        </div>
    );
}
