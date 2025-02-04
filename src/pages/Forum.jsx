import React, { useState } from 'react';
import styles from '../styles/forum.module.css';
import { CommentForm } from "../components/CommentForm";
import Feed from "../components/Feed";

function Forum() {    
  const [post, setPost] = useState("");
  const [selectedPost, setSelectedPost] = useState(null); // Guarda o post clicado

  const publish = (text) => {
    setPost(text);
    alert('Alterações salvas com sucesso!');
  };

  return (
    <main className={styles.forum}>
      <section className={styles.forumContent}>
        {selectedPost ? ( 
          // Exibe o post clicado no lugar do fórum
          <div className={styles.postDetail}>
            <button onClick={() => setSelectedPost(null)}>Voltar</button>
            <h3>{selectedPost.user.name}</h3>
            <p>{selectedPost.text}</p>
          </div>
        ) : (
          <>
            <div className={styles.search}>
              <input type="text" placeholder="Pesquisar" className={styles.searchInput} />
              <button className={styles.searchButton}>
                <ion-icon name="search-outline"></ion-icon>
              </button>
            </div>
            <CommentForm onSubmit={(text) => publish(text)} initialText={post} />
            <button className={styles.loadPosts}>
              <ion-icon name="reload-outline"></ion-icon> Carregar publicações mais recentes
            </button>
            <Feed onPostClick={setSelectedPost} />
          </>
        )}
      </section>
      <aside className={styles.forumSidebar}>
        <div className={styles.filter}> 
          <h2>Filtrar</h2>  
          <p>Pessoas que sigo</p>
          <p>Pessoas que me seguem</p>
        </div>
        <div className={styles.filter}>
          <h2>Em alta</h2>  
          <p>Nome do livro</p>
          <p>Nome do livro</p>
          <p>#Tag</p>
          <p>#Tag</p>
        </div>
        <ul className={styles.filter}>
          <h2>Siga também</h2>
          <li className={styles.followItem}>
            <img src="/user_padrao.svg" className={styles.followImage} alt="Foto do Perfil"/>
            <span>Nome do usuário</span>
          </li>
        </ul>
      </aside>
    </main>
  );
}

export default Forum;
