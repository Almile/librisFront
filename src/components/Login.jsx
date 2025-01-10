import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../styles/loginCadastro.css';
import imgLogin from '/imgLogin.jpeg';
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/homePage');
  }

  function handleLogout(){
    googleLogout()
  }

  useEffect(() => {
    document.querySelectorAll('.toggle').forEach((item) => {
      item.addEventListener('click', () => {
        const book = document.querySelector('.book');
        const action = item.getAttribute('data-action');
        const pageCadastro = document.getElementById('pageCadastro')
        const pageForgot = document.getElementById('pageForgot')


        if (action === 'signup') {
          pageForgot.style.display='none';
          book.classList.add('flipped');
          pageCadastro.style.display='flex';

        } else if (action === 'login') {
          book.classList.remove('flipped');
          
        }else if (action === 'forgot') {
          pageCadastro.style.display='none';
          book.classList.add('flipped');
          pageForgot.style.display='flex';

        }
      });
   })
    return () => {
      document.querySelectorAll('.toggle').forEach((item) => {
        item.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className='container'>
      <div className="animated-background"></div>

      <div className="book">
        <div className="page">
          <header></header>

          <div className="page left emptyPage">
            <img src={imgLogin} alt="Imagem de Login" className="imgEffect"/>
          </div>

          <div className="page right cadastro">
          <form  id="pageCadastro">
              <h1>Cadastro</h1>

              <label htmlFor="register-userName">Nome de usuário</label>
              <input
                type="text"
                id="register-userName"
                placeholder="Digite seu nome de usuário"
                required
              />

              <label htmlFor="register-email">Email</label>
              <input
                type="email"
                id="register-email"
                placeholder="Digite seu email"
                required
              />

              <label htmlFor="register-password">Senha</label>
              <input
                type="password"
                id="register-password"
                placeholder="Crie uma senha"
                required
              />

              <label htmlFor="confirm-password">Confirmar senha</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirme sua senha"
                required
              />

              <button type="submit" className="button-cadastro">Cadastrar</button>

              <p className="link">
                Já tem conta?{' '}
                <span className="toggle" data-action="login">
                  Faça login
                </span>
              </p>
            </form>


            <form id="pageForgot">
              <h1>Recuperação de senha</h1>

              <label htmlFor="forgot-email">Email</label>
              <input type="email" id="forgot-email" placeholder="Digite seu email" required />
              <button type="submit" className="button-forgot">Enviar Confirmação</button>

              <p className="link">
                Já tem conta?{' '}
                <span className="toggle" data-action="login">
                  Faça login
                </span>
              </p>
            </form>
          </div>
          <footer></footer>
        </div>


        <div className="page" id="pageLogin">
          <div className="page right emptyPage">
          <div className="messageRegister">
                <h1>Libris</h1>
                <h2>
                  Encha as suas estantes com seus livros e personagens favoritos
                  e compartilhe suas histórias
                </h2>
              </div>
          </div>

          <header></header>
          <div className="page left">
            <form>
              <h1>Login</h1>
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                placeholder="Digite seu email"
                required
              />

              <label htmlFor="login-password">Senha</label>
              <input
                type="password"
                id="login-password"
                placeholder="Digite sua senha"
                required
              />

              <p className="linkGoogle">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log("Credenciais:", credentialResponse.credential);
                  handleLogin()
                }}
                onError={() => console.log("Falha ao logar")}
                auto_select={true}
                shape="circle"
                theme="outline"
                size="large"
              />
              </p>
             
              <button onClick={handleLogin} className="button-login">Login</button>

              <p className="linkForgot">
              Esqueceu a senha?{' '}
              <span className="toggle" data-action="forgot">
                Recuperar senha
              </span>
            </p>
            </form>
            <p className="link">
              Não tem conta?{' '}
              <span className="toggle" data-action="signup">
                Cadastre-se
              </span>
            </p>
          </div>
          <footer></footer>
        </div>
      </div>
    </div>
  );
};

export default Login;