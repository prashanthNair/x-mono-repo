import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "../../utils/types";

const createAxiosError = (err: AxiosError): ApiError => {
  return { message: err.message, status: err.response?.status ?? 500 };
};

export const multiSiteApi = {
  getPermissions: async (sitename: string): Promise<AxiosResponse<any>> => {
    try {
      // eslint-disable-next-line no-debugger

      const res = await axios.get(
        process.env.NX_API_URI + `auth/get-site-permissions/${sitename}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
          },
          withCredentials: true,
        },
      );
      return res;
    } catch (e: any) {
      throw createAxiosError(e);
    }
  },
};
