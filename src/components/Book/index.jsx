import PropTypes from 'prop-types'
import style from './Book.module.css'
import useBook from '../../hooks/useBook'
import { Star } from 'lucide-react';

export default function Book({ id, innerRef }) {
	const { data, loading, error } = useBook(id);

	if (loading) return <p>Carregando...</p>;
	if (error) return <p>A network error was encountered</p>;
	if (!data.averageRating) data.averageRating = 0;

	return (
		<div
		    ref={innerRef}
			className={style.book}
		>
			<img
				className={style.cover}
				src={data.imageLinks ? data.imageLinks.thumbnail.slice(0, data.imageLinks.thumbnail.indexOf("&edge")) : ""}
				alt={`Capa do livro ${data.title}`}
			/>
			<div className={style.info}>
				<span className={style.title}>
					{data.title}
				</span>
				<span className={style.authors}>
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