import axios from "axios";
import { LOGOUT_URL, getSelectedSite, getSubDomain } from "@platformx/utilities";

const handleLogout = () => {
  const keycloakURL = LOGOUT_URL;
  localStorage.removeItem("userSession");
  localStorage.removeItem("selectedSite");
  localStorage.removeItem("imageUuid");
  localStorage.removeItem("videoUuid");
  window.location.replace(keycloakURL);
};

export const getRequest = async (url) => {
  try {
    const res = await axios.get(process.env.NX_API_URI + url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        sitename: getSelectedSite(),
        site_host: getSubDomain(),
      },
      withCredentials: true,
    });
    return res?.data?.result ? res?.data?.result : res?.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401 && !url.includes("verify")) {
      handleLogout();
    }
    return err;
  }
};
export const getRequestFromDelivery = async (url) => {
  try {
    const res = await axios.get(process.env.NX_DELIVERY_URI + url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        sitename: getSelectedSite(),
        site_host: getSubDomain(),
      },
      withCredentials: true,
    });
    return res?.data?.result ? res?.data?.result : res?.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401 && !url.includes("verify")) {
      handleLogout();
    }
    return err;
  }
};

export const putRequest = async (url, payload) => {
  try {
    const res = await axios.put(process.env.NX_API_URI + url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        sitename: getSelectedSite(),
        site_host: getSubDomain(),
      },
      withCredentials: true,
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401) {
      handleLogout();
    }
    return err;
  }
};

export const postRequest = async (url, payload = {}) => {
  try {
    const res = await axios.post(process.env.NX_API_URI + url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        sitename: getSelectedSite(),
        site_host: getSubDomain(),
      },
      withCredentials: true,
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401) {
      handleLogout();
    }
    return err;
  }
};

export const commonPostApiCall = (url, payload = {}) => {
  try {
    return axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        sitename: getSelectedSite(),
        site_host: getSubDomain(),
      },
    });
  } catch (err: any) {
    return err.response;
  }
};

export const commonPutApiCall = (url, payload = {}) => {
  try {
    return axios.put(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        sitename: getSelectedSite(),
        site_host: getSubDomain(),
      },
    });
  } catch (err: any) {
    return err.response;
  }
};
