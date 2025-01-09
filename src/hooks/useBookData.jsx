import { useState, useEffect } from "react";

export default function useBookData(id) {
    const [info, setInfo] = useState(
        {
        coverURL: `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1`,
        title: "", 
        authors: ["Desconhecido"], 
        averageRating: 0, 
        ratingsCount: 0, 
        description: "",
        }
    );
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(id));
        // Verifica se os dados estão no LocalStorage
        if (data) {
            setInfo(data);
            setLoading(false);
        } else {
            fetch(`https://www.googleapis.com/books/v1/volumes/${id}?fields=
                volumeInfo.title,
                volumeInfo.authors,
                volumeInfo.averageRating,
                volumeInfo.ratingsCount,
                volumeInfo.description`)
                .then((response) => {
                    if (response.status >= 400) {
                        throw new Error("server error");
                    }
                    return response.json();
                })
                .then((response) => setInfo((prev) => {
                    // Salva os dados no LocalStorage
                    localStorage.setItem(id, JSON.stringify(({...prev, ...response.volumeInfo})))
                    return {...prev, ...response.volumeInfo}
                }))
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        }
    }, [id]);

    return {info, error, loading};
}