import googleBooksApi from "./googleBooksApi";

export const getBook = (id) => {
    const fields = [
        "volumeInfo.title",
        "volumeInfo.subtitle",
        "volumeInfo.authors",
        "volumeInfo.averageRating",
        "volumeInfo.ratingsCount",
        "volumeInfo.description",
        "volumeInfo.imageLinks",
        "volumeInfo.pageCount",
        "volumeInfo.categories",
        "volumeInfo.industryIdentifiers",
        "volumeInfo.publisher",
        "volumeInfo.publishedDate",
        "volumeInfo.maturityRating",
        "volumeInfo.language",
        "saleInfo.buyLink"
    ].join(",");

    return googleBooksApi.get(`/${id}?fields=${fields}`);
}

export const searchBooks = (q, startIndex) => {
    const fields = "items(id)";

    return googleBooksApi.get(
        `?q=${q}&fields=${fields}&maxResults=12&startIndex=${startIndex}`
    );
}