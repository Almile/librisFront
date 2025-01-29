import BookSlide from './BookSlide'
import PropTypes from 'prop-types'
import { Pagination, Keyboard} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

export default function BookSwiper({title, books, className}) {

    return (
        <>
        <h2>{title}</h2>
        <Swiper
            className={className}
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
            {books.map((id) => 
                <SwiperSlide key={id}>
                    <BookSlide id={id} />
                </SwiperSlide>)
            }
        </Swiper>
        </>
    );
}

BookSwiper.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    className: PropTypes.string,
}
