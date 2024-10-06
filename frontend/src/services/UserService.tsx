import axios from "../configs/axios"

const pagination = async() => {
    const response = await axios.get('/users')
    console.log(response.data.users)
   // return response.data?.data.users

}

export {pagination}