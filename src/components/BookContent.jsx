import useBook from '../hooks/useBook'
import React from "react";
import { StarRating } from "./StarRating";

export default function BookContent({id}) {
    const {data, error, loading} = useBook(id);

	if (loading) return <p>Carregando...</p>;
	if (error) return <p>A network error was encountered</p>;

    return (
        <h1>{data.title}</h1>
        
    );
}

