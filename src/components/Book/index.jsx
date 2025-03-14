import PropTypes from 'prop-types'
import style from './Book.module.css'
import useBook from '../../hooks/useBook'
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Book({ id, innerRef }) {
	const { data, loading, error } = useBook(id);
	const navigate = useNavigate();
	if (loading) return <div className="loader"></div>;
	if (error) return <p>Ocorreu um erro de rede</p>;
	if (!data.averageRating) data.averageRating = 0;

	const handleClickAuthors = async () => {
        if (data.authors) {
            const query = new URLSearchParams();
            query.set("q", `+authors:${data.authors[0].trim()}`);
            navigate(`/catalogo?${query.toString()}`);
        }
    };

	return (
		<div
		    ref={innerRef}
			className={style.book}
		>
			<img
				onClick={() => {navigate(`/livro/${id}`);}}
				className={style.cover}
				src={`https://books.google.com/books/publisher/content?id=${id}&printsec=frontcover&img=1&zoom=1`}
				alt={`Capa do livro ${data.title}`}
			/>
			<div className={style.info}>
				<span onClick={() => {navigate(`/livro/${id}`);}} className={style.title}>
					{data.title}
				</span>
				<span className={style.authors} onClick={handleClickAuthors}>
					Por {data.authors ? data.authors.join(", ") : "Desconhecido"}
				</span>
				<span>
					{
						Array.from({ length: Math.ceil(data.averageRating) })
							.map((i, index) => <Star size={16} stroke="null" key={index} fill='var(--destaque)' />)
					}
					{
						Array.from({ length: 5 - Math.ceil(data.averageRating) })
							.map((i, index) => <Star size={16} stroke="null" key={index} fill='var(--texto-secundario)' />)
					}
				</span>
				<span className={style.description}>
					{data.description ? data.description.replace(/<[^>]*>/g, " ") : ""}
				</span>
			</div>
		</div>
	);
}

Book.propTypes = {
	id: PropTypes.string.isRequired,
	innerRef: PropTypes.func,
};