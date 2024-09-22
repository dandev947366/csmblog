import { useToast } from "../contexts/ToastContext";
import { useEffect } from "react";
import { showNotify } from '../helpers/myHelper';

function Dashboard() {
  const { message, type, setMessage } = useToast(); 

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
