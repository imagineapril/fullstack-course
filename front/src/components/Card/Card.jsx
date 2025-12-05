import { NavLink } from 'react-router';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, getIsProductAddedToCart, decrementProductCount, incrementProductCount, getProductCartCount, setCart } from '../../store/cartSlice';
import { addProductToCartApi, getCart } from '../../api/cart';
import { getUserId } from '../../store/userSlice';

function Card(props) {
  const dispatch = useDispatch();
  const isAddedToCart = useSelector(getIsProductAddedToCart(props.id));
  const productCartCount = useSelector(getProductCartCount(props.id));
  const userId = useSelector(getUserId);

  const addProductToCartHandler = (e) =>  {
    // addProductToCartApi(userId, props.id, 1)
    //   .then(() => {
    //     return getCart(userId);
    //   })
    //   .then((response) => {
    //     dispatch(setCart(response.data));
    //   })

    e.stopPropagation();
    e.preventDefault();
    dispatch(addProductToCart(props.id));
  };

  const incrementProductCountHandler = (e) =>  {
    e.stopPropagation();
    e.preventDefault();
    dispatch(incrementProductCount(props.id));
  }

  const decrementProductCountHandler = (e) =>  {
    e.stopPropagation();
    e.preventDefault();
    dispatch(decrementProductCount(props.id));
  }

  return (
    <>
      {/* починить ссылку на src и на id товара */}
      {/* <NavLink className={styles['card']} to={`/products/${props.id}`}> */}
      <div className={styles['card']}>
        <NavLink className={styles['card__link']} to={`/products/${props.id}`}>
          <img className={styles['card__img']} src={`../assets/img/${props.image}`} />
          <h2 className={styles['card__title']}>{props.title}</h2>
          <p className={styles['card__description']}>{props.description}</p>
          <p className={styles['card__price']}>{props.price}</p>
        </NavLink>
        <div className={styles['card__actions']}>
          {!isAddedToCart && <button className={styles['card__add-btn']} onClick={addProductToCartHandler}>В корзину</button>}
          {isAddedToCart && (
            <div className={styles['card__counter']}>
              <div onClick={decrementProductCountHandler}>-</div>
              <div>{productCartCount}</div>
              <div onClick={incrementProductCountHandler}>+</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Card;