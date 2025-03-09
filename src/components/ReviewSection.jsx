import React, { useState, useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from "../styles/reviewsection.module.css";
import 'swiper/css';
import backendApi from "../services/backendApi";
import useAuth from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const ReviewSection = ({ livroID }) => {
    const [review, setReview] = useState([]);
    const { token } = useContext(useAuth);
    const navigate = useNavigate();

    useEffect(() => {
        const reviewGet = async () => {
            try {
                const resenhaLer = await backendApi.get(`/resenhas/livro/${livroID}`, { 
                    headers: { Authorization: `Bearer ${token}` } 
                });
                setReview(resenhaLer.data.data.content);
            } catch (error) {
                console.error(error);
            }
        };
        reviewGet();
    }, [livroID, token]);

    return (
        <div className={style.reviewSection}>
            <div className={style.reviewTitle}>
                <h2>Resenhas</h2>
            </div>
            <Swiper
                className={style.swiper}
                spaceBetween={50}
                slidesPerView={3}
            >
                {review.length > 0 ? (
                    review.map((r) => (
                        <SwiperSlide 
                            key={r.id} 
                            className={style.swiperSlide} 
                            onClick={() => navigate(`/resenha/${r.id}`)} // Redireciona para a resenha
                        >
                            <h3>{r.titulo}</h3>
                            <span className={style.plResenhaP} dangerouslySetInnerHTML={{ __html: r.texto }}></span>
                            <div className={style.fotoPerfil}>
                                <p>{r.autor}</p>
                            </div>
                        </SwiperSlide>
                    ))
                ) : ( 
                    <p>Não possui resenhas, <b> Finalize a leitura </b> e seja o primeiro a escrever!</p>
                )}
            </Swiper>
        </div>
    );
};

export default ReviewSection;