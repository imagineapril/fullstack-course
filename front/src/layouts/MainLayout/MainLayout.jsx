import Card from "../../components/Card/Card";
import { getProducts } from "../../api/products";
import { useEffect, useState } from "react";
import showNotification from "../../Notification/notification-emmiter";
import { Pagination } from "../../components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router";
import { parseSearch } from "../../utils/parseSearch";
import { stringifySearch } from "../../utils/stringifySearch";
import styles from './style.module.css'
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setIsProductsLoading, setProductsTotal, getProductsList, getProductsTotal, getIsProductsLoading } from "../../store/productsSlice";


function MainLayout() {

  const dispatch = useDispatch();
  const total = useSelector(getProductsTotal);
  const products = useSelector(getProductsList);
  const isLoading = useSelector(getIsProductsLoading);

  const { search } = useLocation();
  const parsedSearch = parseSearch(search);

  const [productTitle, setProductTitle] = useState(decodeURIComponent(parsedSearch?.goodTitle || ''));

  const navigate = useNavigate();

  const changeProductTitleHandler = (event) =>  {
    const productTitle = event.target.value;
    const rawSearch = {...parsedSearch};

    if (productTitle)  {
      rawSearch.page = 1;
    }

    rawSearch.goodTitle = productTitle;

    navigate({ search: stringifySearch(rawSearch)})
    setProductTitle(productTitle);
  }

  useEffect(() =>  {
    dispatch(setIsProductsLoading(true));

    getProducts(parsedSearch?.page, parsedSearch?.goodTitle)
      .then((response) =>  {
        const {goods, total} = response.data;
        dispatch(setProducts(goods));
        dispatch(setProductsTotal(total));
      })
      .catch((error) =>  {
        console.log(error)
      })
      .finally(() =>  {
        dispatch(setIsProductsLoading(false))
      });
  }, [search]);

  return (

    <div className={styles.mainLayout}>
      <h1>НАША ПРОДУКЦИЯ</h1>
      <input placeholder="Название товара" type="text" value={productTitle} onChange={changeProductTitleHandler}/>
      <div className={styles.cardContainer}>
        {products.map((product) =>  {
          return  (
            <Card
            id={product.id}
            // key={product.id}
            image={product.img_url}
            title={product.title}
            description={product.description}
            price={product.price}/>
          )
        })}
      </div>

      <Pagination total={total}></Pagination>
    </div>
  )
}

export default MainLayout;