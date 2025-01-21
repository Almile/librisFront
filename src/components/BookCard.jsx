import style from "../styles/BookCard.module.css";
import { useState } from "react";

export default function BookCard() {
    const [currentPage, setCurrentPage] = useState(0);

    const handleClick = () => {
        const page = window.prompt("Página atual");
        if (page >= 0 && page <= 220) {
            setCurrentPage(+page);
        }
    }


    return (
        <div className={style.bookCard}>
            <img className={style.cover} src="https://books.google.com/books/content?id=-bF2CwAAQBAJ&printsec=frontcover&img=1" alt="" />
            <div className={style.content}>
                <span className={`${style.title} ${style.truncate}`}>Harry Potter e a Pedra Filosofal A rewfwefwfweewf</span>
                <span className={`${style.authors} ${style.truncate}`}>J. K Rowling</span>
                <span className={style.pageCount}>Páginas: {`${220}`}</span>
                {currentPage != null &&(<>
                    <ProgressBar currentPage={currentPage} pageCount={220}/>
                    <OutlinedButton text="Atualizar" onClick={handleClick}/>
                </>)}
            </div>
        </div>
    );
}

function ProgressBar({currentPage, pageCount}) {
    const progress = `${Math.ceil(currentPage * 100 / pageCount)}%`;

    return (
        <div className={style.progressBar}>
            <span className={style.percentage}>{progress}</span>
            <div className={style.bar}>
                <div className={style.progress} style={{width: progress}}>
                    <span className={style.progressNumber}>{currentPage}/{pageCount}</span>
                </div>
            </div>
        </div>
    );
}

function OutlinedButton({text, onClick}) {
    return (
        <button type="button" onClick={onClick} className={style.outlinedButton}>
            <span>{text}</span>
        </button>
    );
}