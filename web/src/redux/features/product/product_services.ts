import axiosInstance, { isOnline } from "src/utils/axios"
import { Error } from "../auth/auth_services";


interface ProductData {
    data: any,
    length: number,
    totalCars: number,
    totalPages: number
}


export const findAll = async (sort: string, page: string) => {
    const pageNumber = Number(page)
    try {
        const response = await axiosInstance.get('/car', {
            params: {
                sort: sort,
                page: pageNumber
            },
        });
        const result:ProductData = response.data;
        return result
    } catch (error: any) {
        if (!isOnline()) {
            throw {
                message: 'Please connect to the internet',
            };
        }

        const errorData: Error = {
            message: error.response?.data?.message || 'Error connecting to server',
            error: error.response?.data?.error || 'Unknown error',
            statusCode: error.response?.status || 500,
        };
        throw errorData;
    }
}
