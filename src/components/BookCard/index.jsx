/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import style from './BookCard.module.css'
import useBook from '../../hooks/useBook'
import { useState, useEffect, useRef } from 'react'
import OutlinedButton from '../OutlinedButton';
import Button from '../Button';
import BookLecture from "../BookLecture";
import { useNavigate } from 'react-router-dom';
import { updateLeitura, getLeituraByUserAndGoogleId } from '../../services/librisApiService';

export default function BookCard({id, username, showUpdate, setLidos, setLendo, perfilId}) {
    const [currentPage, setCurrentPage] = useState(0);
    const { data, loading, error } = useBook(id);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const leituraId = useRef();

    useEffect(() => {
        const fetchLeitura = async () => {
            try {
                const response = await getLeituraByUserAndGoogleId(username, id)
                leituraId.current = response.data.data.id;
                setCurrentPage(response.data.data.pagina)
            } catch (error) {
                console.error(error);
            }
        }
        fetchLeitura();
    }, [id, username])

    const handleClickUpdate = () => {
        setShowModalUpdate(true);
    }

    const handleUpdate = async (page) => {
        const body = {
            "perfilId": perfilId,
            "googleId": id,
            "pagina": page,
            "status": "LENDO"
        }
        if (page > 0 && page <= data.pageCount) {
            setCurrentPage(+page);
            if(page == data.pageCount) {
                body.status = "LIDO";
                setShowModal(true);
                setLidos(prev => [...prev, id]);
            }
            const response = updateLeitura(leituraId.current, body);
            console.log(response)
        }
        setShowModalUpdate(false);
    }

    const handleClickAuthors = async () => {
        if (data.authors) {
            const query = new URLSearchParams();
            query.set("q", `+authors:${data.authors[0].trim()}`);
            navigate(`/catalogo?${query.toString()}`);
        }
    };

    if (loading) return <div className="loader"></div>;
    if (error) return <p>Ocorreu um erro de rede</p>;

    return (
        <div className={style.bookCard}>
            <img
                onClick={() => {navigate(`/livro/${id}`);}}
                className={style.cover}
                src={`https://books.google.com/books/publisher/content?id=${id}&printsec=frontcover&img=1&zoom=1`}
                alt={`Capa do livro ${data.title}`}
            />
            <div className={style.content}>
                <span onClick={() => {navigate(`/livro/${id}`);}} className={style.title}>
                    {data.title}
                </span>
                <span className={style.authors} onClick={handleClickAuthors}>
                    {data.authors ? data.authors.join(", ") : "Desconhecido"}
                </span>
                <span className={style.pageCount}>Páginas: {data.pageCount}</span>
                {
                currentPage != null &&
                <>
                    <ProgressBar currentPage={currentPage} pageCount={+data.pageCount}/>
                    { showUpdate &&
                        <OutlinedButton onClick={handleClickUpdate}> 
                        Atualizar
                        </ OutlinedButton>
                    }

                </>
                }
            </div>
            {showModal && <BookLecture bookId={data.id} onClose={() => {setShowModal(false); setLendo(prev => prev.filter(e => e != id));}} />}
            {showModalUpdate && <UpdateReading data={data} currentPage={currentPage} handleUpdate={handleUpdate} setShowModalUpdate={setShowModalUpdate} />}
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

function UpdateReading({data, handleUpdate, currentPage, setShowModalUpdate}) {
    const [page, setPage] = useState(currentPage)
    return (
        <div className={style.modalOverlay}>
            <div className={style.modalUpdate}>
                <img 
                    className={style.cover}
                    src={`https://books.google.com/books/publisher/content?id=${data.id}&printsec=frontcover&img=1&zoom=1`}
                    alt={`Capa do livro ${data.title}`} 
                />
                <div className={style.modalInfo}>
                    <span className={style.title}>{data.title}</span>
                    <input type="range" min={0} max={data.pageCount} value={page} onChange={(e) => setPage(e.target.value)}/>
                    <span>Página <input type='number' min="0" max={data.pageCount} value={page} onChange={(e) => setPage(e.target.value)}/> de {data.pageCount}</span>
                    <div className={style.modalButtons}>
                        <OutlinedButton onClick={() => handleUpdate(data.pageCount)}>
                            Marcar como lido
                        </OutlinedButton>
                        <Button onClick={() => handleUpdate(page)}>
                            Atualizar
                        </Button>
                    </div>
                    <span className={style.closeModal} onClick={() => setShowModalUpdate(false)}>
                        ✖
                    </span>
                </div>
            </div>
        </div>
    );
}

BookCard.propTypes = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    showUpdate: PropTypes.bool.isRequired,
    setLidos: PropTypes.func.isRequired,
    setLendo: PropTypes.func.isRequired,
    perfilId: PropTypes.number.isRequired
};

ProgressBar.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
}

UpdateReading.prototype = {
    data: PropTypes.object.isRequired
}