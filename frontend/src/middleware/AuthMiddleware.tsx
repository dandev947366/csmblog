import { PropsWithChildren, useEffect } from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/AuthService';
import { setAuthLogin, setAuthLogout } from '../redux/slice/authSlice';

type ProtectedRouteProps = PropsWithChildren;

const AuthMiddleware = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();  // Declare dispatch here
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const checkAuthenticate = async () => {
            if (!isAuthenticated || user === null) {
                const userData = await fetchUser();
                if (userData) {
                    dispatch(setAuthLogin(userData));
                } else {
                    dispatch(setAuthLogout());
                    navigate('/admin');
                }
            }
        };
        checkAuthenticate();
    }, [isAuthenticated, user, dispatch, navigate]);

    return isAuthenticated && user ? children : null;
};

export default AuthMiddleware;
