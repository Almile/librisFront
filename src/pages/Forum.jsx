import React, { useState, useEffect } from 'react';
import styles from '../styles/forum.module.css';
import { CommentForm } from "../components/CommentForm";
import Feed from "../components/Feed";
import CommentDetail from "../components/CommentDetail";

function Forum() {    
  const [posts, setPosts] = useState([]); // Armazena os posts
  const [selectedPost, setSelectedPost] = useState(null); // Guarda o post clicado
  const [tags, setTags] = useState([]); // Armazena as tags digitadas
  const [postText, setPostText] = useState(""); // Armazena o texto do post
  const [books, setBooks] = useState([]); // Estado para armazenar os livros
  const [filteredBooks, setFilteredBooks] = useState([]); // Livros filtrados para exibir na sugestão
  const [selectedBook, setSelectedBook] = useState(""); // Livro selecionado
  const [showDropdown, setShowDropdown] = useState(false); // Controle da exibição da lista
  const [selectedFilter, setSelectedFilter] = useState(null);

  const [isSpoiler, setIsSpoiler] = useState(false);

  // Carregar livros do localStorage quando o componente monta
  useEffect(() => {
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

  // Filtrar livros conforme o usuário digita
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

  // Quando o usuário clica em uma sugestão de livro
  const handleBookSelect = (title) => {
    setSelectedBook(title);
    setShowDropdown(false);
  };

  // Função para mudança de texto no campo de texto
  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleTagsChange = (e) => {
    const inputTags = e.target.value;
    const newTags = inputTags.split(',').map(tag => tag.trim()).filter(tag => tag); // separa as tags seguindo a vírgula
    setTags(newTags); // Atualiza as tags
    
  };

  const publish = (text) => {
    if (!text.trim()) return;
  
    // Verifica se as tags foram definidas 
    const extractedTags = tags.length > 0 ? tags : [...new Set(text.match(/#\w+/g))] || [];
    
    const newPost = {
      id: posts.length + 1,
      text,
      tags: extractedTags,
      selectedBook,
      isSpoiler,
      user: {
        name: "Nome_usuario",
        userImage: "/user_padrao.svg",
      },
      date: new Date().toLocaleString(),
      comments: [],
    };
  
    setPosts([newPost, ...posts]);
     // Limpa os campos de texto após o post
    setPostText("");
    setTags([]);
    setSelectedBook("")
  };

  const filteredPosts = selectedFilter
  ? posts.filter(post => 
      post.selectedBook === selectedFilter || post.tags.includes(selectedFilter)
    )
  : posts;

  const booksHype = ["One-Punch Man, Vol. 21", "O Senhor dos Anéis: As duas torres"]
  const tagsHype = ["end","e"]
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
           
            {/* Campo para texto do post */}
            <div className={styles.commentForm}>
            <CommentForm 
              onSubmit={publish} 
              initialText={postText} 
              isSpoiler={isSpoiler}
              setIsSpoiler={setIsSpoiler}    
              onTextChange={handleTextChange}
            />
            <div className={styles.optionalCamp}>
            {/* Campo para inserir tags */}
            <input 
              type="text"
              onChange={handleTagsChange} 
              placeholder="Adicione palavras-chave (separe por vírgula)" 
              className={styles.tagsInput} 
            />
           
             {/* Campo para buscar e selecionar um livro */}
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
            
            <button  onClick={() => publish(postText)} style={{display:'none'}}>Publicar</button>

            <button className={styles.loadPosts}>
              <ion-icon name="reload-outline"></ion-icon> Carregar publicações mais recentes
            </button>
            <Feed posts={filteredPosts} onPostClick={setSelectedPost} />

          </>
        )}
      </section>
      <aside className={styles.forumSidebar}>
      <div className={styles.search}>
              <input type="text" placeholder="Pesquisar" className={styles.searchInput} />
              <button className={styles.searchButton}>
                <ion-icon name="search-outline"></ion-icon>
              </button>
            </div>
        <div className={styles.filter}> 
          <h2>Filtrar</h2>  
          <p>Pessoas que sigo</p>
          <p>Pessoas que me seguem</p>
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


        <ul className={styles.filter}>
          <h2>Sugestões</h2>
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
