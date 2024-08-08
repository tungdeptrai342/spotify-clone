import { AxiosResponse } from "axios";
import request from "../config/request";

export interface ApiDataTypeCate {
  id: string;
  href: string;
  name: string;
  icons: { url: string }[];
}

interface ApiResponse {
  categories: {
    items: ApiDataTypeCate[];
  };
}

export const getCategories = async (): Promise<ApiDataTypeCate[]> => {
  try {
    const result: AxiosResponse<ApiResponse> = await request.get(`/v1/browse/categories`);
    console.log(result)
    return result.data.categories.items;
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};
