import { useEffect, useState } from "react";
import { FormContainer } from "./regForm.styled";
import { Link } from 'react-router';
import showNotification from "../../Notification/notification-emmiter";
import { registration } from "../../api/auth";

function RegForm() {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmedPassword: '',
    isSubscriptionAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmedPassword: '',
    isSubscriptionAccepted: '',
  });

  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false,
    confirmedPassword: false,
    isSubscriptionAccepted: false,
  })

  const emailChangeHandler = (event) =>  {
    const currentEmailValue = event.target.value;
    setFormValues((prevValues) =>  ({...prevValues, email: currentEmailValue}));
    setFormTouched((prevValues) =>  ({...prevValues, email: true}));
  }

  const passwordChangeHandler = (event) =>  {
    const currentPasswordValue = event.target.value;
    setFormValues((prevValues) =>  ({...prevValues, password: currentPasswordValue}));
    setFormTouched((prevValues) =>  ({...prevValues, password: true}));
  }

  const confirmedPasswordChangeHandler = (event) =>  {
    const currentConfirmedPasswordValue = event.target.value;
    setFormValues((prevValues) =>  ({...prevValues, confirmedPassword: currentConfirmedPasswordValue}));
    setFormTouched((prevValues) =>  ({...prevValues, confirmedPassword: true}));
  }

  const subscriptionChangeHandler = (event) =>  {
    const isSubscriptionAcceptedChecked = event.target.checked;
    setFormValues((prevValues) =>  ({...prevValues, isSubscriptionAccepted: isSubscriptionAcceptedChecked}));
    setFormTouched((prevValues) =>  ({...prevValues, isSubscriptionAccepted: true}));
  }

  const formSubmitHandler = (event) =>  {
    event.preventDefault();
    registration(formValues.email, formValues.password)
    .then((response) =>  {
      console.log(response)
    })
    .catch((error) =>  {
      showNotification(error, 'error');
    });
  }

  useEffect(() => {
    let isFormTouched = false;
    const formTouchedValues = Object.values(formTouched);
    for (let i = 0; i < formTouchedValues.length; i++)  {
      if (formTouchedValues[i] === true)  {
        isFormTouched = true;
        break;
      }
    }

    if(isFormTouched)  {
      const emailRegexp = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)/, 'gi');
      if (!emailRegexp.test(formValues.email))  {
        setFormErrors((prevErrors) =>  ({...prevErrors, email: 'Некорректный e-mail'}))
      }  else  {
        setFormErrors((prevErrors) =>  ({...prevErrors, email: ''}))
      }

      if(formValues.password.length < 6)  {
        setFormErrors((prevErrors) =>  ({...prevErrors, password: 'Пароль должен содержать не менее 6-и символов'}))
      }  else  {
        setFormErrors((prevErrors) =>  ({...prevErrors, password: ''}))
      }

      if (formValues.confirmedPassword !== formValues.password)  {
        setFormErrors((prevErrors) =>  ({...prevErrors, confirmedPassword: 'Пароли должны совпадать'}))
      }  else  {
        setFormErrors((prevErrors) =>  ({...prevErrors, confirmedPassword: ''}))
      }

      if(formValues.isSubscriptionAccepted === false)  {
        setFormErrors((prevErrors) =>  ({...prevErrors, isSubscriptionAccepted: 'Необходимо подписаться на обновления'}));
        return;
      } else if ((formErrors.email.length > 0) || (formErrors.password.length > 0) || (formErrors.confirmedPassword.length > 0))  {
        return;
      }  else  {
        setFormErrors((prevErrors) =>  ({...prevErrors, isSubscriptionAccepted: ''}));
      }
    }
  },[formValues])

  return (
    <FormContainer>
      <form>
        <Link to="/login" className="auth__link">Авторизоваться</Link>
        <fieldset>
          <legend>РЕГИСТРАЦИЯ</legend>
          <div>
            <input type="text"
            placeholder="Email"
            value={formValues.email}
            onChange={emailChangeHandler}></input>
            <p className="text-error">{formErrors.email}</p>
          </div>
          <div>
            <input type="password"
            placeholder="Пароль"
            value={formValues.password}
            onChange={passwordChangeHandler}></input>
            <p className="text-error">{formErrors.password}</p>
          </div>
          <div>
            <input type="password"
            placeholder="Повторите пароль"
            value={formValues.confirmedPassword}
            onChange={confirmedPasswordChangeHandler}></input>
            <p className="text-error">{formErrors.confirmedPassword}</p>
          </div>
          <div>
            <input type="checkbox"
            checked={formValues.isSubscriptionAccepted}
            onChange={subscriptionChangeHandler}></input>
            Я согласен получать обновления на почту
            <p className="text-error">{formErrors.isSubscriptionAccepted}</p>
          </div>
          <button onClick={formSubmitHandler}>Зарегистрироваться</button>
        </fieldset>
      </form>
    </FormContainer>
  )
}

export default RegForm;