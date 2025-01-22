import Book from "../../components/Book";
import OutlinedButton from "../../components/OutlinedButton"
import style from "./Catalogo.module.css"
import useSearchBooks from "../../hooks/useSearchBooks"
import PropTypes from "prop-types";
import { X } from 'lucide-react';

export default function Search({searchParams, setSearchParams}) {
    const {books, loading, error, isOver, lastElementRef} = useSearchBooks(searchParams.get("q"));

    return (
        <>
            <OutlinedButton onClick={() => setSearchParams()}>
                <h2>{searchParams.get("q")} <X size={16} color="red"/></h2>
            </OutlinedButton>
            <div className={style.books}>
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