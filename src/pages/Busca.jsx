import {useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import BookItem from "../components/BookItem";
import SearchBar from "../components/SearchBar";
import style from "../styles/Catalogo.module.css";

export default function Busca() {
    const [searched, setSearched] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        function fetchBooks(index = 0) {
            fetch(`https://www.googleapis.com/books/v1/volumes?${searchParams.toString()}
            &fields=items(id)&maxResults=10&startIndex=${index}`)
            .then((response) => {
                if (response >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            }).then((response) => {
                const ids = Object.values(response.items).map((item) => item.id);
                setSearched(prev => [...prev, ...ids])
            }).catch((error) => console.error(error));
        }
        setSearched([]);
        fetchBooks();
    }, [searchParams])

    return (
        <div className={style.container}>
            <SearchBar className={`${style.box}`}/>
            <h2 className={style.box}>{searchParams.get('q')}</h2>
            <div className={`${style.recommended} ${style.box}`}>
            {searched.map((id) => <BookItem key={id} id={id} />)}
            </div>
        </div>
    );
}
