import axios from "../configs/axios"
const pagination = async () => {
    const response = await axios.get('/users');
    console.log('Response from UserService: ',response); // Log the entire response object
    //return response.data; // Return the full data for further inspection
}
export {pagination}