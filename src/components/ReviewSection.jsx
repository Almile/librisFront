import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import style from "../styles/reviewsection.module.css"
import 'swiper/css';

const ReviewSection = () => {
    const navigate = useNavigate();
  
    const navegarParaResenha = () => {
      navigate('/resenha');
    };

  return (
    <div className={style.reviewSection}>
    <h2>Resenhas</h2>
    <Swiper
    className={style.swiper}
      spaceBetween={50} // Espaço entre os slides
      slidesPerView={3} // Número de slides visíveis ao mesmo tempo
      onSlideChange={() => console.log('Slide mudou')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className={style.swiperSlide} >
      <span class={style.plResenhaP}>Muito boa leitura, com uma bela mensagem! Recomendo</span>
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>
        <button onClick={navegarParaResenha}>Ir para Resenha</button>
        Slide 2
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 3</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 4</SwiperSlide>
    </Swiper>
    </div>
  );
};


export default ReviewSection