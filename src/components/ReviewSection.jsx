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
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};


export default ReviewSection