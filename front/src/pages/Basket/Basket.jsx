import styles from './style.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCartSelector, deleteProductFromCart, getCartToOrderSelector, getProductCartCount, decrementProductCount, incrementProductCount } from '../../store/cartSlice';
import DeleteBtn from '../../icons/DeleteBtn';
import { Link } from 'react-router';

function Basket() {

  const cartList = useSelector(getCartToOrderSelector);
  const dispatch = useDispatch();

  const removeProductFromCartHandler = (productId) => () => {
    dispatch(deleteProductFromCart(productId));
  };

  const incrementCountHandler = (productId) => () => {
    dispatch(incrementProductCount(productId));
  };

  const decrementCountHandler = (productId) => () => {
    dispatch(decrementProductCount(productId));
  };

  const totalPrice = cartList.reduce((acc, current) => {
    return acc + current.price * current.count;
  }, 0);

  return (
    <>
      <Link to="/"><button className={styles.button}>Назад</button></Link>
      <h1>КОРЗИНА С ВЫБРАННЫМИ ТОВАРАМИ</h1>
      <div className={styles.cardWrapper}>
          {cartList.map((product) => {
            return <div className={styles.card} key={product.id}>
              <img src={product.imgUrl} />
              <p className={styles.card__title}>{product.title}</p>
              {/* <p>{product.count}</p> */}
              <div className={styles.card__count}>
              <span
                onClick={decrementCountHandler(product.id)}
              >
                -
              </span>
              <span className={styles.quantityValue}>{product.count}</span>
              <span
                onClick={incrementCountHandler(product.id)}
              >
                +
              </span>
            </div>
              <div className={styles.card__price}>
                <p>{product.price * product.count} ₽</p>
                {/* <DeleteBtn><div onClick={removeProductFromCartHandler(product.id)}></div></DeleteBtn> */}
                <div className={styles.deleteBtn} onClick={removeProductFromCartHandler(product.id)}>X</div>
              </div>
            </div>
          })}
          <div>
            <p>ЗАКАЗ НА СУММУ: {totalPrice} ₽</p>
            <button className={styles.button}><Link to="/make-orders">Оформить заказ</Link></button>
          </div>
      </div>
    </>
  )
}

export default Basket;