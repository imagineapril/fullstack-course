import styles from './style.module.css'
import Basket from '../../icons/Basket';
import Button from '../../ui/Button/Button';
import { Link } from 'react-router';
import { useAuthContext } from "../../context/authContext";
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartModalOpen, getCartToOrderSelector, getIsCartModalOpen } from '../../store/cartSlice';
import { CartModal } from '../../components/CartModal/CartModal';
import { useState } from 'react';

function Header() {
  const cartItems = useSelector(getCartToOrderSelector);
  const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.count), 0);
  const dispatch = useDispatch();

  const openCartModalHandler = () => {
    dispatch(setIsCartModalOpen(true));
  }

  const authContext = useAuthContext();
  const logOutHandler = (event) =>  {
    event.preventDefault();
    authContext.logOut();
  }

  return (
    <div className={styles.header}>
      <div className={styles['header__inner']}>
        <div className={styles['header__inner-products']}>
          <p onClick={openCartModalHandler}>{totalItems} товара <br />
        на сумму {totalPrice} ₽</p>
          <Link to="/basket"><Basket></Basket></Link>
          <CartModal />
          {/* <span>0</span> */}
        </div>
      {/* <Button onClick={logOutHandler} title="Выйти"></Button> */}
      <button className={styles.button} onClick={logOutHandler}>Выйти</button>
      <Link to="/my-orders"><button className={styles.button}>Мои заказы</button></Link>
      </div>
    </div>
  )
}

export default Header;