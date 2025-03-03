import React, { useState } from "react";
import styles from "../styles/GenreSelector.module.css";

const genreMap = {
  "Infantil": "INFANTIS",
  "Mistério": "MISTERIO",
  "Fantasia": "FANTASIA",
  "Ficcao Científica": "FICCAO_CIENTIFICA",
  "Ficção": "FICCAO",
  "Não Ficção": "NAO_FICCAO",
  "Ciência": "CIENCIA",
  "Histórico": "AUTOAJUDA", // Ajuste necessário conforme o contexto do backend
  "Tecnologia": "TECNOLOGIA",
  "Biografia": "BIOGRAFIA",
  "Romance": "ROMANCE",
  "Saude e Hábitos": "SAUDE_E_HABITOS",
};

const genres = Object.keys(genreMap);

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
    const backendGenres = selectedGenres.map((genre) => genreMap[genre] || genre);
    console.log("Gêneros convertidos para envio:", backendGenres);
    onSave(backendGenres);
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
