import styled from 'styled-components';
import BackgroundImg from '../../assets/img/background.png'

export const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;

  .auth__link  {
    align-self: flex-end;
    font-size: 11px;
    font-family: Montserrat;
    font-weight: 300;
    line-height: 100%;
    text-decoration: underline;
    color: #D58C51;
    cursor: pointer;
  }

  form  {
    padding: 9px 20px 36px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    gap: 15px;
    color: black;
  }

  fieldset  {
    border: transparent;
  }

  legend  {
    padding: 21px;
    padding-top: 15px;
    font-family: Montserrat;
    font-weight: 700;
    font-size: 31px;
    text-align: center;
  }

  input[type="text"],
  input[type="password"] {
    width: 420px;
    padding: 10px;
    margin: 7px 0;
    border: 1px solid #D58C51;
    border-radius: 61px;
    background-color: white;
    color: black;
  }

  input[type="checkbox"]  {
    margin-top: 17px;
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }

  button {
    width: 200px;
    height: 42px;
    background: #D58C51;
    border: none;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: 400;
    font-size: 14px;
    margin-top: 40px;
  }
`