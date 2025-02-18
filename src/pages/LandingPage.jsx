import  GenreSelector  from "../../src/components/GenreSelector";
import { Link } from "react-router-dom";
import "../styles/landingpage.css"

function LandingPage() {
  const handleGenreSelection = (selectedGenres) => {
    console.log(selectedGenres)
  }
    return (
      <>
        <div className="pt1">
            <div id="sobre" className="shelf1">
                <img src="../landing/Shelf1.png" alt="Estante 1" height="800px"/>
            </div>
            <div className="description">
                <div className="logolp">
                    <img src="../landing/Logo_tema claro.png" alt="Logo Libris"/>
                </div>
                <div className="subtitulo">
                    <p><strong>Sua jornada literária começa aqui</strong></p>
                </div>
                <div className="text">
                    <p>O Libris é um projeto desenvolvido como parte da avaliação final do curso de  <strong>Desenvolvedor Fullstack Jr.</strong>, 
                    uma iniciativa da <strong>+PraTi</strong>. O objetivo desse projeto de conclusão é criar uma plataforma interativa e envolvente 
                    para leitores apaixonados, combinando funcionalidades sociais com ferramentas práticas para acompanhamento de 
                    leituras e compartilhamento de experiências literárias.</p>
                </div>
                <div className="cta">
                    <Link to="/home"><button>Acesse aqui</button></Link>
                </div>
                <div id="desenvolvedores" className="authors">
                    <div className="info">
                        <div className="picture">
                            <img src="../landing/perfil_milene.jpeg" alt="" />
                        </div>
                        <div className="name">
                            <p><strong>Milene Almeida</strong></p>
                        </div>
                        <div className="function">
                            Líder | Dev FullStack
                        </div>
                        <div className="links">
                            <div className="github">
                                <img src="" alt="" />
                            </div>
                            <div className="linkedin">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="info">
                        <div className="picture">
                            <img src="../landing/perfil_arthur.jpeg" alt="" />
                        </div>
                        <div className="name">
                            <p><strong>Arthur C. Gausmann</strong></p>
                        </div>
                        <div className="function">
                            Dev Front-end
                        </div>
                        <div className="links">
                            <div className="github">
                                <img src="" alt="" />
                            </div>
                            <div className="linkedin">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <div className="picture">
                            <img src="../landing/perfil_felipe.jpeg" alt="" />
                        </div>
                        <div className="name">
                            <p><strong>Felipe Roufman</strong></p>
                        </div>
                        <div className="function">
                            Dev Back-end
                        </div>
                        <div className="links">
                            <div className="github">
                                <img src="" alt="" />
                            </div>
                            <div className="linkedin">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <div className="picture">
                            <img src="../landing/perfil_jeferson.jpeg" alt="" />
                        </div>
                        <div className="name">
                            <p><strong>Jeferson Garreto</strong></p>
                        </div>
                        <div className="function">
                            Dev Back-end
                        </div>
                        <div className="links">
                            <div className="github">
                                <img src="" alt="" />
                            </div>
                            <div className="linkedin">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <div className="picture">
                            <img src="../landing/perfil_joao.jpg" alt="" />
                        </div>
                        <div className="name">
                            <p><strong>João H. R. Fontes</strong></p>
                        </div>
                        <div className="function">
                            Dev Back-end
                        </div>
                        <div className="links">
                            <div className="github">
                                <img src="" alt="" />
                            </div>
                            <div className="linkedin">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <div className="picture">
                            <img src="../landing/perfil_luan.jpeg" alt="" />
                        </div>
                        <div className="name">
                            <p><strong>Luan Ferreira</strong></p>
                        </div>
                        <div className="function">
                            Dev Front-end
                        </div>
                        <div className="links">
                            <div className="github">
                                <img src="" alt="" />
                            </div>
                            <div className="linkedin">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <div className="picture">
                            <img src="../landing/perfil_matheus.jpeg" alt="" />
                        </div>
                        <div className="name">
                            <p><strong>Matheus L. Carneiro</strong></p>
                        </div>
                        <div className="function">
                            Dev Back-end
                        </div>
                        <div className="links">
                            <div className="github">
                                <img src="" alt="" />
                            </div>
                            <div className="linkedin">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <div className="picture">
                            <img src="../landing/perfil_tainara.jpeg" alt="" />
                        </div>
                        <div className="name">
                            <p><strong>Tainara A. Pereira</strong></p>
                        </div>
                        <div className="function">
                            Designer
                        </div>
                        <div className="links">
                            <div className="github">
                                <img src="" alt="" />
                            </div>
                            <div className="linkedin">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shelf2">
                <img src="../landing/Shelf2.png" alt="Estante 2" height="800px"/>
            </div>

        </div>

        <div id="funcionalidades" className="pt2">
            <div className="funcionalidades">
                <h2>Funcionalidades</h2>
                <p>através de nossas reuniões e discussões decidimos implementar as seguintes funcionalidades principais no nosso projeto, buscando oferecer uma experiência completa e interativa ao usuário enquanto ele cria conexões com leitores, descobre novas leituras, expressa suas opiniões sobre diversas obras e organiza suas leituras atuais e futuras.</p>
            </div>
            <div className="grid">
                <div className="gridSup">
                    <div className="aplication">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <div className="title">
                            <h2>Recomendações personalizadas</h2>
                        </div>
                        <div className="atext">
                            <p>O usuário pode escolher seus gêneros favoritos e receber recomendações de acordo com eles.</p>
                        </div>
                    </div>
                    <div className="aplication">
                        <div className="image">
                            <img src="src/assets/chat-icon.png" alt="" />
                        </div>
                        <div className="title">
                            <h2>Interação</h2>
                        </div>
                        <div className="atext">
                            <p>Por meio do fórum e comentários, os usuários poderão interagir e debater sobre diferentes temas dos seus livros e gêneros preferidos.</p>
                        </div>
                    </div>
                    <div className="aplication">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <div className="title">
                            <h2>Avaliações</h2>
                        </div>
                        <div className="atext">
                            <p>Faça avaliações dos livros que você ja leu para ajudar outros usuários a escolher sua próxima leitura.</p>
                        </div>
                    </div>
                    <div className="aplication">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <div className="title">
                            <h2>Resenhas</h2>
                        </div>
                        <div className="atext">
                            <p>Escreva resenhas sobre seus livros favoritos, e deixe sua opinião em todas as obras.</p>
                        </div>
                    </div>
                    <div className="aplication">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <div className="title">
                            <h2>Estante</h2>
                        </div>
                        <div className="atext">
                            <p>Marque seus livros favoritos, suas próximas leituras, </p>
                        </div>
                    </div>
                    <div className="aplication">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <div className="title">
                            <h2>Perfil único</h2>
                        </div>
                        <div className="atext">
                            <p>Deixe seu perfil com a sua cara, para obter mais seguidores e interações.</p>
                        </div>
                    </div>
                    <div className="aplication">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <div className="title">
                            <h2>Acompanhe sua leitura</h2>
                        </div>
                        <div className="atext">
                            <p>Com os nosso marcadores você pode m</p>
                        </div>
                    </div>
                    <div className="aplication">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <div className="title">
                            <h2>Google Books</h2>
                        </div>
                        <div className="atext">
                            <p>Contamos com uma vasta coleção de livros, de diversoso gêneros, fornecidos pelo API Google Books.</p>
                        </div>
                    </div>
                    <div className="aplication">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <div className="title">
                            <h2>Heat map</h2>
                        </div>
                        <div className="atext">
                            <p>Confira sua frequência e intensidade de leitura no seu perfil através do heat map.</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </>
    )
}

export default LandingPage
