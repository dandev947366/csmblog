import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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
  <StrictMode>
    
    <RouterProvider router={router}  />
  </StrictMode>,
)
