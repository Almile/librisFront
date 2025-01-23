import PropTypes from 'prop-types';
import style from '../styles/components/BookItem.module.css';
import useBookData from '../hooks/useBookData';
import StarList from './StarList';
import { Link, useNavigate } from 'react-router-dom';

export default function BookItem({id, innerRef}) {
  const {info, loading, error} = useBookData(id);

  const navigate = useNavigate();
  
  function handleLivro() {
    navigate("/livro");
  };

  if (loading) return <div className={style.loader}></div>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div className={style.book} ref={innerRef}>
      <img className={style.cover} src={info.coverURL + "&zoom=1"} alt={`Capa do livro ${info.title}`} />
      <div className={style.info}>
        <span onClick={handleLivro} className={`${style.title} ${style.truncate}`}>
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
  id: PropTypes.string.isRequired,
  innerRef: PropTypes.func
};