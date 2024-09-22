import axios from "axios"
import { toast } from 'react-toastify'

const handleAxiosError = (error: unknown): void => {
    if (axios.isAxiosError(error)) { // Corrected parenthesis
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
