import React, { useState, useEffect } from "react";
import style from "../styles/starRating.module.css";

export const StarRating = ({ rating, onRatingChange, required = false }) => {
    const [hover, setHover] = useState(null);
    const [inputValue, setInputValue] = useState(rating || 0);
    const [error, setError] = useState(false);

    useEffect(() => {
        setInputValue(rating || 0);
    }, [rating]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 5)) {
            setInputValue(value);
            if (value !== "") {
                setError(false);
                onRatingChange(parseFloat(value));
            }
        }
    };

    const handleStarClick = (star) => {
        setInputValue(star);
        setError(false);
        onRatingChange(star);
    };

    const handleSubmit = () => {
        if (required && inputValue === 0) {
            setError(true);
        }
    };

    return (
        <div className={style.starRating} aria-required>
            {[1, 2, 3, 4, 5].map((star) => (
                <ion-icon
                    key={star}
                    name={star <= (hover || inputValue) ? "star" : "star-outline"}
                    className={style.starIcon}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                ></ion-icon>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                aria-label="Avaliação"
            />
            {error && <span className={style.errorMessage}>A nota é obrigatória! Dê uma nota para o livro</span>}
        </div>
    );
};