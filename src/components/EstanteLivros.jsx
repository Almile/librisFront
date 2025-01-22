import React, { useRef } from "react";
import BookSlide from "../components/BookSlide";
import style from "../styles/Catalogo.module.css";
import { Pagination, Keyboard} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

function EstanteLivros({ filtro }) {

  return (
  
    <div className={style.box}>
    <Swiper
    className= {style.swiper}
    modules={[Pagination, Keyboard]}
    pagination={{clickable: true,}}
    keyboard={{enabled: true,}}
    breakpoints={{
      300: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 60,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 80,
      },
    }}
    >
      {filtro.map((id) => <SwiperSlide key={id}><BookSlide id={id} /></SwiperSlide>)}
    </Swiper>
  </div>
        
  );
}

export default EstanteLivros;
