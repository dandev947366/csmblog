import axios from "axios"
import { toast } from 'react-toastify'

const handleAxiosError = (error: unknown): void => {
    console.log(error)
    if (axios.isAxiosError(error)) { 
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error("Error. Try again!");
        }
    } else {
        toast.error("An unknown error occurred.");
    }
}

export { handleAxiosError }
