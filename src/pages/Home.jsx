import React from 'react'
import Sobre from '../components/Sobre';
import Servicos from '../components/Servicos';
import Contato from '../components/Contato';
import Banner from '../components/Banner';

function Home() {
  return (

      <div>
          <section id="banner">
            <Banner />
          </section>
          
          <section id="sobre">
              <Sobre />
          </section>

          <section id="servicos">
              <Servicos />
          </section>

          <section id="contato">
              <Contato />
          </section>
      </div>
  );
}

export default Home;
