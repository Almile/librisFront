import { useState, useEffect } from "react";
import { getBook } from "../services/googleBooksService";

export default function useBook(id) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBook(id);
                const info = {...response.data.volumeInfo, ...response.data.saleInfo};
                setData(info);
                localStorage.setItem(id, JSON.stringify(info));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        const book = JSON.parse(localStorage.getItem(id));
        if (book) {
            setData(book);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [id]);

    return {data, error, loading};
}