import librisApi from "./backendApi";
import { format } from "date-fns";

// Livros
export const getLivro = (googleId) => {
    return librisApi.get(
        `/livro/google/${googleId}`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
}

export const addLivro = (book) => {
    const body = {
        "googleId": book.id, 
        "titulo": book.title,
        "subtitulo": book.subtitle,
        "autores": JSON.stringify(book.authors),
        "editora": book.publisher,
        "sinopse": book.description,
        "numeroPaginas": book.pageCount,
        "isbn": book.industryIdentifiers?.[0]?.identifier || null,
        "idioma": book.language || null,
        "categoria": book.categories ? JSON.stringify(book.categories) : null,
        "urlCapa": `https://books.google.com/books/publisher/content?id=${book.id}&printsec=frontcover&img=1&zoom=1`,
        "linkCompra": book.buyLink || null,
        "dataPublicacao": format(new Date(book.publishedDate), "yyyy-MM-dd") || null,
        "faixaEtaria": book.maturityRating || null
    }

    return librisApi.post("/livro",
        {...body},
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
}

// Leitura
export const addLeitura = (body) => {
    return librisApi.post("/status",
        body,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
};

export const getLeituraByUser = (username) => {
    return librisApi.get(
        `/status/perfil/${username}?size=1000`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
};

export const getLeituraByUserAndGoogleId = (username, googleId) => {
    return librisApi.get(
        `/status/perfil/${username}/livro/${googleId}`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
}

export const updateLeitura = (id, body) => {
    return librisApi.put(
        `/status/${id}`,
        body,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
}

// Favoritos
export const getFavoritosByPerfil = (id) => {
    return librisApi.get(
        `/favoritos/perfil/${id}?size=1000`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
}

export const getFavorito = (username, id) => {
    return librisApi.get(
        `/favoritos/filtrar?googleId=${id}&username=${username}`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }}
    );
}

export const removeFavorito = (id) => {
    return librisApi.delete(
        `/favoritos/${id}`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
}

export const favoritar = (perfilId, googleId) => {
    return librisApi.post(
        `/favoritos`,
        {perfilId, googleId},
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
}

// Perfil

export const getPerfilById = (id) => {
    return librisApi.get(
        `/perfil/${id}`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }});
}