import { useSelector } from 'react-redux';
import styles from './style.module.css';
import { useContext, useState } from 'react';
import { getCartToOrderSelector } from '../../store/cartSlice';
import { DataGrid } from '@mui/x-data-grid';
import * as jose from 'jose';
import { useAuthContext } from '../../context/authContext';
import { makeOrder } from '../../api/orders';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
import { useCallback, useMemo } from 'react';
import showNotification from "../../Notification/notification-emmiter";


const tableColumns = [
  { field: 'title', headerName: 'Название', width: 200 },
  { field: 'description', headerName: 'Описание', width: 200 },
  { field: 'price', headerName: 'Цена', width: 200 },
  { field: 'count', headerName: 'Количество' },
]

function Order() {

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const basket = useSelector(getCartToOrderSelector);

  // const totalPrice = basket.reduce((acc, current) => {
  //   return acc + current.price * current.count;
  // }, 0);

  const totalPrice = useMemo(() => {
    return basket.reduce((acc, current) => {
      return acc + current.price * current.count;
    }, 0);
  }, [])

  const { token } = useAuthContext();

  const changePhone = useCallback((event) => {
    setPhone(event.target.value);
  }, []);

  const changeAddress = useCallback((event) => {
    setAddress(event.target.value);
  }, []);

  const makeOrderHandler = async () => {
    const payload = jose.decodeJwt(token);

    const goodsPayload = basket.map((product) => ({ goodId: product.id, amount: product.count }));

    const orderPayload = {
      address: address,
      phoneNumber: phone,
      goods: goodsPayload,
    };

    await makeOrder(orderPayload, payload.userId);
    showNotification('Заказ оформлен', 'success');
  }

  return (
    <div className={styles.orderWrapper}>
      <div className={styles.orderForm}>
        <div>
          <label>Телефон</label>
          <Input value={phone} onChange={changePhone}></Input>
        </div>
        <div>
          <label>Адрес</label>
          <Input value={address} onChange={changeAddress}></Input>
        </div>
      </div>
      <DataGrid columns={tableColumns} rows={basket}></DataGrid>
      <div className={styles.orderFooter}>
        <p>ЗАКАЗ НА СУММУ: {totalPrice} ₽</p>
        <button onClick={makeOrderHandler}>Оформить заказ</button>
      </div>
      
    </div>
  )
}

export default Order;