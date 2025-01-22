import googleBooksApi from "./googleBooksApi";

export const getBook = (id) => {
    const fields = [
        "volumeInfo.title",
        "volumeInfo.authors",
        "volumeInfo.averageRating",
        "volumeInfo.ratingsCount",
        "volumeInfo.description",
        "volumeInfo.imageLinks",
        "volumeInfo.pageCount",
        "volumeInfo.categories"
    ].join(",");

    return googleBooksApi.get(`/${id}?fields=${fields}`);
}

export const searchBooks = (q, startIndex) => {
    const fields = "items(id)";

    return googleBooksApi.get(
        `?q=${q}&fields=${fields}&maxResults=12&startIndex=${startIndex}`
    );
}