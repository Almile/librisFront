import SearchBar from "../../components/SearchBar"
import style from "./Catalogo.module.css"
import { useSearchParams } from "react-router"
import BookSwiper from "../../components/BookSwiper";
import Book from "../../components/Book";
import OutlinedButton from "../../components/OutlinedButton"
import useSearchBooks from "../../hooks/useSearchBooks"
import PropTypes from "prop-types";
import { X } from 'lucide-react';
import { searchBooks } from '../../services/googleBooksService';
import { useEffect, useState, useContext } from "react";
import useAuth from "../../context/AuthContext";
import { getPerfilById } from "../../services/librisApiService"; 

export default function Catalogo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(useAuth);

    useEffect(() => {

        async function searchRecommendedBooks() {
            const genreMap = {
                "INFANTIS": "O castelo animado",
                "MISTERIO": "Stephen King",
                "FANTASIA": "mistborn",
                "FICCAO_CIENTIFICA": "Eu, Robô",
                "FICCAO": "Júlio Verne",
                "NAO_FICCAO": "James Clear",
                "CIENCIA": "Carl Sagan",
                "AUTOAJUDA": "James Clear",
                "TECNOLOGIA": "Clean Code",
                "BIOGRAFIA": "Anne Frank",
                "ROMANCE": "Jane Austen",
                "SAUDE_E_HABITOS": "Hábitos Atômicos",
              };

            let genres;

            try {
                const response = await getPerfilById(user?.perfil?.id);
                genres = response.data.data.generosFavoritos;
                console.log(genres)
            } catch(error) {
                console.error(error);
            }

            const maxResults = 6 / genres.length;
            let books = [];
            for (const g of genres) {
                try {
                    const response = await searchBooks(`${encodeURIComponent(genreMap[g])}`, 0, maxResults);
                    books = [...books, ...Object.values(response.data.items).map((item) => item.id)];
                } catch (error) {
                    console.error(`Erro ao carregar gênero: ${error}`);
                }
            }
            setRecommended(books);
            setLoading(false);
        }
        if (user?.perfil?.id) searchRecommendedBooks();
    }, [user])

    return (
        <div className={style.container}>
            <SearchBar setSearchParams= {setSearchParams} placeholder={"Autor, título do livro, palavra-chave..."}/>
            {searchParams.get("q")
            ? <Search 
                key={searchParams.toString()}
                searchParams={searchParams} 
                setSearchParams={setSearchParams}/>
            : ( 
            <>
                {
                loading ?
                <div className="loader"></div>
                :
                <BookGrid 
                    title={"Recomendados"}
                    books={recommended}
                />
                }
                <BookSwiper
                    title={"Populares"} 
                    books={["m3lvDwAAQBAJ","C3wTEAAAQBAJ","gIr-DwAAQBAJ","GaZMDwAAQBAJ","PM2uCgAAQBAJ","5BclEAAAQBAJ","W_tcDwAAQBAJ"]}
                    className={style.swiper}
                />
            </>
            )}
        </div>
    );
}

 function Search({searchParams, setSearchParams}) {
    const {books, loading, error, isOver, lastElementRef} = useSearchBooks(searchParams.get("q"));

    return (
        <>
            <OutlinedButton onClick={() => setSearchParams()}>
                <h2>{searchParams.get("q").replace("+subject:", "").replace("+authors:", "")} <X size={16} color="red"/></h2>
            </OutlinedButton>
            <div className={style.grid}>
                {books.map((id, index) => 
                    <Book 
                        key={id + index}
                        id={id}
                        innerRef = {!isOver && (index == books.length - 1) ? lastElementRef: null}
                    />)
                }
            </div>
            {loading && <div className="loader"></div>}
            {error && <p>Ocorreu um erro de rede</p>}
        </>
    );
}

Search.propTypes = {
    searchParams: PropTypes.object,
    setSearchParams: PropTypes.func,
}

function BookGrid({books}) {
    return (
        <>
            <h2>Recomendações</h2>
            <div className= {style.grid}>
                {books.map((id) => 
                    <Book key={id} id={id}/>
                )}
            </div>
        </>
    );
}

BookGrid.propTypes = {
    books: PropTypes.array.isRequired,
    className: PropTypes.string,
}