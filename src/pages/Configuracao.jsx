import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/Configuracao.module.css';
import GenreSelector from '../components/GenreSelector';
import useAuth from "../context/AuthContext";
import backendApi from "../services/backendApi";

function Configuracao() {
  const { token, user } = useContext(useAuth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [genres, setGenres] = useState([]); 
  const [showGenres, setShowGenres] = useState(false);  
  const [notifications, setNotifications] = useState({
    resposta: true,
    seguidor: true,
    curtida: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [perfilData, setPerfilData] = useState(null);

  // dados do usuário ao carregar
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.perfil && user.perfil.id) {
        try {

          const response = await backendApi.get(`/perfil/${user.perfil.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (response.data && response.data.data) {
            setPerfilData(response.data.data);
            
            // dados do usuário
            setUsername(response.data.data.usuario.username || '');
            setEmail(response.data.data.usuario.email || '');
            
            // gêneros favoritos
            if (response.data.data.generosFavoritos) {
              setGenres(response.data.data.generosFavoritos);
            }
          }
        } catch (error) {
          console.error("Erro ao buscar dados do perfil:", error.response?.data || error);
        }
      }
    };

    fetchUserData();
  }, [user, token]);

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem("notificationSettings"));
    if (savedNotifications) {
      setNotifications(savedNotifications);
    }
  }, []);

  // Callback para receber os gêneros do GenreSelector
  const handleGenreSelection = async (selectedGenres) => {
    setGenres(selectedGenres);
    setShowGenres(false); // Fechar o modal após salvar
    
    // generos no backend
    if (user && user.perfil && user.perfil.id) {
      try {
        const payload = {
          urlPerfil: perfilData.urlPerfil,
          resumoBio: perfilData.resumoBio,
          generosFavoritos: selectedGenres,
          urlBackPerfil: perfilData.urlBackPerfil,
          usuarioEmail: perfilData.usuario.email,
        };
        
        const response = await backendApi.put(`/perfil/${user.perfil.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data && response.data.success) {
          console.log("atualizados com suceso");
        }
      } catch (error) {
        console.error("erro:", error.response?.data || error);
      }
    }
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
    const updatedNotifications = { ...notifications, [name]: checked };
    setNotifications(updatedNotifications);
    localStorage.setItem("notificationSettings", JSON.stringify(updatedNotifications));
  };

  const toggleGenres = () => setShowGenres(!showGenres);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const confirmDelete = () => setIsConfirmingDelete(true);
  const cancelConfirmDelete = () => setIsConfirmingDelete(false);

  // tentar trocar a senha
  const handleModifyPassword = async () => {
    const currentPassword = document.querySelector('input[name="currentPassword"]').value;
    const newPassword = document.querySelector('input[name="newPassword"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;
    
    // Validação básica
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert("As senhas novas estão diferentes");
      return;
    }
    
    try {
      const response = await backendApi.put('/usuario/change-password', {
        oldPassword: currentPassword,
        newPassword: newPassword
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.success) {
        alert("Senha alterada com sucesso");
        // Limpar os campos
        document.querySelector('input[name="currentPassword"]').value = '';
        document.querySelector('input[name="newPassword"]').value = '';
        document.querySelector('input[name="confirmPassword"]').value = '';
        closeModal();
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      
      // Mostrar mensagem de erro mais detalhada
      if (error.response) {
        // O servidor respondeu com um status de erro
        alert("Erro: " + (error.response?.data?.message || "Senha atual incorreta ou erro no servidor"));
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        alert("Erro: Sem resposta do servidor. Verifique sua conexão.");
      } else {
        // Erro na configuração da requisição
        alert("Erro: " + error.message);
      }
    }
  };

  // excluir conta
  const handleDeleteAccount = async () => {
    try {
      const response = await backendApi.delete('/usuario', {
        headers: { Authorization: `Bearer ${token}` },
        data: { password: deletePassword }
      });
      
      if (response.data && response.data.success) {
        alert("Conta excluída com sucesso");
        window.location.href = '/login';
      }
    } catch (error) {
      alert("ERRO: " + (error.response?.data?.message || "ERRO =)"));
      console.error("ERRO:", error.response?.data || error);
    }
  };

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
          <span>Respostas</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              name="resposta"
              checked={notifications.resposta}
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
              name="seguidor"
              checked={notifications.seguidor}
              onChange={handleNotificationChange}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
       
        <div className={styles.notificationItem}>
          <span>Curtidas</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              name="curtida"
              checked={notifications.curtida}
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
              <button onClick={handleModifyPassword}>Confirmar</button>
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
                  <button className={styles.confirmDelete} onClick={handleDeleteAccount}>Confirmar</button>
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