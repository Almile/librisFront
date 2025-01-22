import { useCallback, useEffect, useRef, useState } from "react";
import { searchBooks } from "../services/googleBooksService";

export default function useSearchBooks(q) {
    const [books, setBooks] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOver, setIsOver] = useState(false);
    const observer = useRef();

    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting)
                setIndex(prev => prev + 12);
        })

        if (node) setTimeout(() => observer.current.observe(node), 1000);
    }, [loading])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await searchBooks(q, index);
                if (!Object.keys(response).length) return setIsOver(true)
                const ids = Object.values(response.data.items).map((item) => item.id);
                setBooks(prev => [...prev, ...ids]);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, [q, index])

    return {books, loading, error, isOver, lastElementRef}
}