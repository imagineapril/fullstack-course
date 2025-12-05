import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersListSelector, getOrdersRequest } from "../../store/ordersSlice";
import { getUserId } from "../../store/userSlice";
import { DataGrid } from "@mui/x-data-grid";

function MyOrders() {
  const dispatch = useDispatch();
  const list = useSelector(getOrdersListSelector);
  const userId = useSelector(getUserId);

    useEffect(() => {
    userId && dispatch(getOrdersRequest(userId))
  }, [userId]);

  const columns = [
    { field: 'id', headerName: 'Идентификатор заказа'},
    { field: 'phoneNumber', headerName: 'Номер телефона'},
    { field: 'address', headerName: 'Адрес'},
    {
      field: 'created',
      headerName: 'Создан',
      valueGetter: (value) => {
        const date = new Date(value);
        return date.toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' })
      },
    },
  ];

  return (
    <div>
    {list.length > 0 && (
      <DataGrid rows={list} columns={columns}></DataGrid>
    )}
    </div>
  );
};

export default MyOrders;

