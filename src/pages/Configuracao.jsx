import React, { useState } from 'react';
import styles from '../styles/Configuracao.module.css';
import GenreSelector from '../components/GenreSelector';

function Configuracao() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [genres, setGenres] = useState(["Romance", "Fantasia"]); // Inicialize com valores padrão
  const [showGenres, setShowGenres] = useState(false);  const [notifications, setNotifications] = useState({
    mentions: false,
    followers: false,
    newFollowers: false,
    likes: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  // Callback para receber os gêneros do GenreSelector
  const handleGenreSelection = (selectedGenres) => {
    setGenres(selectedGenres);
    setShowGenres(false); // Fechar o modal após salvar
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'genres') {
      if (genres.includes(value)) {
        setGenres(genres.filter((genre) => genre !== value));
      } else if (genres.length < 3) {
        setGenres([...genres, value]);
      }
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'deletePassword') {
      setDeletePassword(value);
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const toggleGenres = () => setShowGenres(!showGenres);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const confirmDelete = () => setIsConfirmingDelete(true);
  const cancelConfirmDelete = () => setIsConfirmingDelete(false);

  return (
    <div className={styles.configPage}>
      <h1>Configurações do Perfil</h1>
      <label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          placeholder='@nome de usuário'
          disabled
        />
      </label>
      <label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='exemplo@exemplo'
          disabled
        />
      </label>
      <label className={styles.passwordLabel}>
        <div className={styles.passwordContainer}>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Senha'
              disabled
            />
            <button type="button" onClick={toggleShowPassword} className={styles.togglePassword}>
              {showPassword ? (<ion-icon name="eye-off-outline"></ion-icon>) : (<ion-icon name="eye-outline"></ion-icon>)}
            </button>
          </div>
          <button onClick={openModal} className={styles.modifyPassword}>Modificar Senha</button>
        </div>
      </label>
      <div className={styles.genresLabel}>
        <div className={styles.genresHeader} onClick={toggleGenres}>
          <span>Gêneros Favoritos</span>
          <span className={styles.selectedGenres}>{genres.join(', ')}</span>
          <span className={styles.editIcon}>✎</span>
        </div>
        {showGenres && (
          <div className={styles.genresOptions}>
            <GenreSelector onSave={handleGenreSelection} initialGenres={genres} />

          </div>
        )}
      </div>
      <h1>Configurações de Notificação</h1>
      <div className={styles.notificationSettings}>
        <div className={styles.notificationItem}>
          <span>Menções</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              name="mentions"
              checked={notifications.mentions}
              onChange={handleNotificationChange}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        <div className={styles.notificationItem}>
          <span>Seguidores</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              name="followers"
              checked={notifications.followers}
              onChange={handleNotificationChange}
            />
            <span  className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        <div className={styles.notificationItem}>
          <span>Novos Seguidores</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              name="newFollowers"
              checked={notifications.newFollowers}
              onChange={handleNotificationChange}
            />
            <span  className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        <div className={styles.notificationItem}>
          <span>Curtidas</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              name="likes"
              checked={notifications.likes}
              onChange={handleNotificationChange}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
      </div>
      <div className={styles.fixedDeleteAccount} onClick={openDeleteModal}>
        Excluir conta
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Modificar Senha</h2>
            <label>
              Senha Atual:
              <input type="password" name="currentPassword" placeholder="Senha Atual" />
            </label>
            <label>
              Nova Senha:
              <input type="password" name="newPassword" placeholder="Nova Senha" />
            </label>
            <label>
              Confirmar Senha:
              <input type="password" name="confirmPassword" placeholder="Confirmar Senha" />
            </label>
            <div className={styles.modalActions}>
              <button onClick={closeModal}>Cancelar</button>
              <button onClick={() => console.log('Modificar senha')}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {isConfirmingDelete ? (
              <>
                <h2>Confirme sua senha para excluir</h2>
                <label>
                  <input type="password" name="deletePassword" value={deletePassword} onChange={handleInputChange} placeholder="Digite sua senha" />
                </label>
                <div className={styles.modalActions}>
                  <button onClick={cancelConfirmDelete} className={styles.cancelDelete}>Cancelar</button>
                  <button className={styles.confirmDelete} onClick={() => console.log('Conta excluída')}>Confirmar</button>
                </div>
              </>
            ) : (
              <>
                <h2>Deseja realmente excluir sua conta?</h2>
                <p>Esta ação não pode ser desfeita.</p>
                <div className={styles.modalActions}>
                  <button onClick={closeDeleteModal} className={styles.cancelDelete}>Cancelar</button>
                  <button className={styles.confirmDelete} onClick={confirmDelete}>Excluir Conta</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Configuracao;

