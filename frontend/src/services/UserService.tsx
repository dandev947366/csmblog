import axiosInstance from "../configs/axios"
import {handleAxiosError} from "../helpers/axiosHelper"

const pagination = async() => {
    const response = await axios.get('/users')
    console.log(response)
}

export {pagination}