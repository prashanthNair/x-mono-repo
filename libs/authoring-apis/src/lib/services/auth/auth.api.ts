import { ApolloError } from "@apollo/client";
import { LOGOUT_URL } from "@platformx/utilities";
import axios from "axios";
import graphqlInstance from "../../config/graphqlConfig";
import { AuthQueries } from "../../graphQL/queries/authQueries";
import { ApiResponse } from "../../utils/types";

const handleLogout = () => {
  localStorage.removeItem("path");
  window.location.replace(LOGOUT_URL);
};
const authAPI = {
  verifySession: async (url: string) => {
    try {
      const res = await axios.get(process.env.NX_API_URI + url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      if (err?.response?.data?.code === 401 && !url.includes("verify")) {
        handleLogout();
      }
      return err;
    }
  },
  signIn: async (url: string, payload = {}) => {
    try {
      const res = await axios.post(process.env.NX_API_URI + url, payload, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
        withCredentials: true,
      });
      // eslint-disable-next-line no-console
      console.log("login", res, payload);
      return res.data.result ? res.data.result : res.data;
    } catch (err: any) {
      if (err?.response?.data?.code === 401) {
        handleLogout();
      }
      return err;
    }
  },
  fetchRoles: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: AuthQueries.FETCH_PERMISSIONS,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data?.authoring_permissionList || null;
    } catch (err: any) {
      if (err instanceof ApolloError) throw err;
      return err;
    }
  },
};
export default authAPI;
