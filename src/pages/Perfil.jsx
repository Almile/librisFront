import React from 'react';
import UserProfile from '../components/UserProfile';
import HeatMap from '../components/HeatMap';
import './../styles/perfil.css';
import ProfilePage from '../components/ProfilePage';
import BookCard from "../components/BookCard"


function Perfil() {

    return (
        <main className='main'>
            <UserProfile />
            <section className="top-comentarios">
           <ProfilePage/>

            </section>
            <section className="conteudo">
                <div className="heatmap">
                    <h2>HeatMap</h2>
                  <HeatMap />
                </div>
                <div className="lendo">
                    <h2>Lendo</h2>
                    <div className='leituras'>
                        <BookCard />
                        <BookCard />
                    </div>
                </div>
                <section className="estante">
                    <h2>Estante de Livros</h2>
                </section>
            </section>
        </main>
    );
}

export default Perfil;
