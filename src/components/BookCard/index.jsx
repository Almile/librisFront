import PropTypes from 'prop-types'
import style from './BookCard.module.css'
import useBook from '../../hooks/useBook'
import { useState } from 'react'
import OutlinedButton from '../OutlinedButton';
import { useNavigate } from 'react-router-dom';

export default function BookCard({id}) {
    const [currentPage, setCurrentPage] = useState(0);
    const { data, loading, error } = useBook(id);
    const navigate = useNavigate();

    const handleClick = () => {
        const page = window.prompt("Página atual");
        if (page >= 0 && page <= data.pageCount) {
            setCurrentPage(+page);
        }
    }

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>A network error was encountered</p>;

    return (
        <div className={style.bookCard}>
            <img
                onClick={() => {navigate(`/livro/${id}`);}}
                className={style.cover}
                src={`https://books.google.com/books/publisher/content?id=${data.id}&printsec=frontcover&img=1&zoom=1`}
                alt={`Capa do livro ${data.title}`}
            />
            <div className={style.content}>
                <span onClick={() => {navigate(`/livro/${id}`);}} className={style.title}>
                    {data.title}
                </span>
                <span className={style.authors}>
                    {data.authors ? data.authors.join(", ") : "Desconhecido"}
                </span>
                <span className={style.pageCount}>Páginas: {data.pageCount}</span>
                {
                currentPage != null &&
                <>
                    <ProgressBar currentPage={currentPage} pageCount={+data.pageCount}/>
                    <OutlinedButton onClick={handleClick}> 
                        Atualizar
                    </ OutlinedButton>
                </>
                }
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

BookCard.propTypes = {
    id: PropTypes.string.isRequired,
};

ProgressBar.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
}