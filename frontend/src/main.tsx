import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify'
import { ToastProvider } from './contexts/ToastContext' 
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { store } from "./redux/store"
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { setToast } from "./redux/slice/toastSlice"
import { useDispatch } from "react-redux"
const router = createBrowserRouter([
  {
    path: "/admin",
     element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    
    <ToastProvider>
      <RouterProvider router={router}  />
      <ToastContainer  />
      
    </ToastProvider>
    
  </Provider>,
)
