/* eslint-disable no-console */
import { ApolloError } from "@apollo/client";
import graphqlInstance from "../../config/graphqlConfig";
import {
  FETCH_ADMIN_DOMAIN,
  FETCH_CATEGORY,
  FETCH_COOKIE_POLICY,
  FETCH_COUNTRY,
  FETCH_FOOTER_SETTING,
  FETCH_GLOBAL_SETTING,
  FETCH_HEADER_SETTING,
  FETCH_MEDIA_HANDLE,
  FETCH_MULTISITE_LISTING,
  FETCH_TAG_LISTING,
  FETCH_USER_SITE,
} from "../../graphQL/queries/siteSettingQueries";
import {
  CREATE_TAG,
  DELETE_TAG,
  PUBLISH_COOKIE_SETTING,
  PUBLISH_FOOTER_SETTING,
  PUBLISH_GLOBAL_SETTING,
  PUBLISH_HEADER_SETTING,
  PUBLISH_MEDIA_HANDLE,
  PUBLISH_TAG,
  UPDATE_COOKIE_POLICY,
  UPDATE_FOOTER_SETTING,
  UPDATE_GLOBAL_SETTING,
  UPDATE_HEADER_SETTING,
  UPDATE_MEDIA_HANDLE,
} from "../../graphQL/mutations/siteSettingMutations";
import { ApiResponse } from "../../utils/types";

export const fetchFooterSetting = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_FOOTER_SETTING,
      variables: input,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (err: any) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const updateSiteSetting = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: UPDATE_FOOTER_SETTING,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const publishFooterSetting = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: PUBLISH_FOOTER_SETTING,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const updateHeaderSetting = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: UPDATE_HEADER_SETTING,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const updateGlobalSetting = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: UPDATE_GLOBAL_SETTING,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const fetchMediaHandle = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_MEDIA_HANDLE,
      variables: input,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (err: any) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const updateMediaHanle = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: UPDATE_MEDIA_HANDLE,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const publishMediaHanle = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: PUBLISH_MEDIA_HANDLE,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const fetchCookiePolicy = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_COOKIE_POLICY,
      variables: input,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const mutateCookiePolicy = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: UPDATE_COOKIE_POLICY,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const publishCookiePolicy = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: PUBLISH_COOKIE_SETTING,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const fetchCountries = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_COUNTRY,
      variables: input,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (err: any) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};
export const fetchHeaderSetting = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_HEADER_SETTING,
      variables: input,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const fetchGlobalSetting = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_GLOBAL_SETTING,
      variables: input,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const fetchGlobalSettingWithHeader = async <T>(input: T, headers: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_GLOBAL_SETTING,
      variables: input,
      fetchPolicy: "no-cache",
      context: headers,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const publishHeaderSetting = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: PUBLISH_HEADER_SETTING,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const publishGlobalSetting = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: PUBLISH_GLOBAL_SETTING,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const fetchMultisiteListing = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_MULTISITE_LISTING,
      variables: input,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (err: any) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const fetchAdminDomainList = async <T>(): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_ADMIN_DOMAIN,
    });
    return data;
  } catch (err: any) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const fetchUserSitePermissionList = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_USER_SITE,
      variables: input,
    });
    return data;
  } catch (err: any) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const getGlobalDataWithHeader = async (sitename: any) => {
  try {
    const { authoring_getSitedetails = {} } = await fetchGlobalSettingWithHeader(
      {
        page: "global-item",
      },
      {
        headers: {
          sitename: sitename,
        },
      },
    );
    const imageUuid = authoring_getSitedetails?.image?.slice(-1)?.[0]?.ScopeId;
    const videoUuid = authoring_getSitedetails?.video?.slice(-1)?.[0]?.ScopeId;
    imageUuid && localStorage.setItem("imageUuid", imageUuid);
    videoUuid && localStorage.setItem("videoUuid", videoUuid);
    return {};
  } catch (error) {
    return {};
  }
};

export const fetchTagListing = async <T>(input: T): Promise<ApiResponse<T>> => {
  const { data } = await graphqlInstance.query({
    query: FETCH_TAG_LISTING,
    variables: input,
    fetchPolicy: "network-only",
  });
  return data;
};

export const fetchCategory = async <T>(input: T): Promise<ApiResponse<T>> => {
  const { data } = await graphqlInstance.query({
    query: FETCH_CATEGORY,
    variables: input,
    fetchPolicy: "network-only",
  });
  return data;
};

export const createTag = async <T>(input: T): Promise<ApiResponse<T>> => {
  const { data } = await graphqlInstance.mutate({
    mutation: CREATE_TAG,
    variables: input,
  });
  return data;
};

export const publishTag = async <T>(input: T): Promise<ApiResponse<T>> => {
  const { data } = await graphqlInstance.mutate({
    mutation: PUBLISH_TAG,
    variables: input,
  });
  return data;
};

export const deleteTag = async <T>(input: T): Promise<ApiResponse<T>> => {
  const { data } = await graphqlInstance.mutate({
    mutation: DELETE_TAG,
    variables: input,
  });
  return data;
};
