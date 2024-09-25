import { Outlet } from 'react-router-dom'
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../helpers/myHelper";
import { clearToast } from "../redux/slice/toastSlice";
import { fetchUser } from "../services/AuthService"
const Layout: React.FC = () => {
    const { message, type } = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();
    useEffect(() => {
        showToast(message, type);
        dispatch(clearToast());
    }, [message, type]);
    useEffect(() => {
    }, [message, type]);
    return (
        <>
            Main layout of components
            <Outlet />
        </>
    )
}
export default Layout