import React, { useState, useEffect } from 'react';
import styles from '../styles/forum.module.css';
import { CommentForm } from "../components/CommentForm";
import Feed from "../components/Feed";
import CommentDetail from "../components/CommentDetail";
import User from "../components/User";
import backendApi from "../services/backendApi"; // Certifique-se de que isso é importado corretamente
import { useAuth } from '../context/AuthContext';

function Forum() {    
  const { user } = useAuth();
  const [posts, setPosts] = useState([]); // Armazena os posts
  const [selectedPost, setSelectedPost] = useState(null); // Guarda o post clicado
  const [tags, setTags] = useState([]); // Armazena as tags digitadas
  const [postText, setPostText] = useState(""); // Armazena o texto do post
  const [books, setBooks] = useState([]); // Estado para armazenar os livros
  const [filteredBooks, setFilteredBooks] = useState([]); // Livros filtrados para exibir na sugestão
  const [selectedBook, setSelectedBook] = useState(""); // Livro selecionado
  const [showDropdown, setShowDropdown] = useState(false); // Controle da exibição da lista
  const [searchQuery, setSearchQuery] = useState(""); // Para o filtro de pesquisa
  
  const [seguindo, setSeguindo] = useState([]); // Lista de usuários que o usuário segue
  const [seguidores, setSeguidores] = useState([]); // Lista de seguidores do usuário

  const [isSpoiler, setIsSpoiler] = useState(false);
  
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await backendApi.get("/posts/listar");
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      }
    };

    fetchPosts();

    const storedBooks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const bookData = JSON.parse(localStorage.getItem(key));
        if (bookData && bookData.title) {
          storedBooks.push(bookData);
        }
      } catch (error) {
        console.error("Erro ao processar livro do localStorage:", error);
      }
    }

    setBooks(storedBooks);
  }, []);

  const handleBookSearch = (e) => {
    const searchValue = e.target.value;
    setSelectedBook(searchValue);
    
    if (searchValue.length > 0) {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredBooks(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleBookSelect = (title) => {
    setSelectedBook(title);
    setShowDropdown(false);
  };

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleTagsChange = (e) => {
    const inputTags = e.target.value;
    const newTags = inputTags.split(',').map(tag => tag.trim()).filter(tag => tag); // separa as tags seguindo a vírgula
    setTags(newTags); // Atualiza as tags
  };

  const publish = async (text) => {
    if (!text.trim()) return;

    const extractedTags = tags.length > 0 ? tags : [...new Set(text.match(/#\w+/g))] || [];
    
    const newPost = {
      texto: postText,
      tags: extractedTags, // Junta as tags como string
      possuiSpoiler: isSpoiler,
      livro: selectedBookid, // Livro selecionado
      dataCriacao: new Date().toISOString(),
      comentarios: [],
      perfil: user?.perfil?.id, // ID do perfil do usuário
    };

    try {
      const response = await backendApi.post("/posts", newPost);
      setPosts([response.data, ...posts]); // Adiciona o novo post no início
      setPostText(""); // Limpa o campo de texto após o post
      setTags([]);
      setSelectedBook("");
    } catch (error) {
      console.error("Erro ao publicar post:", error);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true; // Se não há filtro, retorna todos
    return post.texto.toLowerCase().includes(searchQuery.toLowerCase()) || post.tags.toLowerCase().includes(searchQuery.toLowerCase()) || post.livro.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <main className={styles.forum}>
      <section className={styles.forumContent}>
        {selectedPost ? (
          <div className={styles.postDetail}>
            <button className={styles.backButton} onClick={() => setSelectedPost(null)}>
              <ion-icon name="arrow-back-outline"></ion-icon>
              <span>Voltar para Feed</span>
            </button>
            <CommentDetail {...selectedPost} />
          </div>
        ) : (
          <>
            <div className={styles.commentForm}>
              <CommentForm 
                onSubmit={publish} 
                initialText={postText} 
                isSpoiler={isSpoiler}
                setIsSpoiler={setIsSpoiler}    
                onTextChange={handleTextChange}
              />
              <div className={styles.optionalCamp}>
                <input 
                  type="text"
                  onChange={handleTagsChange} 
                  placeholder="Adicione palavras-chave (separe por vírgula)" 
                  className={styles.tagsInput} 
                />
                <div className={styles.bookSelector}>
                  <input
                    type="text"
                    value={selectedBook}
                    onChange={handleBookSearch}
                    placeholder="Marcar Livro"
                    className={styles.tagsInput}
                    onFocus={() => setShowDropdown(true)}
                  />
                  {showDropdown && filteredBooks.length > 0 && (
                    <ul className={styles.dropdownList}>
                      {filteredBooks.map((book, index) => (
                        <li 
                          key={index} 
                          onClick={() => handleBookSelect(book.title)}
                          className={styles.dropdownItem}
                        >
                          {book.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <button className={styles.loadPosts}>
              <ion-icon name="reload-outline"></ion-icon> Carregar publicações mais recentes
            </button>
            <Feed posts={filteredPosts} onPostClick={setSelectedPost} />
          </>
        )}
      </section>

      <aside className={styles.forumSidebar}>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Pesquisar" 
            className={styles.searchInput} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchButton}>
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>

        <div className={styles.filter}> 
          <h2>Filtrar</h2>  
          <p onClick={() => setSelectedFilter("seguindo")}>Pessoas que sigo</p>
          <p onClick={() => setSelectedFilter("seguidores")}>Pessoas que me seguem</p>
        </div>
      </aside>
    </main>
  );
}

export default Forum;
