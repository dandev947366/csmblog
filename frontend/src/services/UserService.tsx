import axios from "../configs/axios";
const pagination = async () => {
    const response = await axios.get('/users');
    console.log('API Response:', response.data);
    // return response.data;
};
export { pagination };
