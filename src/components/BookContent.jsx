import { StarRating } from "./StarRating";
import PropTypes from 'prop-types';
import "../styles/bookcontent.css"
import useBook from '../hooks/useBook'

export default function BookContent({id}) {    
    const {data, error, loading} = useBook(id);

	if (loading) return <p>Carregando...</p>;
	if (error) return <p>A network error was encountered</p>;
    console.log(data);
    
    return(
        <div className="pl-grid">
            <div className="pl-capa">
                <img src={`https://books.google.com/books/publisher/content?id=${data.id}&printsec=frontcover&img=1`} alt={`Capa do livro ${data.title}`}/>
            </div>
            <div className="pl-descriptionLivro">
                <p className="pl-titulo"><strong>{data.title}</strong></p>
                <p className="pl-autor">{data.authors ? data.authors.join(", ") : "Desconhecido"}</p>
                <div className="pl-rating">
                    <div className="rating">
                        <StarRating rating={data.averageRating || 0}/>
                    </div>
                </div>
                <div className="pl-genres">
                    {data.categories[0].split('/').map((c, i) => <button key={i}>{c}</button>)}
                </div>
                <p className="pl-sinopse">{data.description ? data.description.replace(/<[^>]*>/g, " ") : ""}</p>
                <div className="pl-buttons">
                    <button className="pl-buttonAddEstante">Adicionar à estante</button>
                    <button className="pl-buttonFavoritar">Favoritar</button>
                </div>
                <div className="pl-styleLinha" />
                <div className="pl-infoGrid">
                    <div className="pl-infoItem">
                        <p className="pl-infoCat">ISBN:</p><p className="pl-infoInfo">{data.industryIdentifiers[0].identifier}</p>
                    </div>
                    <div className="pl-infoItem">
                        <p className="pl-infoCat">Data de publicação: </p><p className="pl-infoInfo">{data.publishedDate}</p>
                    </div>
                    <div className="pl-infoItem">
                        <p className="pl-infoCat">Idioma:</p><p className="pl-infoInfo">{data.language}</p>
                    </div>
                    <div className="pl-infoItem">
                        <p className="pl-infoCat">Editora:</p><p className="pl-infoInfo">{data.publisher}</p>
                    </div>
                    <div className="pl-infoItem">
                        <p className="pl-infoCat">Páginas:</p><p className="pl-infoInfo">{data.pageCount}</p>
                    </div>
                    <div className="pl-infoItem">
                        <p className="pl-infoCat">Faixa etária:</p><p className="pl-infoInfo">{data.maturityRating}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

BookContent.propTypes = {
    id: PropTypes.string.isRequired,
}