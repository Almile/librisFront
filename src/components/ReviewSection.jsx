import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function ReviewSection() {
    return(

        <body>
            <div class="pl-resenhas">
                <h1><img src="assets/openBook-icon.png" alt="Open Book - Icon" width="25px"/>Resenhas</h1>
                <Swiper spaceBetween={50} slidesPerView={3} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}></Swiper>
                <div class="swiper">
                    <div class="swiper-wrapper">
                        <SwiperSlide>
                            <div class="pl-resDescription">
                                <h2 class="pl-tituloResenha">Título da Resenha</h2>
                                <p class="pl-resenhaP">Como obra de ficção, Alice carece do enredo convencional que normalmente associamos a um conto coerente 
                                    e unificado. No entanto, ler Alice não nos deixa com uma sensação de incompletude; Alice é muito mais do que apenas uma série 
                                    de episódios desconectados. Na verdade, Alice é contada na forma de um sonho; é a história do sonho de Alice, contada do ponto 
                                    de vista da terceira pessoa. Como Carroll escolheu um sonho como estrutura para sua história, ele estava livre para ridicularizar 
                                    e satirizar as inúmeras máximas didáticas vitorianas na literatura infantil.</p>
                                <div class="pl-autorResenha">
                                    <h3><img src="assets/user-icon.png" alt="User Icon"/>Autor Resenha</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide> 
                            <div class="pl-resDescription">
                                <h2 class="pl-tituloResenha">Título da Resenha</h2>
                                <p class="pl-resenhaP">Como obra de ficção, Alice carece do enredo convencional que normalmente associamos a um conto coerente 
                                    e unificado. No entanto, ler Alice não nos deixa com uma sensação de incompletude; Alice é muito mais do que apenas uma série 
                                    de episódios desconectados. Na verdade, Alice é contada na forma de um sonho; é a história do sonho de Alice, contada do ponto 
                                    de vista da terceira pessoa. Como Carroll escolheu um sonho como estrutura para sua história, ele estava livre para ridicularizar 
                                    e satirizar as inúmeras máximas didáticas vitorianas na literatura infantil.</p>
                                <div class="pl-autorResenha">
                                    <h3><img src="assets/user-icon.png" alt="User Icon"/>Autor Resenha</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                    <div class="botSlider">
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                </div>
                <Swiper/>
            </div>
        </body>
    )
}

export default ReviewSection