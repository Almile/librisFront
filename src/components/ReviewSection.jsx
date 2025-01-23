import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ReviewSection = () => {
  return (
    <Swiper
      spaceBetween={50} // Espaço entre os slides
      slidesPerView={3} // Número de slides visíveis ao mesmo tempo
      onSlideChange={() => console.log('Slide mudou')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
      <span class="pl-resenhaP">Muito boa leitura, com uma bela mensagem! Recomendo</span>
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};


export default ReviewSection