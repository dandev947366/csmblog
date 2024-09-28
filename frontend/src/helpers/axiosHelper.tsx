import axios from "axios"
import { toast } from 'react-toastify'

const handleAxiosError = (error: unknown): void => {
    console.log(error)
    if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.error) {
            console.log(error.response.data.error);
        } else {
            console.log("Error. Try again!");
        }
    } else {
        console.log("An unknown error occurred.");
    }
}

export { handleAxiosError }
