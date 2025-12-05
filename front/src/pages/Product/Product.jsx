import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getProduct } from "../../api/product";
import { Link } from 'react-router';
import styles from './style.module.css';

function Product() {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct(params.id)
    .then((response) => {
      setProduct(response.data)
    })
    .catch((error) =>  {
      showNotification(error.message, 'error');
    })
  }, [params.id]);

  return (
    <>
      <Link to="/"><button className={styles.button}>Назад</button></Link>
      <div className={styles.cardWrapper} key={product.id}>
        <img src={`../assets/img/${product.img_url}`} alt={product.title} />
        <div className={styles.card__inner}>
          <h1 className={styles.card__title}>{product.title}</h1>
          <p>{product.description}</p>
          <div className={styles.card__prBtn}>
            <p className={styles.card__price}>{product.price} ₽</p>
            {/* <Button>В корзину</Button> */}
            {/* <button
              onClick={addProductToCartHandler}
              className={styles.card__btn}>В корзину
            </button> */}
            {/* <button className={styles.card__btn}>В корзину</button> */}
          </div>
        </div>
      </div>
    </>

  );
}
export default Product;