import useBookData from "../hooks/useBookData";
import StarList from "./StarList";
import style from '../styles/components/BookSlide.module.css';
import PropTypes from 'prop-types';

export default function BookSlide({id}) {
    const {info, loading, error} = useBookData(id);

    if (loading) return <div className={style.loader}></div>;
    if (error) return <p>A network error was encountered</p>;

    return (
        <div className={style.book}>
            <img className={style.cover} src={info.coverURL + "&zoom=2"} alt={`Capa do livro ${info.title}`} />
            <span className={`${style.title} ${style.truncate}`}>{info.title}</span>
            <span className={`${style.authors} ${style.truncate}`}>{info.authors.join(", ")}</span>
            <div>
                <StarList average={info.averageRating}/>
            </div>
        </div>
    );
}

BookSlide.propTypes = {
    id: PropTypes.string.isRequired
}