import { useDispatch, useSelector } from 'react-redux';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { Outlet, useLocation } from 'react-router';
import { getUserId } from '../store/userSlice';
import { getIsCartLoading, setCart } from '../store/cartSlice';
import { useEffect } from 'react';
import { getCart } from '../api/cart';

export const Layout = () =>  {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = useSelector(getUserId);
  const isLoading = useSelector(getIsCartLoading);

  useEffect(() => {
    if (id) {
      getCart(id)
      .then((response) => {
        dispatch(setCart(response.data));
      })
    }

  },[id, dispatch])
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};