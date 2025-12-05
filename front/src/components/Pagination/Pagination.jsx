import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router";
import { parseSearch } from "../../utils/parseSearch";
import { stringifySearch } from "../../utils/stringifySearch";
// import styled from "styled-components";
import styles from './pagination.module.css'


export const Pagination = (props) =>  {
  const total = props.total;
  const { search } = useLocation();

  const [paginationItems, setPaginationItems] = useState([]);

  useEffect(() =>  {
    const totalPagesCount = Math.ceil(total / 5);
    let paginationItems = [];

    for (let i = 1; i <= totalPagesCount; i++)  {
      const parsedSearch = parseSearch(search);
      const newSearch = {...parsedSearch};
      newSearch.page = i;

      const isActive = !parsedSearch?.page ? i === 1 : Number(parsedSearch.page) === i;
      paginationItems.push(<NavLink to={stringifySearch(newSearch)} key={i} className={isActive ? styles['link_active'] : styles['link']}>{i}</NavLink>)
    }

    setPaginationItems(paginationItems);
  }, [search, total]);
  return <div className={[styles['paginationWrapper']]}>{paginationItems.map((paginationItem) =>  {
    return paginationItem;
  })}</div>
}