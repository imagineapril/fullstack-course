import { useEffect, useState } from "react";
import { LoginFormContainer } from "./loginForm.styled";
import { Link } from 'react-router';
import { login } from "../../api/auth";
import showNotification from "../../Notification/notification-emmiter";
import { useAuthContext } from "../../context/authContext";

function LoginForm() {

  const authContext = useAuthContext();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const emailChangeHandler = (event) =>  {
    const currentEmailValue = event.target.value;
    setFormValues((prevValues) =>  ({...prevValues, email: currentEmailValue}));
  }

  const passwordChangeHandler = (event) =>  {
    const currentPasswordValue = event.target.value;
    setFormValues((prevValues) =>  ({...prevValues, password: currentPasswordValue}));
  }

  const formSubmitHandler = (event) =>  {
    event.preventDefault();
    login(formValues.email, formValues.password)
      .then((response) => {
        const token = response.data.token;
        authContext.logIn(token);
      })
      .catch((error) => {
        showNotification(error.response.data.message, 'error')
      })
  }

  return (
    <LoginFormContainer>
      <form>
        <Link to="/registration" className="auth__link">Зарегистрироваться</Link>
        <fieldset>
          <legend>ВХОД</legend>
          <div>
            <input type="text"
            placeholder="Email"
            value={formValues.email}
            onChange={emailChangeHandler}></input>
          </div>
          <div>
            <input type="password"
            placeholder="Пароль"
            value={formValues.password}
            onChange={passwordChangeHandler}></input>
          </div>
          <button onClick={formSubmitHandler}>Войти</button>
        </fieldset>
      </form>
    </LoginFormContainer>
  )
}

export default LoginForm;