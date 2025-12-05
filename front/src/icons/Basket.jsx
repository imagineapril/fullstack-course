import { BasketWrapper } from "./basket.styled";
import basketPng from './basket.png';

function Basket()  {
  return <BasketWrapper>
    <img className="basket-icon" src={basketPng}></img>
  </BasketWrapper>
}

export default Basket;

