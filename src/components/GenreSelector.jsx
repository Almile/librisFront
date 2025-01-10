import React, { useState } from "react";
import "../styles/genreSelector.css";

const genres = [
  "Infantil",
  "Mistério",
  "Fantasia",
  "Ficção Científica",
  "Ficção",
  "Não Ficção",
  "Ciência",
  "Histórico",
  "Tecnologia",
  "Biografia",
  "Romance",
  "Saude e Hábitos",
];

const GenreSelector = () => {
   const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

   const removeGenre = (index) => {
    setSelectedGenres(selectedGenres.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div> 
    {isModalOpen && (
      <div id="modal">

    <div className="modal-preferences">
        <div>
            <h3>Seja bem-vindo à sua rede social de livros</h3>
            <p className="text-explication">
                Para melhorarmos sua experiência na plataforma, selecione seus gêneros
                de leitura favoritos:
            </p>
            <div className="genres-container">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-btn ${
              selectedGenres.includes(genre) ? "selected" : ""
            }`}
            onClick={() => toggleGenre(genre)}
            disabled={
              selectedGenres.length >= 3 && !selectedGenres.includes(genre)
            }
          >
            {genre}
          </button>
        ))}
        </div>
        </div>      

      <div className="selected-genres">
        <span className="alert-message">Selecione no máximo 3 gêneros</span>
        <div className="selected-items">
          {selectedGenres.map((genre, index) => (
            <button key={genre} className="selected-item" onClick={() => removeGenre(index)}>
              {genre}
                <ion-icon name="close-circle"></ion-icon>
            </button>
          ))}
        </div>
        <button  onClick={closeModal}
        className={`save-preferences ${
          selectedGenres.length > 0 ? "enabled" : ""
        }`}
        disabled={selectedGenres.length === 0}
      >
        Salvar preferências
      </button>
      </div>      
    </div>
    </div>
      )}
      </div>
  );
};
export default GenreSelector