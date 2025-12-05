import { useDispatch, useSelector } from 'react-redux';
import styles from './cartModal.module.css';
import { createPortal } from 'react-dom';
import { getCartSelector, deleteProductFromCart, getIsCartModalOpen, setIsCartModalOpen } from '../../store/cartSlice';

export const CartModal = () => {

  const cartList = useSelector(getCartSelector);
  const dispatch = useDispatch();
  const isCartModalOpen = useSelector(getIsCartModalOpen);

  const modalCloseHandler = () => {
    dispatch(setIsCartModalOpen(false));
  }

  const removeProductFromCartHandler = (productId) => () => {
    dispatch(deleteProductFromCart(productId));
  }
  
  return createPortal(<div className={`${styles.cartModalContainer} ${isCartModalOpen === true && styles.isCartOpen}`}>
    <div className={styles.cardModalHeader}>
      <h2>Товары в корзине</h2>
      <div onClick={modalCloseHandler}>X</div>
    </div>
    {cartList.map((product) => {
      return <div className={styles.modal__card}key={product.id}>
        <img src={product.imgUrl} />
        <p>{product.title}</p>
        <button onClick={removeProductFromCartHandler(product.id)}>Удалить</button>
      </div>
    })}
  </div>, document.body);
}