import React, { useState, useRef } from "react";
import BookSlide from "../components/BookSlide";
import style from "../styles/estanteLivros.module.css";
import { Reorder } from "framer-motion";


function EstanteLivros({ filtro = [] }) {
  const [items, setItems] = useState(filtro);
  const listRef = useRef();

  const handleReorder = (newOrder) => {
    setItems(newOrder);
  };

  const scrollLeft = () => {
    listRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    listRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className={style.carouselContainer}>
      <button className={style.scrollButton} onClick={scrollLeft}>
      <ion-icon name="chevron-back-outline"></ion-icon>
      </button>
      <Reorder.Group
        as="ul"
        axis="x"
        values={items}
        onReorder={handleReorder}
        className={style.carouselList}
        ref={listRef}
      >
        {items.map((id) => (
          <Reorder.Item
            as="li"
            key={id}
            value={id}
            className={style.carouselItem}
          >
            <BookSlide id={id} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <button className={style.scrollButton} onClick={scrollRight}>
      <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
    </div>
  );
}

export default EstanteLivros;