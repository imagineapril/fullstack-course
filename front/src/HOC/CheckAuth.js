import { useEffect } from "react";
import { useAuthContext } from "../context/authContext"
import { Navigate, useNavigate } from 'react-router'

export const CheckAuth = (props) =>  {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const token = authContext.token;

  if (token)  {
    return props.children;
  }

  useEffect(() =>  {
    navigate('/login');
  }, []);

  return null;
}