import BookItem from "../components/BookItem";
import BookSlide from "../components/BookSlide";
import SearchBar from "../components/SearchBar";
import style from "../styles/Catalogo.module.css";
import { Pagination, Keyboard} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from "../components/Footer";

import 'swiper/css';
import 'swiper/css/pagination';

export default function Catalogo() {
  const recommended = [
    "GjgQCwAAQBAJ", 
    "hjcQCwAAQBAJ", 
    "-DgQCwAAQBAJ", 
    "qDYQCwAAQBAJ", 
    "9TcQCwAAQBAJ", 
    "yjUQCwAAQBAJ",
  ];

  const popular = [
    "m3lvDwAAQBAJ",
    "C3wTEAAAQBAJ",
    "gIr-DwAAQBAJ",
    "GaZMDwAAQBAJ",
    "PM2uCgAAQBAJ",
    "5BclEAAAQBAJ",
    "W_tcDwAAQBAJ",
  ];

  return (
    <div className={style.container}>
      <SearchBar className={`${style.box}`}/>
      <h2 className={`${style.box} ${style.headerTwo}`}>Recomendados</h2>
      <div className={`${style.recommended} ${style.box}`}>
        {recommended.map((id) => <BookItem key={id} id={id} />)}
      </div>
      <h2 className={`${style.box} ${style.headerTwo}`}>Populares</h2>
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
          {popular.map((id) => <SwiperSlide key={id}><BookSlide id={id} /></SwiperSlide>)}
        </Swiper>
      </div>
    </div>
  );
}