import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify'
import { ToastProvider } from './contexts/ToastContext' 
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
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
  <>
    
    <ToastProvider>
      <RouterProvider router={router}  />
      <ToastContainer  />
      
    </ToastProvider>
    
  </>,
)
