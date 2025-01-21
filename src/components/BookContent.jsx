import React from "react";
import { StarRating } from "./StarRating";

function BookContent() {
    return(
        <body>
            <div class="pl-grid">
                <div class="pl-capaLivro">
                    <div class="pl-capa">
                        <img src="assets/capa-APM.jpg" alt="Capa Alice no País das Maravilhas"/>
                    </div>
                    <div class="pl-buttonComprar">
                        <button class="pl-compreAqui"><img src="assets/shoppingCart-icon.png" alt="Carrinho de Compra Ícone" height="25px" width="auto"/> Compre Aqui</button>
                    </div>
                </div>
                <div class="pl-descriptionLivro">
                    <p><strong>Alice no País das Maravilhas</strong></p>
                    <p><strong>Autor: </strong>Lewis Carrol</p>
                    <p><strong>Editora: </strong>Darkside</p>
                    <p><strong>Data de lançamento: </strong>04/06/1865</p>
                    <p><strong>Sinopse:</strong></p>
                    <p class="sinopse">Uma menina, um coelho e uma história capazes de fazer qualquer um de nós voltar a sonhar. Alice é despertada de um leve sono ao pé de uma 
                        árvore por um coelho peculiar. Uma criatura alva e falante com roupas engraçadas, que consulta seu relógio e reclama do próprio atraso. 
                        Curiosa como toda criança, Alice segue o animal até cair em um buraco sem fim que mudou para sempre a literatura infantil. 
                        Mais de 150 anos depois, Alice no País das Maravilhas continua repleto de ensinamentos para aqueles que ousaram seguir o 
                        Coelho Branco até sua toca.</p>
                    <div class="genres">
                        <button class="pl-bg1">Gênero 1</button>
                        <button class="pl-bg2">Gênero 2</button>
                        <button class="pl-bg3">Gênero 3</button>
                    </div>
                    <div class="pl-addShelf">
                        <button>Adicionar à estante</button>
                        <div class="pl-infoStatus">
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="pl-rating">
                    <div class="rating">
                        <StarRating/>
                </div>
            </div>
        </div>
        </body>
    )
}

export default BookContent