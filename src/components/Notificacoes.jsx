import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/notificacoes.css";

const Notificacoes = () => {
  const navigate = useNavigate();

  const navegarParaConfiguracoes = () => {
    navigate('/configuracao');
  };

  const [activeTab, setActiveTab] = useState("Todos");
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: "comentario",
      usuario: "Nome do usuário",
      mensagem: "comentou sua publicação",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      data: "DD/MM/AAAA",
      lida: false,
    },
    {
      id: 2,
      tipo: "seguidores",
      usuario: "Nome do usuário",
      mensagem: "começou a te seguir",
      descricao: "",
      data: "DD/MM/AAAA",
      lida: false,
    },
    {
      id: 3,
      tipo: "curtida",
      usuario: "Nome do usuário",
      mensagem: "curtiu seu comentário",
      descricao: "",
      data: "DD/MM/AAAA",
      lida: true,
    },
  ]);

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map((n) => ({ ...n, lida: true })));
  };

  const notificacoesFiltradas =
    activeTab === "Todos"
      ? notificacoes
      : notificacoes.filter((n) => n.tipo === activeTab.toLowerCase());

  return (
    <div className="container-notificacao">
      <div className="header">
        <h2>Notificações</h2>
        <button className="marcarLidas" onClick={marcarTodasComoLidas}>
          Marcar todas como lidas
        </button>
      </div>
      <div className="tabs">
        {["Todos", "Menções", "Seguidores"].map((tab) => (
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
          <div key={notificacao.id} className="item">
            <div className="imgPlaceholder"></div>
            <div className="configurar-conteudo">
              <p className="paragrafo-limitado">
                <strong>{notificacao.usuario}</strong> {notificacao.mensagem}
              </p>
              {notificacao.descricao && <p className="paragrafo-limitado">{notificacao.descricao}</p>}
              <span className="data">{notificacao.data}</span>
            </div>
            {!notificacao.lida && <div className="status"></div>}
          </div>
        ))}
      </div>
      <div className="configurar">
        <a onClick={navegarParaConfiguracoes}>Configurar notificações</a>
      </div>
    </div>
  );
};

export default Notificacoes