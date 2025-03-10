import SearchBar from "../../components/SearchBar"
import style from "./Catalogo.module.css"
import { useSearchParams } from "react-router"
import BookSwiper from "../../components/BookSwiper";
import Book from "../../components/Book";
import OutlinedButton from "../../components/OutlinedButton"
import useSearchBooks from "../../hooks/useSearchBooks"
import PropTypes from "prop-types";
import { X } from 'lucide-react';
import { useEffect, useState, useContext } from "react";
import useAuth from "../../context/AuthContext";
import { getPerfilById } from "../../services/librisApiService"; 

export default function Catalogo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [recommended, setRecommended] = useState([]);
    const {user} = useContext(useAuth);

    useEffect(() => {

        async function searchRecommendedBooks() {
            const genreMap = {
                "INFANTIS": ["hQZZEAAAQBAJ", "ziTpEAAAQBAJ", "RxG6DAAAQBAJ", "ilbzDwAAQBAJ", "BKk-DwAAQBAJ", "4m7pDwAAQBAJ"],
                "MISTERIO": ["A1QzEAAAQBAJ", "jR0zAAAAQBAJ", "gV1nhvItuoAC", "rt1ECgAAQBAJ", "bDrGwTC61b4C", "yFp0CgAAQBAJ"],
                "FANTASIA": ["o39zEAAAQBAJ", "_J4qAwAAQBAJ", "GjgQCwAAQBAJ", "7-9zwIWkAlEC", "DLKMDwAAQBAJ", "uH_iDwAAQBAJ"],
                "FICCAO_CIENTIFICA": ["-8-uCgAAQBAJ", "x8quCgAAQBAJ", "C8muCgAAQBAJ", "Uvr2DAAAQBAJ", "KnamBAAAQBAJ", "ZONaDwAAQBAJ"],
                "FICCAO": ["5VD2SwmX7dAC", "rHl94L7sjCEC", "pfctDwAAQBAJ", "-_MMbijUmTEC", "LpdU3stJjoIC", "TJk4DwAAQBAJ"],
                "NAO_FICCAO": ["LbuZEAAAQBAJ", "BcOnBAAAQBAJ", "xUvSEAAAQBAJ", "sXDTDwAAQBAJ", "NZZWEAAAQBAJ", "igDQDwAAQBAJ"],
                "CIENCIA": ["9nzoDwAAQBAJ", "NXxVCwAAQBAJ", "QbqOF6GTrxMC", "1ns2DwAAQBAJ", "ixLUDwAAQBAJ", "FrcPBgAAQBAJ"],
                "AUTOAJUDA": ["HNWsEAAAQBAJ", "aizjDQAAQBAJ", "OpE4DwAAQBAJ", "95TlM8WBXwIC", "Zxc4DwAAQBAJ", "lIK4AwAAQBAJ"],
                "TECNOLOGIA": ["_i6bDeoCQzsC", "n46KDwAAQBAJ", "t5RODwAAQBAJ", "hiRjDAAAQBAJ", "zVclEAAAQBAJ", "58fcDwAAQBAJ"],
                "BIOGRAFIA": ["YiqnEAAAQBAJ", "QaGeDwAAQBAJ", "03iFCgAAQBAJ", "tXAfEAAAQBAJ", "StszDwAAQBAJ", "YnQuvvgpDAsC"],
                "ROMANCE": ["9NZBCwAAQBAJ", "S232DwAAQBAJ", "fyTdEAAAQBAJ", "ChZXdaeMOgAC", "qLptEAAAQBAJ", "ud06EAAAQBAJ"],
                "SAUDE_E_HABITOS": ["qI6iDwAAQBAJ", "k0j8IgiMKoMC", "WjAnEAAAQBAJ", "zhrHDwAAQBAJ", "wGtvEAAAQBAJ", "Vf4KEAAAQBAJ"],
              };

            let genres = ["FANTASIA"];

            try {
                const response = await getPerfilById(user?.perfil?.id);
                genres = response.data.data.generosFavoritos;
                console.log(genres)
            } catch(error) {
                console.error(error);
            }
            
            const size = 6 / genres.length;
            let books = [];

            for (let g of genres) {
                books = [...books, ...genreMap[g].slice(0, size)]
            }
            setRecommended(books);
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
                <BookGrid 
                    title={"Recomendados"}
                    books={recommended}
                />
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