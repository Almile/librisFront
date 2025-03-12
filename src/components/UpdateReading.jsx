/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import style from '../styles/UpdateReading.module.css'
import { useState } from 'react'
import OutlinedButton from '../components/OutlinedButton'
import Button from '../components/Button'

export default function UpdateReading({data, handleUpdate, currentPage, setShowModalUpdate}) {
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

UpdateReading.prototype = {
    data: PropTypes.object.isRequired
}