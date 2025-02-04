import React from 'react';
import UserProfile from '../components/UserProfile';
import HeatMap from '../components/HeatMap';
import './../styles/perfil.css';
import CommentsProfile from '../components/CommentsProfile';
import BookCard from "../components/BookCard";
import EstanteLivros from '../components/EstanteLivros';

const allComments = [
  {
    id: 1,
    bookTitle:"O Senhor dos Anéis",
    text: "Uma resposta ao comentário.Uma resposta ao comentárioUma resposta ao comentárioUma resposta ao comentárioUma resposta ao comentário",
    user: { id: "user1", name: "João Silva", userImage: "https://via.placeholder.com/50" },
    date: "2025-01-16",
    isSpoiler: false,
    likedBy: [],
    likes: 1,
    rating: 2.3,
    parentId: 1,
    replies: [],
  },
  {
    id: 3,
    bookTitle:"One Punch Man",
    text: "Uma resposta ao comentário.Uma resposta ao comentárioUma resposta ao comentárioUma resposta ao comentárioUma resposta ao comentário",
    user: { id: "user1", name: "João Silva", userImage: "https://via.placeholder.com/50" },
    date: "2025-01-17",
    isSpoiler: false,
    likedBy: [],
    likes: 3,
    rating: 5.5,
    parentId: 1,
    replies: [],
  },
  {
    id: 4,
    bookTitle:"Harry Potter",
    text: "Este é um comentário sem spoiler.",
    user: { id: "user1", name: "João Silva", userImage: "https://via.placeholder.com/50" },
    date: "2025-01-15",
    isSpoiler: false,
    likedBy: [],
    likes: 4,
    rating: 4,
    parentId: null,
    replies: [],
  },
    
  ];
  
  const currentUser = {
    id: "user1",
    name: "João Silva",
  };

function Perfil() {
  const favoritos = [
    "gIr-DwAAQBAJ",
    "GaZMDwAAQBAJ",
    "PM2uCgAAQBAJ",
    "5BclEAAAQBAJ",
    "W_tcDwAAQBAJ",
  ];

  const lidos = [
    "m3lvDwAAQBAJ",
  ];

  const descontinuados = [
    "C3wTEAAAQBAJ",
  ];

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
                        <BookCard id={"UbKuDwAAQBAJ"}/>
                        <BookCard id={"_i6bDeoCQzsC"}/>
                    </div>
                </div>               
        <div className="heatmap">
          <h2>HeatMap</h2>
          <HeatMap />
        </div>
        <section className="estante">
          <h2 className="section-title">Estante de Livros</h2>

          <h2 className="topico-estante">Favoritos</h2>
          <EstanteLivros filtro={favoritos} />

          <h2 className="topico-estante">Lidos</h2>
          <EstanteLivros filtro={lidos} />

          <h2 className="topico-estante">Descontinuados</h2>
          <EstanteLivros filtro={descontinuados} />
        </section>
      </section>
    </main>
    );
}

export default Perfil;
