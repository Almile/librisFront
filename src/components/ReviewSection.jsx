import React, {useState, useContext, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from "../styles/reviewsection.module.css"
import 'swiper/css';
import backendApi from "../services/backendApi";
import useAuth from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';


const ReviewSection = (livroID) => {
    const [profileImage, setProfileImage] = useState('/user_padrao.svg');
    const [review, setReview] = useState([]);
    const bookId = livroID.livroID

    const { token, user } = useContext(useAuth);

    useEffect(() => {
      const reviewGet = async(bookId) => {
        try {
          const resenhaLer = await backendApi.get(`/resenhas/livro/${bookId}`, {headers: { Authorization: `Bearer ${token}`}, });
          setReview(resenhaLer.data.data.content);
          console.log('TESTE RESENHA CARREGADA: ', resenhaLer.data.data.content);
        } catch (error) {
          console.error(error);
        }
      }
      reviewGet(bookId);
    }, [livroID])

    console.log('REVIEW: ', review);

  return (
    <div className={style.reviewSection}>
    <div className={style.reviewTitle}>
      <h2>Resenhas</h2>
    </div>
    <Swiper
    className={style.swiper}
      spaceBetween={50} // Espaço entre os slides
      slidesPerView={3} // Número de slides visíveis ao mesmo tempo
      onSlideChange={() => console.log('Slide mudou')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {review.length > 0 ? (
        <div>
          { review.map((r) => (
            <SwiperSlide className={style.swiperSlide}>
              <h3>{r.titulo}</h3>
              <span class={style.plResenhaP} dangerouslySetInnerHTML={{ __html: r.texto }}></span>
              <div className={style.fotoPerfil}>
                <p>{r.autor}</p>
              </div>
            </SwiperSlide>
          ))
        }</div>):("Não possui resenhas, seja o primeiro a escrever!")}
    </Swiper>
    </div>
  );
};


export default ReviewSection