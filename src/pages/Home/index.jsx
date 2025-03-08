import style from "./Home.module.css";
import BookSwiper from "../../components/BookSwiper";
import Button from "../../components/Button";
import { Pagination, Keyboard} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
    return (
        <div className={style.container}>
            <Slides />
            <BookSwiper
                title={"Títulos Novos"} 
                books={["m3lvDwAAQBAJ","C3wTEAAAQBAJ","gIr-DwAAQBAJ","GaZMDwAAQBAJ","PM2uCgAAQBAJ","5BclEAAAQBAJ","W_tcDwAAQBAJ"]}
                className={style.bookSwiper}
            />
        </div>
    );
}

function Slides() {
    const navigate = useNavigate();
    return (
        <Swiper
            className={style.slides}
            modules={[Pagination, Keyboard]}
            pagination={{clickable: true,}}
            keyboard={{enabled: true,}}
        >
            <SwiperSlide>
                <div className={style.start}>
                    <div className={style.card}>
                        <h2>Sua jornada literária começa aqui</h2>
                        <p>Uma rede social feita para leitores apaixonados. Aqui você pode compartilhar resenhas, descobrir novos livros e fazer amizades com quem ama ler tanto quanto você.</p>
                        <p>Organize sua lista de leitura, explore novas histórias e veja o impacto dos seus livros favoritos no mundo.</p>
                        <p>É simples, divertido e totalmente sobre livros.</p>
                        <Button onClick={() => navigate("/catalogo")}>
                            <span className={style.action}>Comece Agora!</span>
                        </Button>
                    </div>
                    <img src="./frame216.png"/>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>

                </div>
            </SwiperSlide>
        </Swiper>
    );
}