import {useSearchParams } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import BookItem from "../components/BookItem";
import SearchBar from "../components/SearchBar";
import style from "../styles/Catalogo.module.css";

export default function Busca() {
    const [books, setBooks] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const observer = useRef();

    const lastBookElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect(); 

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setIndex((prevIndex) => prevIndex + 12);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading]
    );

    useEffect(() => {
        setBooks([]);
        setIndex((prev) => prev > 0 ? 0 : 1);
    }, [searchParams])

    useEffect(() => {
        function fetchBooks() {
            setLoading(true);
            fetch(`https://www.googleapis.com/books/v1/volumes?${searchParams.toString()}
            &fields=items(id)&maxResults=12&startIndex=${index}`)
            .then((response) => {
                if (response >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            }).then((response) => {
                const ids = Object.values(response.items).map((item) => item.id);
                setBooks(prev => [...prev, ...ids])
            }).catch((error) => console.error(error))
            .finally(() => setLoading(false));
        }
    
        if (!loading) {
            fetchBooks();
        }
    }, [index]);

    return (
        <div className={style.container}>
            <SearchBar className={`${style.box}`}/>
            <h2 className={style.box}>{searchParams.get('q')}</h2>
            <div className={`${style.recommended} ${style.box}`}>
            {books.map((book, index) => <BookItem innerRef={books.length == index + 1? lastBookElementRef : null} key={index} id={book} />)}
            </div>
        </div>
    );
}
