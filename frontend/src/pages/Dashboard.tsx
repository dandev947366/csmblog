import { useToast } from "../contexts/ToastContext"
import { toast } from "react-toastify"
import { useEffect } from "react"

function Dashboard() {
  const { message, setMessage } = useToast()

  useEffect(() => { 
    if (message) {
      toast.success(message)
      setMessage('') // Clear the message after displaying the toast
    }
  }, [message, setMessage]) // Dependency array

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
