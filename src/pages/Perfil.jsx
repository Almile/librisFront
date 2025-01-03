import React from 'react'
import UserProfile  from '../components/UserProfile'
import CommentSection from '../components/CommentSection'
import './../styles/perfil.css';

function Perfil() {    

    return (
        <main>
            <UserProfile />
            <section className="top-comentarios">
                    <h2>Top Comentários e Resenhas</h2>
                </section>
            <section className="conteudo">
                
                <div className="heatmap">
                    <h2>HeatMap</h2>
                </div>
                <div className="lendo">
                 <h2>Lendo</h2>
                <button className="adicionar-leitura">Adicionar Leitura</button>
                </div>
                <section className="estante">
                <h2>Estante de Livros</h2>
                </section>
            </section>
        </main>
    )
}

export default Perfil
