import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import style from "../styles/reviewsection.module.css"
import 'swiper/css';

const ReviewSection = () => {
    const navigate = useNavigate();
  
    const navegarParaResenha = () => {
      navigate('/resenha');
    };

    const [profileImage, setProfileImage] = useState('/user_padrao.svg');

    const userResenha = [    
      { id: 1, name: "Ana", image: profileImage },
      { id: 2, name: "Maria", image: profileImage }
    ];

  return (
    <div className={style.reviewSection}>
    <div className={style.reviewTitle}>
      <h2>Resenhas</h2>
      <button onClick={navegarParaResenha} className={style.buttonReview}>Escreva uma Resenha</button>
    </div>
    <Swiper
    className={style.swiper}
      spaceBetween={50} // Espaço entre os slides
      slidesPerView={3} // Número de slides visíveis ao mesmo tempo
      onSlideChange={() => console.log('Slide mudou')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className={style.swiperSlide} >
        <h3>Título resenha</h3>
        <span class={style.plResenhaP}>Muito boa leitura, com uma bela mensagem! Recomendo</span>
        <div className={style.fotoPerfil}>
          <img src={profileImage} alt="Foto do Perfil"/>
          <p>Nome user</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className={style.swiperSlide}>
        <h3>Título resenha</h3>
        <span class={style.plResenhaP}>Narrativa envolvente e personagens cativantes fazem deste livro uma leitura imperdível</span>
        <div className={style.fotoPerfil}>
          <img src={profileImage} alt="Foto do Perfil"/>
          <p>Nome user</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className={style.swiperSlide}>
        <h3>Título resenha</h3>
        <span class={style.plResenhaP}>Uma história emocionante que prende do início ao fim</span>
        <div className={style.fotoPerfil}>
          <img src={profileImage} alt="Foto do Perfil"/>
          <p>Nome user</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className={style.swiperSlide}>
        <h3>Título resenha</h3>
        <span class={style.plResenhaP}>Leitura rápida, porém impactante e memorável</span>
        <div className={style.fotoPerfil}>
          <img src={profileImage} alt="Foto do Perfil"/>
          <p>Nome user</p>
        </div>
      </SwiperSlide>
    </Swiper>
    </div>
  );
};


export default ReviewSection