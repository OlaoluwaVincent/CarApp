"use server";

import axiosInstance from "src/utils/axios";
import { Error, Product } from "src/utils/typing";

export const findAll = async (data?: {
  sort?: string;
  page?: string;
  search?: string;
  type?: string;
  steering?: string;
}) => {
  try {
    const defaultParams = {
      page: data?.page ? Number(data.page) : 1,
      sort: data?.sort ?? "asc",
      type: data?.type,
      search: data?.search,
      steering: data?.steering,
    };

    const response = await axiosInstance.get("/car", {
      params: data?.page
        ? { ...defaultParams, page: Number(data.page) }
        : defaultParams,
    });

    const result: Product = response.data;
    return result;
  } catch (error: any) {
    const errorData: Error = {
      message: error.response?.data?.message || "Error connecting to server",
      error: error.response?.data?.error || "Unknown error",
      statusCode: error.response?.status || 500,
    };

    throw errorData;
  }
};
