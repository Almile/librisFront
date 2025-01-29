import SearchBar from "../../components/SearchBar"
import style from "./Catalogo.module.css"
import { useSearchParams } from "react-router"
import BookSwiper from "../../components/BookSwiper";
import Book from "../../components/Book";
import OutlinedButton from "../../components/OutlinedButton"
import useSearchBooks from "../../hooks/useSearchBooks"
import PropTypes from "prop-types";
import { X } from 'lucide-react';

export default function Catalogo() {
    const [searchParams, setSearchParams] = useSearchParams();

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
                    books={["GjgQCwAAQBAJ", "hjcQCwAAQBAJ", "-DgQCwAAQBAJ", "qDYQCwAAQBAJ", "9TcQCwAAQBAJ", "yjUQCwAAQBAJ"]}
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
                <h2>{searchParams.get("q")} <X size={16} color="red"/></h2>
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
            {loading && <p>Carregando...</p>}
            {error && <p>A network error was encountered</p>}
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