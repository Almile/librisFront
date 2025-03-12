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
                books={["C9oZEQAAQBAJ", "ud06EAAAQBAJ", "HNWsEAAAQBAJ","IF0QEAAAQBAJ","I-fUDAAAQBAJ","-bF2CwAAQBAJ"]}
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
                <div className={style.slide2}>
                    <div className={style.slide2Info}>
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium amet delectus vitae velit dignissimos molestias dicta cumque dolorem vero maiores? Deserunt quia saepe et. Hic cumque dolor magnam voluptates suscipit?</p>
                    </div>
                    <img src="./Unsplash.png" />
                </div>
            </SwiperSlide>
        </Swiper>
    );
}