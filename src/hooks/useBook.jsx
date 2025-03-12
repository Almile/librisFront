import { useState, useEffect } from "react";
import { getBook } from "../services/googleBooksService";
import {addLivro, getLivro} from "../services/librisApiService"

export default function useBook(id) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let book = JSON.parse(localStorage.getItem(id));
            if (book) {
                setLoading(false);
            } else {
                try {
                    const response = await getBook(id);
                    book = {...response.data.volumeInfo, ...response.data.saleInfo, id};
                    localStorage.setItem(id, JSON.stringify(book));
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
            setData(book);
            try {
                await getLivro(id);
            } catch {
                try {
                    const response = await addLivro(book);
                    console.log(response);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        fetchData();
    }, [id]);

    return {data, error, loading};
}