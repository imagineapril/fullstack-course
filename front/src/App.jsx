import { useState } from 'react'
import './App.css'
import Card from './components/Card/Card'
import Modal from './components/Modal/Modal'
import Header from './layouts/Header/Header'
import { LoaderWrapper } from './components/Loader/loader.styled'
import Loader from './components/Loader/Loader'
import Footer from './layouts/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router'
import Registration from './pages/Registration/Registration'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Basket from './pages/Basket/Basket'
import Product from './pages/Product/Product'
import Order from './pages/Order/Order'
import MyOrders from './pages/MyOrders/MyOrders'
import Notification from './Notification/Notification'
import { Layout } from './layouts/layout'
import { AuthContextProvider } from './context/authContext'
import { CheckAuth } from './HOC/CheckAuth'
import { Pagination } from './components/Pagination/Pagination'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<CheckAuth><Main /></CheckAuth>}/>
                <Route path="/basket" element={<CheckAuth><Basket /></CheckAuth>}/>
                <Route path="/products/:id" element={<CheckAuth><Product /></CheckAuth>}/>
                <Route path="/make-orders" element={<CheckAuth><Order /></CheckAuth>}/>
                <Route path="/my-orders" element={<CheckAuth><MyOrders /></CheckAuth>}/>
              </Route>
              <Route path="/login" element={<Login />}/>
              <Route path="/registration" element={<Registration />}/>
            </Routes>
            </AuthContextProvider>
        </BrowserRouter>
        <Notification />
    </Provider>
  );
}

export default App
