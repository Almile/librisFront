import React, { useState, useContext, useEffect } from 'react';
import styles from '../styles/forum.module.css';
import { CommentForm } from "../components/CommentForm";
import Feed from "../components/Feed";
import CommentDetail from "../components/CommentDetail";
import User from "../components/User";
import backendApi from "../services/backendApi"; 
import useAuth from '../context/AuthContext';

function Forum() {    
  const { token, user } = useContext(useAuth);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [postText, setPostText] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [seguindo, setSeguindo] = useState([]);
  const [seguidores, setSeguidores] = useState([]);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [seguirRecomendados, setSeguirRecomendados] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await backendApi.get("/posts/listar", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data.content)) {
          setPosts(response.data.content);
        } else {
          console.error("Expected an array but got:", response.data);
          setPosts([]); // Handle accordingly
        }
        console.log("Resposta completa da API:", response.data);

      } catch (error) {
        console.error("Erro ao carregar posts:", error);
        setPosts([]); 
      }
    };
  
    fetchPosts();
  }, []); // Apenas executa uma vez ao montar o componente

  
  useEffect(() => {
    const storedBooks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const bookData = JSON.parse(localStorage.getItem(key));
        if (bookData && bookData.title ) {
          storedBooks.push(bookData);
        }
      } catch (error) {
        console.error("Erro ao processar livro do localStorage:", error);
      }
    }

    setBooks(storedBooks);
  }, [token]);
  
  const handleBookSearch = (e) => {
    const searchValue = e.target.value;
    setSelectedBook(searchValue);
    
    if (searchValue.length > 0) {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredBooks(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    console.log("posts atualizados: ", posts);
  }, [posts]);
  
  const handleBookSelect = (book) => {  // ✅ Agora 'book' representa o objeto do livro selecionado
    setSelectedBook(book);  // ✅ Salva o objeto inteiro, não apenas o título
    setShowDropdown(false);
    setSearchQuery("");  
  };

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleTagsChange = (e) => {
    const inputTags = e.target.value;
    const newTags = inputTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    setTags(newTags);
  };

  useEffect(() => {
    console.log("Estado postText atualizado:", postText);
  }, [postText]);
  
  const publish = async (content) => {
    if (!content.trim()) {
      console.error("O campo de texto não pode estar vazio.");
      return;
    }
    try {
      const responsePosts = await backendApi.post("/posts", {
        texto: content, // Usa o texto passado
        tags: tags.join(", "),
        possuiSpoiler: isSpoiler,
        perfilId: user?.perfil?.id,
        googleId: selectedBook?.id || null,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Post publicado.", responsePosts);
      setPosts(prevPosts => [responsePosts.data, ...prevPosts]);
    } catch (error) {
      console.error("Erro ao publicar post:", error);
    }
  };
  
  const filteredPosts = Array.isArray(posts) ? posts.filter(post => {
    if (!selectedFilter && !searchQuery) return true;
  
    if (selectedFilter === "seguindo") {
      return seguindo.includes(post.perfil?.name);
    }
    
    if (selectedFilter === "seguidores") {
      return seguidores.includes(post.perfil?.name);
    }
  
    if (searchQuery) {
      return post.perfil?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
             post.texto.toLowerCase().includes(searchQuery.toLowerCase()) || 
             post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) || 
             post.livro?.toLowerCase().includes(searchQuery.toLowerCase());
    }
  
    return post.livro === selectedFilter || post.tags.includes(selectedFilter);
  }) : [];

  const booksHype = ["One-Punch Man, Vol. 21", "O Senhor dos Anéis: As Duas Torres"];
  const tagsHype = ["end", "e"];

  useEffect(() => {
    const fetchPerfis = async () => {
      try {
        const responsePerfil = await backendApi.get(`/perfil/listar`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Resposta completa dos perfis:", responsePerfil.data);
  
        // Verifique se 'data.content' é um array antes de setar no estado
        if (Array.isArray(responsePerfil.data.data.content)) {
          setSeguirRecomendados(responsePerfil.data.data.content);
        } else {
          console.error("Esperado um array em 'data.content', mas recebemos:", responsePerfil.data.data.content);
          setSeguirRecomendados([]); // Define um valor padrão (vazio) caso não seja um array
        }
      } catch (error) {
        console.error("Erro ao carregar perfis:", error.response ? error.response.data : error.message);
      }
    };
  
    if (user?.perfil?.id) {
      fetchPerfis();
    }
  }, [user]);
  
  

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
              onTextChange={setPostText} // Mantém o estado sincronizado
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
                    value={selectedBook?.title}
                    onChange={handleBookSearch}
                    placeholder="Marcar Livro"
                    className={styles.tagsInput}
                    onFocus={() => setShowDropdown(true)}
                  />
                     {showDropdown && (
                    <ul className={styles.dropdownList}>
                      {filteredBooks.map((book, index) => (
                        <li 
                        key={index} 
                        onClick={() => handleBookSelect(book)} // ✅ Agora passamos o objeto inteiro
                      >
                        {book.title}
                      </li>
                      
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            </div>
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

      <div className={styles.filter}>
      <h2>Em alta</h2>  
      {booksHype.map((book) => (
        <p onClick={() => setSelectedFilter(book)}>
          {book}
        </p>
      ))}
      {tagsHype.map((tag, index) => (
        <p key={index} onClick={() => setSelectedFilter(`${tag}`)}>
          #{tag}
        </p>
      ))}
      </div>
      <div className={styles.filter}>
        <h2>Sugestões</h2>
        {seguirRecomendados.map((perfilRec) => (
          user?.perfil?.id !== perfilRec.id && ( // Não exibe o próprio usuário nas sugestões
            <User 
              nome={perfilRec.username} 
              imagem={perfilRec.urlPerfil} 
              id={perfilRec.id} 
              key={perfilRec.id}
            />
          )
        ))}
      </div>

      </aside>
    </main>
  );
}

export default Forum;
