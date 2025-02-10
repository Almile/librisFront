import React, { useState } from "react";
import { Star } from 'lucide-react';
import useBook from '../hooks/useBook';
import AddToShelfButton from "./AddToShelfButton";
import style from "../styles/bookcontent.module.css";

export default function BookContent({ id }) {    
    const { data, error, loading } = useBook(id);
    const [authorsData, setAuthorsData] = useState(false); //modal para livros do mesmo autor
    const [authorBooks, setAuthorBooks] = useState([]); // armazena livros do autor

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Ocorreu um erro de rede</p>;
    
    if (!data) return <p>Livro não encontrado</p>;

    const handleClickAuthors = async () => {
        if (!data.authors || data.authors.length === 0) return;
    
        try {
            const authorName = encodeURIComponent(data.authors[0]); // Pegando o primeiro autor
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorName}`);
            const result = await response.json();
    
            setAuthorBooks(result.items || []);
        } catch (error) {
            console.error("Erro ao buscar livros do autor:", error);
        }
        setAuthorsData(true);
    };
    
    return (
        <div className={style.plGrid}>
            <div className={style.plCapa}>
                <img 
                    src={`https://books.google.com/books/publisher/content?id=${data.id}&printsec=frontcover&img=1&zoom=1`}
                    alt={`Capa do livro ${data.title}`} 
                />
                <button className={style.plCapaButton}>
                <ion-icon name="cart-outline"></ion-icon>
                    Comprar livro</button>
                    
            </div>
            <div className={style.plDescriptionLivro}>
                <p className={style.plTitulo}><strong>{data.title}</strong></p>
                <p onClick={handleClickAuthors} className={style.plAutor}>{data.authors?.join(", ") || "Autor desconhecido"}</p>
                
                <div className={style.plRating}>
                    <div className={style.rating}>
                        <span>
                            {Array.from({ length: Math.ceil(data.averageRating || 0) }).map((_, index) => (
                                <Star size={20} key={index} fill='var(--destaque)' stroke="null" />
                            ))}
                            {Array.from({ length: 5 - Math.ceil(data.averageRating || 0) }).map((_, index) => (
                                <Star size={20} key={index + 10} fill='var(--texto-secundario)' stroke="null"/>
                            ))}
                        </span>
                    </div>
                </div>
                
                <div className={style.plGenres}>
                    {data.categories && data.categories.length > 0 ? (
                        [...new Set(data.categories.map(cat => cat.split("/")[1]))].map((category, index) => (
                            <button key={index} className={style.plBg1}>{category}</button>
                        ))
                    ) : (
                        <p>Gênero não informado</p>
                    )}
                </div>
                <p className={style.plSinopse} dangerouslySetInnerHTML={{ __html: data.description }} ></p>
                 
                <div className={style.plButtons}>
                    <AddToShelfButton  bookId={id}/>

                    <button className={style.plButtonFavoritar}>Favoritar</button>
                </div>
               
            </div>

            <div className={style.plInfoGrid}>
                <div className={style.plStyleLinha} />
                <div className={style.plInfoItem}>
                    <p className={style.plInfoCat}>ISBN:</p>
                    <p className={style.plInfoInfo}>
                        {data.industryIdentifiers?.[0]?.identifier || "Não disponível"}
                    </p>
                </div>
                <div className={style.plInfoItem}>
                    <p className={style.plInfoCat}>Data de publicação:</p>
                    <p className={style.plInfoInfo}>{data.publishedDate || "Não informado"}</p>
                </div>
                <div className={style.plInfoItem}>
                    <p className={style.plInfoCat}>Idioma:</p>
                    <p className={style.plInfoInfo}>{data.language || "Não informado"}</p>
                </div>
                <div className={style.plInfoItem}>
                    <p className={style.plInfoCat}>Editora:</p>
                    <p className={style.plInfoInfo}>{data.publisher || "Não disponível"}</p>
                </div>
                <div className={style.plInfoItem}>
                    <p className={style.plInfoCat}>Páginas:</p>
                    <p className={style.plInfoInfo}>{data.pageCount || "Não informado"}</p>
                </div>
                <div className={style.plInfoItem}>
                    <p className={style.plInfoCat}>Faixa etária:</p>
                    <p className={style.plInfoInfo}>{data.maturityRating || "Não disponível"}</p>
                </div>
            </div>

            {authorsData && (
            <div className={style.authorsData}>
                <button className={style.closeModal} onClick={() => setAuthorsData(false)}>
                    <ion-icon name="close"></ion-icon>
                </button>
                <div className={style.headerMenu}>
                    <h2 className={style.plAutor}>{data.authors?.join(", ") || "Autor desconhecido"}</h2>
                </div>
                {authorBooks.length > 0 ? (
                    <div className={style.bookList}>
                        {authorBooks.map((book) => (
                            <div key={book.id} className={style.bookItem}>
                                <img 
                                    src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x200"}
                                    alt={`Capa do livro ${book.volumeInfo.title}`}
                                />
                                <p>{book.volumeInfo.title}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum outro livro encontrado para este autor.</p>
                )}
            </div>
            )}


        </div>
    );
}
