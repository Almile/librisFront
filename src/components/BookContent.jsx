import React, { useState, useContext, useEffect } from "react";
import { getFavorito, favoritar, removeFavorito } from "../services/librisApiService";
import useAuth from "../context/AuthContext"
import { Star } from 'lucide-react';
import useBook from '../hooks/useBook';
import AddToShelfButton from "./AddToShelfButton";
import style from "../styles/bookcontent.module.css";
import { useNavigate } from "react-router-dom";

export default function BookContent({ id }) {    
    const { data, error, loading } = useBook(id);
    const navigate = useNavigate();
    const {user} = useContext(useAuth);
    const [favoritoId, setFavoritoId] = useState(0);

    useEffect(() => {
        const isFavorito = async () => {
            try {
                const response = await getFavorito(user.data.username, id);
                if (response.data.data.content.length) {
                    setFavoritoId(response.data.data.content[0].id);
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (user?.data) isFavorito();
    }, [id, user]);

    const handleClickCategory = (category) => {
        const query = new URLSearchParams();
        query.set("q", `+subject:${category.trim()}`);
        navigate(`/catalogo?${query.toString()}`);
    }

    const handleClickAuthors = () => {
        if (data.authors) {
            const query = new URLSearchParams();
            query.set("q", `+authors:${data.authors[0].trim()}`);
            navigate(`/catalogo?${query.toString()}`);
        }
    };

    const handleClickFavoritar = async () => {
        try {
            if (!favoritoId) {
                const response = await favoritar(user.perfil.id, id);
                setFavoritoId(response.data.data.id);
            } else {
                removeFavorito(favoritoId)
                setFavoritoId(0);
            }
        } catch(error) {
            console.error(error);
        }
    }

    if (loading) return <div className="loader"></div>;
    if (error) return <p>Ocorreu um erro de rede</p>;
    
    if (!data) return <p>Livro não encontrado</p>;

    
    return (
        <div className={style.plGrid}>
            <div className={style.plCapa}>
                <img 
                    src={`https://books.google.com/books/publisher/content?id=${id}&printsec=frontcover&img=1`}
                    alt={`Capa do livro ${data.title}`} 
                />
                <button className={style.plCapaButton} onClick={() => {if (data.buyLink) window.open(data.buyLink, '_blank');} }>
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
                            <button key={index} className={style.plBg1} onClick={() => handleClickCategory(category)}>{category}</button>
                        ))
                    ) : (
                        <p>Gênero não informado</p>
                    )}
                </div>
                <p className={style.plSinopse} dangerouslySetInnerHTML={{ __html: data.description }} ></p>
                 
                <div className={style.plButtons}>
                    <AddToShelfButton  bookId={id} username={user?.data?.username} perfilId={user?.perfil?.id}/>

                    <button className={style.plButtonFavoritar} onClick={handleClickFavoritar}>{favoritoId ? "Remover dos favoritos" : "Favoritar"}</button>
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
        </div>
    );
}
