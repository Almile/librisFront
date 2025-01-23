import BookSlide from '../../components/BookSlide'
import style from "./Catalogo.module.css"
import { Pagination, Keyboard} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Popular() {
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
        <>
        <h2>Populares</h2>
        <Swiper
            className= {style.swiper}
            modules={[Pagination, Keyboard]}
            pagination={{clickable: true,}}
            keyboard={{enabled: true,}}
            spaceBetween={80}
            breakpoints={{
                300: {
                    slidesPerView: 2,
                },
                600: {
                    slidesPerView: 3,
                },
                800: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 5,
                },
            }}
        >
            {popular.map((id) => 
                <SwiperSlide key={id}>
                    <BookSlide id={id} />
                </SwiperSlide>)
            }
        </Swiper>
        </>
    );
}