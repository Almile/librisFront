import BookItem from "../components/BookItem";
import SearchBar from "../components/SearchBar";
import style from "../styles/Catalogo.module.css";

export default function Catalogo() {
  const recommended = [
    "GjgQCwAAQBAJ", 
    "hjcQCwAAQBAJ", 
    "-DgQCwAAQBAJ", 
    "qDYQCwAAQBAJ", 
    "9TcQCwAAQBAJ", 
    "yjUQCwAAQBAJ"
  ];

  return (
    <div className={style.container}>
      <SearchBar className={`${style.box}`}/>
      <h2 className={style.box}>Recomendados</h2>
      <div className={`${style.recommended} ${style.box}`}>
        {recommended.map((id) => <BookItem key={id} id={id} />)}
      </div>
    </div>
  );
}