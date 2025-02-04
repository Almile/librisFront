import React, { useState } from "react";
import styles from "../styles/GenreSelector.module.css";

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

const GenreSelector = ({ onSave, initialGenres = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState(initialGenres);

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

  const savePreferences = () => {
    onSave(selectedGenres);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div id={styles.modal}>
          <div className={styles.modalPreferences}>
            <div className={styles.modalContentGenres}>
              <h3>Seja bem-vindo à sua rede social de livros</h3>
              <p className={styles.textExplication}>
                Para melhorarmos sua experiência na plataforma, selecione seus gêneros
                de leitura favoritos:
              </p>
              <div className={styles.genresContainer}>
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`${styles.genreBtn} ${
                      selectedGenres.includes(genre) ? styles.selected : ""
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

            <div className={styles.selectedGenres}>
              <span className={styles.alertMessage}>
                Selecione no máximo 3 gêneros
              </span>
              <div className={styles.selectedItems}>
                {selectedGenres.map((genre, index) => (
                  <button
                    key={genre}
                    className={styles.selectedItem}
                    onClick={() => removeGenre(index)}
                  >
                    {genre}
                    <ion-icon name="close-circle"></ion-icon>
                  </button>
                ))}
              </div>
              <button
                onClick={savePreferences}
                className={`${styles.savePreferences} ${
                  selectedGenres.length > 0 ? styles.enabled : ""
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

export default GenreSelector;
