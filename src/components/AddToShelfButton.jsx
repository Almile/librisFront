import React, { useState } from "react";
import style from "../styles/bookcontent.module.css";
import BookLecture from "./BookLecture";

export default function AddToShelfButton({ bookId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const categories = ["Lendo", "Lido", "Abandonado"];

    const handleSelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);

        if (category === "Lido") {
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
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => handleSelect(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
            )}

            {showModal && <BookLecture bookId={bookId} onClose={() => setShowModal(false)} />}
        </div>
    );
}
