import { useToast } from "../contexts/ToastContext";
import { useEffect } from "react";
import { showNotify } from '../helpers/myHelper';
import { RootState } from "../redux/store"
import { clearToast } from "../redux/slice/toastSlice"
import { useSelector, useDispatch } from "react-redux";
function Dashboard() {
  const { message, type, setMessage } = useSelector((state: RootState)=>{state.counter.value}); 
  const dispatch = useDispatch()
  useEffect(() => { 
    if (message && type) { 
      showNotify(message, type, setMessage);
    }
  }, [message, type, setMessage]); // Dependency array

  return (
    <div>Dashboard</div>
  );
}

export default Dashboard;
