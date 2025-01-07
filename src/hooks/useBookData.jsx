import { useState, useEffect } from "react";

export default function useBookData(id) {
    const [info, setInfo] = useState(
        {title: "", 
        authors: ["Desconhecido"], 
        rating: 0, 
        ratingsCount:0, 
        description: ""}
    );
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        .then((response) => setInfo((prev) => {return {...prev, ...response.volumeInfo}}))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, [id]);

    return {info, error, loading};
}