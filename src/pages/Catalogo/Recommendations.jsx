import style from "./Catalogo.module.css"
import Book from "../../components/Book";

export default function Recommendations() {

    const recommended = [
        "GjgQCwAAQBAJ", 
        "hjcQCwAAQBAJ", 
        "-DgQCwAAQBAJ", 
        "qDYQCwAAQBAJ", 
        "9TcQCwAAQBAJ", 
        "yjUQCwAAQBAJ",
      ];

    return (
        <>
            <h2>Recomendações</h2>
            <div className= {style.books}>
                {recommended.map((id) => 
                    <Book key={id} id={id}/>
                )}
            </div>
        </>
    );
}