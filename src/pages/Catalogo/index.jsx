import Search from "./Search";
import SearchBar from "../../components/SearchBar"
import Recommendations from "./Recommendations"
import Popular from "./Popular";
import style from "./Catalogo.module.css"
import { useSearchParams } from "react-router"

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
                <Recommendations />
                <Popular />
            </>
            )}
        </div>
    );
}