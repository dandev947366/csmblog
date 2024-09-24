
import { Outlet } from 'react-router-dom'
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../helpers/myHelper";
import { clearToast } from "../redux/slice/toastSlice";


const Layout: React.FC = () => {
    const { message, type } = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();
  
    useEffect(() => {
      
      if (message) {
        showToast(message, type);
        dispatch(clearToast());
      }
    }, [message, type, dispatch]); 
  
    return (
        <>
            Main layout of components
            <Outlet  />
        </>
    
    )


}

export default Layout