import React from 'react';
import UserProfile from '../components/UserProfile';
import HeatMap from '../components/HeatMap';
import './../styles/perfil.css';
import CommentsProfile from '../components/CommentsProfile';
import BookCard from "../components/BookCard"


const allComments = [
    {
      id: 1,
      bookTitle:"Harry Potter",
      text: "Este é um comentário sem spoiler.",
      user: { id: "user1", name: "João Silva", userImage: "https://via.placeholder.com/50" },
      date: "2025-01-15",
      isSpoiler: false,
      likedBy: [],
      likes: 12,
      rating: 4,
      parentId: null,
      replies: [],
    },
    {
      id: 2,
      text: "Uma resposta ao comentário.Uma resposta ao comentárioUma resposta ao comentárioUma resposta ao comentárioUma resposta ao comentário",
      user: { id: "user1", name: "Maria Oliveira", userImage: "https://via.placeholder.com/50" },
      date: "2025-01-16",
      isSpoiler: false,
      likedBy: [],
      likes: 0,
      rating: 2.3,
      parentId: 1,
      replies: [],
    },
  ];
  
  const currentUser = {
    id: "user1",
    name: "João Silva",
  };

function Perfil() {

    return (
        <main className='main'>
            <UserProfile />
            <section className="top-comentarios">
            <h2>Seus Comentários</h2>
              <CommentsProfile allComments={allComments} currentUser={currentUser} />
              <button className='view-history'>Visualizar historico Completo</button>
            </section>
            <section className="conteudo">
                
                <div className="lendo">
                    <h2>Lendo</h2>
                    <div className='leituras'>
                        <BookCard />
                        <BookCard />
                    </div>
                </div>
                
                <div className="heatmap">
                    <h2>HeatMap</h2>
                  <HeatMap />
                </div>

                <section className="estante">
                    <h2>Estante de Livros</h2>
                </section>
            </section>
        </main>
    );
}

export default Perfil;
