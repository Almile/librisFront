import React from 'react';
import { useNavigate } from 'react-router-dom';

function Catalogo() {
  const navigate = useNavigate();

  const navegarParaLivro = () => {
    navigate('/livro');
  };

  return (
    <div>
      <h1>Catálogo</h1>
      <button onClick={navegarParaLivro}>Ir para Livro</button>
    </div>
  );
}

export default Catalogo;
