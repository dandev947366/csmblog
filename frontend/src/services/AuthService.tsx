import axiosInstance from "../configs/axios"
import {handleAxiosError} from "../helpers/axiosHelper"
import { User } from "../types/User"
import {LoginPayload} from "../types/Login"
const login = async (payload:LoginPayload) : Promise<User | null> => {
    try {
        const response = await axiosInstance.post('/auth/login',{
            email: payload.email,
            password: payload.password
        })
        return response.data.user
    } catch(error) {
        handleAxiosError(error)
        return null
    }
}
const fetchUser = async(): Promise<User | null> => {
    try{
        const response = await axiosInstance.get('/auth/me')
        console.log(response)
    } catch (error){
        handleAxiosError(error)
        return null
    }
    return null
}
export {login, fetchUser}