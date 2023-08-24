import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Login from './pages/Login.jsx'
import Newproduct from './pages/Newproduct.jsx'
import Signup from './pages/Signup.jsx'
import { store } from './redux/index.jsx';
import {Provider} from "react-redux"
import Cart from './pages/Cart.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path='menu' element={<Menu />} /> */}
      <Route path='menu/:filterby' element={<Menu />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact/>}/>
      <Route path='login' element={<Login />} />
      <Route path='newproduct' element={<Newproduct/>}/>
      <Route path='signup' element={<Signup />} />
      <Route path='cart' element={<Cart />} />
      <Route path='success' element={<Success />} />
      <Route path='cancel' element={<Cancel/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
   
  </React.StrictMode>,
)
