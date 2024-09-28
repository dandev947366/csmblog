import { PropsWithChildren, useEffect } from "react";
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/AuthService';
type ProtectedRouteProps = PropsWithChildren

const NoAuthMiddleware = ({children} : ProtectedRouteProps) => {

    const navigate = useNavigate()
    const { isAuthenticated, user } = useSelector((state: RootState)=>state.auth)
    useEffect(()=>{
        const checkAuthenticate = async () => {
            const userData = await fetchUser()
            console.log(userData)
            if(userData !== null){
                console.log('user data', userData)
            }
        }

        if(!isAuthenticated || user === null){
            checkAuthenticate()
        } else {
            navigate('/dashboard')
        }
    }, [isAuthenticated, user])
    return children
}

export default NoAuthMiddleware