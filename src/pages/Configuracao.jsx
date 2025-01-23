import React, { useState } from 'react';
import '../styles/configuracao.css';

function Configuracao() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [genres, setGenres] = useState([]);
  const [showGenres, setShowGenres] = useState(false);
  const [notifications, setNotifications] = useState({
    mentions: false,
    followers: false,
    newFollowers: false,
    likes: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

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
    <div className="config-page">
      <h1>Configurações do Perfil</h1>
      <label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          placeholder='@nome de usuário'
        />
      </label>
      <label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='exemplo@exemplo'
        />
      </label>
      <label className="password-label">
        Senha:
        <div className="password-container">
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Senha'
            />
            <button type="button" onClick={toggleShowPassword} className="toggle-password">
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button onClick={openModal} className="modify-password">Modificar Senha</button>
        </div>
      </label>
      <div className="genres-label">
        <div className="genres-header" onClick={toggleGenres}>
          <span>Gêneros Favoritos</span>
          <span className="selected-genres">{genres.join(', ')}</span>
          <span className="edit-icon">✎</span>
        </div>
        {showGenres && (
          <div className="genres-options">
            <label>
              <input type="checkbox" name="genres" value="Ação" onChange={handleInputChange} checked={genres.includes('Ação')} />
              Ação
            </label>
            <label>
              <input type="checkbox" name="genres" value="Aventura" onChange={handleInputChange} checked={genres.includes('Aventura')} />
              Aventura
            </label>
            <label>
              <input type="checkbox" name="genres" value="Mistério" onChange={handleInputChange} checked={genres.includes('Mistério')} />
              Mistério
            </label>
            {/* Adicione mais gêneros conforme necessário */}
          </div>
        )}
      </div>
      <h1>Configurações de Notificação</h1>
      <div className="notification-settings">
        <div className="notification-item">
          <span>Menções</span>
          <label className="switch">
            <input
              type="checkbox"
              name="mentions"
              checked={notifications.mentions}
              onChange={handleNotificationChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="notification-item">
          <span>Seguidores</span>
          <label className="switch">
            <input
              type="checkbox"
              name="followers"
              checked={notifications.followers}
              onChange={handleNotificationChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="notification-item">
          <span>Novos Seguidores</span>
          <label className="switch">
            <input
              type="checkbox"
              name="newFollowers"
              checked={notifications.newFollowers}
              onChange={handleNotificationChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="notification-item">
          <span>Curtidas</span>
          <label className="switch">
            <input
              type="checkbox"
              name="likes"
              checked={notifications.likes}
              onChange={handleNotificationChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="fixed-delete-account" onClick={openDeleteModal}>
        Excluir conta
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
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
            <div className="modal-actions">
              <button onClick={closeModal}>Cancelar</button>
              <button onClick={() => console.log('Modificar senha')}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {isConfirmingDelete ? (
              <>
                <h2>Confirme sua senha para excluir</h2>
                <label>
                  <input type="password" name="deletePassword" value={deletePassword} onChange={handleInputChange} placeholder="Digite sua senha" />
                </label>
                <div className="modal-actions">
                  <button onClick={cancelConfirmDelete} className="cancel-delete">Cancelar</button>
                  <button className="confirm-delete" onClick={() => console.log('Conta excluída')}>Confirmar</button>
                </div>
              </>
            ) : (
              <>
                <h2>Deseja realmente excluir sua conta?</h2>
                <p>Esta ação não pode ser desfeita.</p>
                <div className="modal-actions">
                  <button onClick={closeDeleteModal} className="cancel-delete">Cancelar</button>
                  <button className="confirm-delete" onClick={confirmDelete}>Excluir Conta</button>
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

