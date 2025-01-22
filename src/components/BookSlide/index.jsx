import useBook from '../../hooks/useBook'
import { Star } from 'lucide-react';
import style from './BookSlide.module.css';
import PropTypes from 'prop-types';

export default function BookSlide({id}) {
	const {data, loading, error} = useBook(id);

	if (loading) return <p>Carregando...</p>
	if (error) return <p>A network error was encountered</p>;
	if (!data.averageRating) data.averageRating = 0;

	return (
		<div className={style.book}>
			<img 
				className={style.cover}
				src={data.imageLinks ? data.imageLinks.thumbnail.slice(0, data.imageLinks.thumbnail.indexOf("&edge")): ""}
				alt={`Capa do livro ${data.title}`}
			/>
			<span className={style.title}>
				{data.title}
			</span>
			<span className={style.authors}>
				{data.authors ? data.authors.join(", ") : "Desconhecido"}
			</span>
			<span>
				{
					Array.from({length: Math.ceil(data.averageRating)})
					.map((i, index) => <Star size={16} stroke="null" key={index} fill='var(--destaque)' />)
				}
				{
					Array.from({length: 5 - Math.ceil(data.averageRating)})
					.map((i, index) => <Star size={16} stroke="null" key={index} fill='var(--texto-secundario)' />)
				}
			</span>
		</div>
	);
}

BookSlide.propTypes = {
	id: PropTypes.string.isRequired
}