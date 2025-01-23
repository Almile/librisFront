import React from "react";
import { StarRating } from "./StarRating";
import { Link, useLocation } from 'react-router-dom';
import useBookData from '../hooks/useBookData';

function BookContent() {
return(
        <body>
            <div className="pl-grid">
                <div className="pl-capa">
                    <img src="/capa-APM.jpg" alt="Capa Livro"/>
                </div>
                <div className="pl-descriptionLivro">
                    <p className="pl-titulo"><strong>Alice no País das Maravilhas</strong></p>
                    <p className="pl-autor">Lewis Carrol</p>
                    <div className="pl-rating">
                        <div className="rating">
                            <StarRating/>
                        </div>
                    </div>
                    <div className="pl-genres">
                        <button class="pl-bg1">Gênero 1</button>
                        <button class="pl-bg2">Gênero 2</button>
                        <button class="pl-bg3">Gênero 3</button>
                    </div>
                    <p className="pl-sinopse">Uma menina, um coelho e uma história capazes de fazer qualquer um de nós voltar a sonhar. Alice é despertada de um leve sono ao pé de uma 
                        árvore por um coelho peculiar. Uma criatura alva e falante com roupas engraçadas, que consulta seu relógio e reclama do próprio atraso. 
                        Curiosa como toda criança, Alice segue o animal até cair em um buraco sem fim que mudou para sempre a literatura infantil. 
                        Mais de 150 anos depois, Alice no País das Maravilhas continua repleto de ensinamentos para aqueles que ousaram seguir o 
                        Coelho Branco até sua toca.</p>
                    <div className="pl-buttons">
                        <button className="pl-buttonAddEstante">Adicionar à estante</button>
                        <button className="pl-buttonFavoritar">Favoritar</button>
                    </div>
                    <div className="pl-styleLinha" />
                    <div className="pl-infoGrid">
                        <div className="pl-infoItem">
                            <p className="pl-infoCat">ISBN:</p><p className="pl-infoInfo">9788594541758</p>
                        </div>
                        <div className="pl-infoItem">
                            <p className="pl-infoCat">Data de publicação:</p><p className="pl-infoInfo">04/jun/1865</p>
                        </div>
                        <div className="pl-infoItem">
                            <p className="pl-infoCat">Idioma:</p><p className="pl-infoInfo">Português</p>
                        </div>
                        <div className="pl-infoItem">
                            <p className="pl-infoCat">Editora:</p><p className="pl-infoInfo">Darkside</p>
                        </div>
                        <div className="pl-infoItem">
                            <p className="pl-infoCat">Páginas:</p><p className="pl-infoInfo">208</p>
                        </div>
                        <div className="pl-infoItem">
                            <p className="pl-infoCat">Faixa etária:</p><p className="pl-infoInfo">12+</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default BookContent