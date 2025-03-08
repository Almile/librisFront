import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/notificacoes.css";
import { useAuth } from '../context/AuthContext';
import backendApi from "../services/backendApi";

const Notificacoes = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Todos");
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    fetchNotifications(); // Chamada inicial
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [token, user]);

  const fetchNotifications = async () => {
    if (!token || !user?.perfil?.id) return;
    try {
      const resp = await backendApi.get(`/notificacoes/perfil/${user.perfil.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      console.log("Resposta da API:", resp.data.data.content);
    
      setNotificacoes(resp.data.data.content || []);
      console.log("notificações : ",resp.data.data.content)
    } catch (error) {
      console.error("Erro ao buscar notificações:", error.response?.data || error.message);
    }
  };
  
  const marcarTodasComoLidas = async () => {
    if (!token) return;
  
    try {
      await backendApi.patch(`/notificacoes/marcar-todas-como-lida`, null, {
        params: { perfilId: user?.perfil?.id },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
    } catch (error) {
      console.error("Erro ao marcar todas como lidas:", error.response?.data || error.message);
    }
  };

  const marcarComoLida = async (id) => {
    if (!token) return;

    try {
      await backendApi.patch(`/notificacoes/${id}/marcar-como-lida`, null, {
        params: { perfilId: user?.perfil?.id },
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotificacoes((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)));
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const limparNotificacoesLidas = async () => {
    if (!token) return;
  
    try {
      await backendApi.delete(`/notificacoes/deletar-todas`, {
        params: { perfilId: user?.perfil?.id },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setNotificacoes((prev) => prev.filter((n) => !n.lida)); // Remove as notificações lidas da lista
    } catch (error) {
      console.error("Erro ao limpar notificações lidas:", error.response?.data || error.message);
    }
  };
  
  const notificationSettings = JSON.parse(localStorage.getItem("notificationSettings")) || {
    curtida: true,
    seguidor: true,
    resposta: true,
  };
  
  // Mapeando as abas disponíveis com base nas preferências do usuário
  const allTabs = [
    { label: "Todos", key: "Todos", enabled: true },
    { label: "curtida", key: "curtida", enabled: notificationSettings.curtida },
    { label: "seguidor", key: "seguidor", enabled: notificationSettings.seguidor },
    { label: "resposta", key: "resposta", enabled: notificationSettings.resposta },
  ];
  
  // Filtra apenas as abas ativas
  const tabs = allTabs.filter(tab => tab.enabled).map(tab => tab.label);
  
  const notificacoesFiltradas = notificacoes.filter((notificacao) => {
    if (activeTab === "Todos") return true;
    return notificacao.tipo === activeTab; // Ajuste conforme a estrutura das notificações
  });
  
  return (
    <div className="container-notificacao">
      <div className="header">
        <h2>Notificações</h2>
        <button className="marcarLidas" onClick={marcarTodasComoLidas}>
          Marcar todas como lidas
        </button>
      </div>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {notificacoesFiltradas.map((notificacao) => (
          <div key={notificacao.id} className="item" onClick={() => marcarComoLida(notificacao.id)}>
            <div className="imgPlaceholder"></div>
            <div className="configurar-conteudo">
              <p className="paragrafo-limitado">
               {notificacao.mensagem}
              </p>
              {notificacao.descricao && <p className="paragrafo-limitado">{notificacao.descricao}</p>}
              <span className="data">{notificacao.data}</span>
            </div>
            {notificacao.lida === false && (
              <div className="status" ></div>
            )}
          </div>
        ))}
      </div>
      <div>
        <button className="limparNotificacoes" onClick={limparNotificacoesLidas}>
          Limpar notificações lidas
        </button>
      </div>

      <div className="configurar">
        <a onClick={() => navigate('/configuracao')}>Configurar notificações</a>
      </div>
    </div>
  );
};

export default Notificacoes;
