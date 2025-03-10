/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import style from "../styles/bookcontent.module.css";
import BookLecture from "./BookLecture";
import {addLeitura, updateLeitura, getLeituraByUserAndGoogleId} from "../services/librisApiService";
import UpdateReading from "./UpdateReading";

export default function AddToShelfButton({ data, username, perfilId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    useEffect(() => {
        const fetchLeitura = async () => {
            try {
                const response = await getLeituraByUserAndGoogleId(username, data.id);
                setStatus(response.data.data.id);
                setSelectedCategory(response.data.data.status);
                setCurrentPage(response.data.data.pagina);
            } catch(error) {
                console.error(error);
            }
        }
        if (username) fetchLeitura();
    }, [data, username])

    const handleUpdate = async (page) => {
        const body = {
            "perfilId": perfilId,
            "googleId": data.id,
            "pagina": page,
            "status": "LENDO"
        }
        if (page > 0 && page <= data.pageCount) {
            setCurrentPage(+page);
            if(page == data.pageCount) {
                body.status = "LIDO";
                setShowModal(true);
            }
            const response = await updateLeitura(status, body);
            console.log(response)
        }
        setShowModalUpdate(false);
    }

    const handleSelect = async (category) => {
        const body = {
            "perfilId": perfilId,
            "googleId": data.id,
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
        if (category === "LENDO") setShowModalUpdate(true);
        if (category === "LIDO") setShowModal(true);
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

            {showModal && <BookLecture bookId={data.id} onClose={() => setShowModal(false)} />}
            {showModalUpdate && <UpdateReading data={data} currentPage={currentPage} handleUpdate={handleUpdate} setShowModalUpdate={setShowModalUpdate} />}
        </div>
    );
}
