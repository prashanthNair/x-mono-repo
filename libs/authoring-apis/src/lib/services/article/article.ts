import { ApolloError } from "@apollo/client";
import graphqlInstance from "../../config/graphqlConfig";
import { ArticleQueries } from "../../graphQL/queries/articleQueries";
import { FETCH_TAG_LIST_QUERY } from "../../graphQL/queries/tagQueries";
import { ApiResponse } from "../../utils/types";

const articleApi = {
  getList: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: ArticleQueries.FETCH_CONTENT_LIST_ALL,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
  createArticle: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: ArticleQueries.CREATE_CONTENT,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
  publishArticle: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: ArticleQueries.PUBLISH_CONTENT,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
  fetchArticleDetails: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: ArticleQueries.FETCH_CONTENT_BY_PATH,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
  updateArticle: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: ArticleQueries.UPDATE_CONTENT,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
  getTags: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_TAG_LIST_QUERY,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
};
export default articleApi;
