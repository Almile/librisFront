import { useState, useContext, useEffect } from "react"; // Importa hooks do React para gerenciar estados e efeitos colaterais
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import styles from "../styles/login.module.css"; // Importa estilos CSS do módulo de login
import imgLogin from "/imgLogin.jpeg"; // Importa imagem utilizada na página de login que se encontra na pasta public
import backendApi from "../services/backendApi"; // Importe a instância do Axios

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Estado para os dados do formulário de cadastro
  const [loginData, setLoginData] = useState({
    emailLogin: "",
    passwordLogin: "",
  });
  const [cadastroData, setCadastroData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  // Estado para mensagens de erro/sucesso
  const [cadastroError, setCadastroError] = useState("");
  const [cadastroSuccess, setCadastroSuccess] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  // Função para atualizar os dados do formulário de cadastro
  const handleCadastroChange = (e) => {
    const { id, value } = e.target;
    setCadastroData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();

    if (cadastroData.password !== cadastroData.confirmPassword) {
        setCadastroError("As senhas não coincidem.");
        return;
    }

    try {
        const response = await backendApi.post("auth/register", {
            email: cadastroData.email,
            username: cadastroData.username,
            senha: cadastroData.password,
        });

        setCadastroSuccess("Cadastro realizado com sucesso!");
        setCadastroError("");

        setTimeout(() => {
            navigate("/login");
        }, 2000);
    } catch (err) {
        setCadastroError("Erro ao cadastrar. Tente novamente.");
    }
};

  // Função para login do usuário e redirecionamento para a página inicial caso o login seja bem-sucedido
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await backendApi.post("auth/login", {
          login: loginData.emailLogin,
          senha: loginData.passwordLogin,
        });
    
        setLoginSuccess("Login realizado com sucesso.   Redirecionando");
        setLoginError("");
        login(response.data.data.token);
        navigate("/home");
    } catch (err) {
        setLoginError("Erro ao logar. Tente novamente.");
    }
};

const loginGoogle = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};


  useEffect(() => {
    const toggleElements = document.querySelectorAll(`.${styles.toggle}`);
  
    const handleToggleClick = (event) => {
      const book = document.querySelector(`.${styles.book}`);
      const action = event.target.getAttribute("data-action");
      const pageCadastro = document.getElementById("pageCadastro");
      const pageForgot = document.getElementById("pageForgot");
  
      if (action === "signup") {
        pageForgot.style.display = "none";
        book.classList.add(styles.flipped);
        pageCadastro.style.display = "flex";
      } else if (action === "login") {
        book.classList.remove(styles.flipped);
      } else if (action === "forgot") {
        pageCadastro.style.display = "none";
        book.classList.add(styles.flipped);
        pageForgot.style.display = "flex";
      }
    };
  
    toggleElements.forEach((item) => item.addEventListener("click", handleToggleClick));
  
    return () => {
      toggleElements.forEach((item) => item.removeEventListener("click", handleToggleClick));
    };
  }, []);
  

  return (
    <div className={styles.container}>
      <div className={styles.book}>
        
        {/* Página de Cadastro */}
        <div className={styles.page}>
          <header></header>
          <div className={`${styles.page} ${styles.left} ${styles.emptyPage}`}>
            <img  src={imgLogin} alt="Imagem de Login" className={styles.imgEffect} />
          </div>

          <div className={`${styles.page} ${styles.right} ${styles.cadastro}`}>
          <form id="pageCadastro" onSubmit={handleCadastroSubmit} method="POST">
    <h1>Cadastro</h1>

    <label htmlFor="username">Nome de usuário</label>
    <input type="text" id="username" placeholder="Digite seu nome de usuário" onChange={handleCadastroChange} required />


    <label htmlFor="email">Email</label>
    <input type="email" id="email" placeholder="Digite seu email" onChange={handleCadastroChange} required />


    <label htmlFor="password">Senha</label>
    <input type="password" id="password" placeholder="Crie uma senha" onChange={handleCadastroChange} required />


    <label htmlFor="confirmPassword">Confirmar senha</label>
    <input type="password" id="confirmPassword" placeholder="Confirme sua senha" onChange={handleCadastroChange} required />


    <button type="submit" className={styles.buttonCadastro}>
      Cadastrar
    </button>

    {cadastroError && <p style={{ color: "red" }}>{cadastroError}</p>}
    {cadastroSuccess && <p style={{ color: "green" }}>{cadastroSuccess}</p>}
    
    <p className={styles.link}>
      Já tem conta?{" "}
      <span className={styles.toggle} data-action="login">
        Faça login
      </span>
    </p>
  </form>
            
            {/* Página de Recuperação de Senha */}
            <form id="pageForgot">
              <h1>Recuperação de senha</h1>
              <label htmlFor="forgot-email">Email</label>
              <input type="email" id="forgot-email" placeholder="Digite seu email" required />
              <button type="submit" className={styles.buttonForgot}>Enviar Confirmação</button>
              <p className={styles.link}>
                Já tem conta? <span className={styles.toggle} data-action="login">Faça login</span>
              </p>
            </form>
          </div>
          <footer></footer>
        </div>

        {/* Página de Login */}
        <div className={styles.page} id="pageLogin">
          <div className={`${styles.page} ${styles.right} ${styles.emptyPage}`}>
            <div className={styles.messageRegister}>
              <h1>Libris</h1>
              <h2>Encha as suas estantes com seus livros e personagens favoritos e compartilhe suas histórias</h2>
            </div>
          </div>
          <header></header>
          <div className={`${styles.page} ${styles.left}`}>
            <form method="POST" onSubmit={handleLogin}>
              <h1>Login</h1>
              <label htmlFor="emailLogin">Email</label>
              <input type="email" id="emailLogin" placeholder="Digite seu email" onChange={handleLoginChange} required />

              <label htmlFor="passwordLogin">Senha</label>
              <input type="password" id="passwordLogin" placeholder="Crie uma senha" onChange={handleLoginChange} required />

              <button className={styles.buttonLogin}>Login</button>

              <p className={styles.linkForgot}>
                Esqueceu a senha? <span className={styles.toggle} data-action="forgot">Recuperar senha</span>
              </p>
              <p className={styles.linkGoogle}>ou</p>
              
              {/* Elemento para login com o google */}

              <p className={styles.linkGoogle}>
              <p 
                className={styles.buttonGoogle}
                onClick={loginGoogle}
              >
                Login com Google
              </p>
              </p>
              {loginError && <p style={{ color: "red", textAlign:"center" }}>{loginError}</p>}
    {loginSuccess && <p style={{ color: "green" ,textAlign:"center"}}>{loginSuccess}</p>}
            </form>
            <p className={styles.link}>
              Não tem conta? <span className={styles.toggle} data-action="signup">Cadastre-se</span>
            </p>
          </div>
          <footer></footer>
        </div>
      </div>
    </div>
  );
}

export default Login;