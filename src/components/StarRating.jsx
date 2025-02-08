import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import style from "../styles/starRating.module.css";

export const StarRating = ({ rating, onRatingChange, size = 16, required = false }) => {
    const [hover, setHover] = useState(null);
    const [inputValue, setInputValue] = useState(rating || 0);
    const [error, setError] = useState(false);

    useEffect(() => {
        setInputValue(rating || 0);
    }, [rating]);

    const handleStarClick = (star) => {
        setInputValue(star);
        setError(false);
        onRatingChange(star);
    };
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

    return (
        <div className={style.starRating} aria-required>
            {[1, 2, 3, 4, 5].map((star) => {
                const fillValue = hover !== null ? hover : inputValue;
                const isFull = star <= Math.floor(fillValue);
                const isHalf = star === Math.ceil(fillValue) && fillValue % 1 !== 0;

                return (
                    <div key={star} style={{ position: "relative", display: "inline-block" }}>
                        <Star
                            size={size}
                            fill={isFull ? 'var(--destaque)': 'var(--texto-secundario)'}
                            stroke="null"
                            className={style.starIcon}
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(null)}
                            style={{ cursor: "pointer" }}
                        />
                        {isHalf && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "50%",
                                    height: "100%",
                                    overflow: "hidden",
                                }}
                            >
                                <Star
                                    size={size}
                                    fill='var(--destaque)'
                                    stroke="null"
                                    className={style.starIcon}
                                    style={{ pointerEvents: "none" }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
                        <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                aria-label="Avaliação"
                style={{
                    fontSize: `${size * 0.6}px`, 
                    height: `${size}px`,
                    width: `${size * 1.5}px`, 
                }}
            />
            {error && <span className={style.errorMessage}>A nota é obrigatória! Dê uma nota para o livro</span>}
        </div>
    );
};
