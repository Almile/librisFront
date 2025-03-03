import React, { useContext, useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import HeatMap from '../components/HeatMap';
import './../styles/perfil.css';
import CommentsProfile from '../components/CommentsProfile';
import BookCard from "../components/BookCard";
import EstanteLivros from '../components/EstanteLivros';
import { useParams } from 'react-router-dom';
import { getFavoritosByPerfil } from '../services/librisApiService';
import useAuth from "../context/AuthContext"; 
import {getLeituraByUser, getPerfilById} from "../services/librisApiService";

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
  


function Perfil() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const { user } = useContext(useAuth);
  const [lendo, setLendo] = useState([]);
  const [lidos, setLidos] = useState([]);
  const [abandonados, setAbandonados] = useState([]);

  const currentUser = {
    id: id,
  };

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await getFavoritosByPerfil(id);
        setFavoritos(response.data.data.content.map((livro) => livro.googleId))
        
      } catch (error){
        console.error(error);
      }
      try {
        const perfil = await getPerfilById(id);
        const response = await getLeituraByUser(perfil.data.data.usuario.username);
        response.data.data.content.forEach(livro => {

          if (livro.status == "LENDO") setLendo(prev => {
            if (prev.includes(livro.googleId)) return prev;
            else return [...prev, livro.googleId]
          });

          else if (livro.status == "LIDO") setLidos(prev => {
            if (prev.includes(livro.googleId)) return prev;
            else return [...prev, livro.googleId]
          });

          else setAbandonados(prev => {
            if (prev.includes(livro.googleId)) return prev;
            else return [...prev, livro.googleId]
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchLivros();
  }, [id, user]);

    return (
        <main className='main'>
            <UserProfile id={id} isOwner={isOwner} setIsOwner={setIsOwner}/>
            <section className="top-comentarios">
            <h2>Seus Comentários</h2>
              <CommentsProfile allComments={allComments} currentUser={currentUser} />
              <button className='view-history'>Visualizar historico Completo</button>
            </section>
            <section className="conteudo">
                
                <div className="lendo">
                    <h2>Lendo</h2>
                    <div className='leituras'>
                    {lendo.map(googleId => <BookCard key={googleId} id={googleId} username={user.data.username} showUpdate={isOwner} setLidos={setLidos} setLendo={setLendo} perfilId={id}/>)}
                    </div>
                </div>               
        <div className="heatmap">
          <h2>HeatMap</h2>
          <HeatMap />
        </div>
        <section className="estante">
          <h2 className="section-title">Estante de Livros</h2>

          <h2 className="topico-estante">Favoritos</h2>
          <EstanteLivros items={favoritos} setItems={setFavoritos} />

          <h2 className="topico-estante">Lidos</h2>
          <EstanteLivros items={lidos} setItems={setLidos} />

          <h2 className="topico-estante">Descontinuados</h2>
          <EstanteLivros items={abandonados} setItems={setAbandonados} />
        </section>
      </section>
    </main>
    );
}

export default Perfil;
