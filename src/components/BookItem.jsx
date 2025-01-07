import PropTypes from 'prop-types';
import style from '../styles/components/BookItem.module.css';
import useBookData from '../hooks/useBookData';

export default function BookItem({id}) {
  const {info, loading, error} = useBookData(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  const coverURL = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1`;
  return (
    <div className={style.book}>
      <img className={style.cover} src={coverURL} alt={`Capa do livro ${info.title}`} />
      <div className={style.info}>
        <span className={`${style.title} ${style.truncate}`}>
          {info.title}
        </span>
        <span className={`${style.authors} ${style.truncate}`}>
          Por {info.authors.join(", ")}
        </span>
        <div>
          <StarList average={info.averageRating} />
          <span className={style.rating}>
            {info.ratingsCount} avaliações
          </span>
        </div>
        <span className={`${style.description} ${style.truncate}`}>
          {info.description.replace(/<[^>]*>/g, " ")}
        </span>
      </div>
    </div>
  );
}

BookItem.propTypes = {
  id: PropTypes.string,
};

function StarList({average}) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= average)
      stars.push(<StarIcon key={i} color={"#009C9D"}/>);
    else
      stars.push(<StarIcon key={i} />);
  }
  return (stars);
}

function StarIcon({width = 16, height = 16, color = "#DEDEDE"}) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
        </svg>
    );
}

StarIcon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
};