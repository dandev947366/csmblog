import { PropsWithChildren } from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
type ProtectedRouteProps = PropsWithChildren

const AuthMiddleware = ({children}: ProtectedRouteProps) => {
    // const navigate = useNavigate()
    // const { isAuthenticated, user } = useSelector((state: RootState) => state.toast);
    
    // useEffect(()=>{
    //     if(isAuthenticated || user === null){
    //         navigate('/admin')
    //     }
    
    // }, [isAuthenticated, user])
    // return isAuthenticated && user ? children : null
    return children
}

export default AuthMiddleware