
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { store } from "./redux/store"
import { Provider } from "react-redux";
import Layout from './components/layout'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
// import { setToast } from "./redux/slice/toastSlice"
// import { useDispatch } from "react-redux"
import AuthMiddleware from './middleware/AuthMiddleware'
import NoAuthMiddleware from './middleware/NoAuthMiddleware'

import User from './pages/user/user/View'
const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <NoAuthMiddleware>
        <Login />
      </NoAuthMiddleware>
    ),
  },
  {
    path: "/",
    element: (
      <AuthMiddleware>
        <Layout />
      </AuthMiddleware>
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/user/index', element: <User /> }

    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>,
)
