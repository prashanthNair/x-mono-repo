/* eslint-disable no-console */
import { Box, Typography } from "@mui/material";
import { fetchUserSitePermissionList } from "@platformx/authoring-apis";
import {
  Card,
  ContentListDesktopLoader,
  NoSearchResult,
  capitalizeFirstLetter,
  capitalizeWords,
  convertToLowerCase,
  formatContentTitle,
  handleHtmlTags,
  useUserSession,
  Loader,
} from "@platformx/utilities";
import { Key, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { ContentListingProps, ListItem } from "../../utils/List.types";
import ContentTypeMenuList from "../MenuList/ContentTypeMenuList";
import { RootState } from "@platformx/authoring-state";
import { useSelector } from "react-redux";

const ContentListing = ({
  content,
  loading,
  fetchMore,
  deleteContent,
  duplicate,
  preview,
  unPublish,
  view,
  edit,
  editPage,
  fetchContentDetails,
  deleteContentLoading,
  deletePage,
  deletePageLoading,
}: ContentListingProps) => {
  const { contentArray } = useSelector((state: RootState) => state.content);
  const [sitelist, setSiteList] = useState([]);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const pageUrl = new URL(window.location.href);
  const path = pageUrl.pathname.split("/")?.pop();
  const { t } = useTranslation();

  const fetchUserSite = async () => {
    try {
      const inputVariable = {
        user_id: userInfo?.user_id,
        content_type: capitalizeFirstLetter(path),
      };
      const response: any = await fetchUserSitePermissionList({
        ...inputVariable,
      });

      if (response?.authoring_getUserSitePermissionList) {
        const siteList = response.authoring_getUserSitePermissionList || [];
        setSiteList(siteList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchPageUrl = new URL(window.location.href);

  const contentType: string = capitalizeFirstLetter(searchPageUrl?.pathname?.split("/")?.[4]);
  const makeContentData = (item: any) => {
    const listItemDetails: ListItem = {
      tagName: convertToLowerCase(item.tag_name),
      pageName: item.page,
      title: capitalizeFirstLetter(item.title),
      description: handleHtmlTags(item.description),
      author: item.author,
      lastModifiedDate:
        item.last_modification_date || item?.modificationDate || item?.last_modified_date,
      status: item.status || item?.page_state,
      path: item?.path,
      page: item?.page,
      scheduledPublishTriggerDateTime: item?.schduled_publish_trigger_datetime,
      scheduledUnPublishTriggerDateTime: item?.schduled_unPublish_trigger_datetime,
      lastPublishedDate: item?.last_published_date,
      lastModifiedBy: capitalizeWords(
        formatContentTitle(item?.last_modified_by?.replace("undefined", "")),
      ),
      publishedBy: capitalizeWords(
        formatContentTitle(item?.published_by?.replace("undefined", "")),
      ),
      publishedDate: item?.published_date,
      currentPageUrl: item?.current_page_url,
      parentPageUrl: item?.parent_page_url,
      name: capitalizeWords(formatContentTitle(item?.name?.replace("undefined", ""))),
      page_state: item?.page_state,
      is_published: item?.is_published,
      current_page_url: item?.current_page_url,
      settings: item?.settings,
      banner: item.banner,
      published_images: item?.published_images,
      original_image: item?.original_image,
      eventStartDate: item?.event_start_date,
      eventEndDate: item?.event_end_date,
      url: item?.url || "",
    };
    return listItemDetails;
  };
  const makeCourseContentData = (item: any) => {
    const listItemDetails: any = {
      tagName: convertToLowerCase(item.tags),
      // pageName: item.id,
      title: capitalizeWords(formatContentTitle(item.title)),
      description: handleHtmlTags(item.description),
      author: item.author,
      lastModifiedDate: item.published_date,
      status: "published",
      // path: item?.path,
      // page: item?.id,
      // scheduledPublishTriggerDateTime: item?.schduled_publish_trigger_datetime,
      // scheduledUnPublishTriggerDateTime:
      //   item?.schduled_unPublish_trigger_datetime,
      lastPublishedDate: item.published_date,
      lastModifiedBy: capitalizeWords(
        formatContentTitle(item?.published_by?.replace("undefined", "")),
      ),
      publishedBy: capitalizeWords(
        formatContentTitle(item?.published_by?.replace("undefined", "")),
      ),
      publishedDate: item?.published_date,
      currentPageUrl: item?.course_url,
      parentPageUrl: item?.parent_page_url,
      name: capitalizeWords(formatContentTitle(item?.name?.replace("undefined", ""))),
      // page_state: item?.page_state,
      // is_published: item?.is_published,
      current_page_url: item?.course_url,
      // settings: item?.settings,
      // banner: item.banner,
      course_id: item?.id,
      teaser_image: item?.teaser_image,
      // published_images: item?.published_images,
      // original_image: item?.original_image,
      // eventStartDate: item?.event_start_date,
      // eventEndDate: item?.event_end_date,
    };
    return listItemDetails;
  };

  useEffect(() => {
    fetchUserSite();
  }, [path]);

  return (
    <Box id='scrollableDiv' sx={{ height: "calc(100vh - 140px)", overflowY: "auto" }}>
      {deletePageLoading || deleteContentLoading ? <Loader /> : ""}
      <InfiniteScroll
        dataLength={contentArray?.length}
        next={fetchMore}
        hasMore={loading}
        endMessage={
          contentArray?.length > 20 ? (
            <Typography sx={{ textAlign: "center" }}> {t("no_more_data")}</Typography>
          ) : (
            ""
          )
        }
        loader={<ContentListDesktopLoader />}
        scrollableTarget='scrollableDiv'
        style={{ overflowX: "hidden" }}>
        <Box sx={{ padding: "0 10px 0 15px" }}>
          <Box>
            {!loading && !contentArray?.length ? (
              <NoSearchResult />
            ) : (
              contentArray?.map((item: any, index: Key | null | undefined) => {
                return (
                  <Box key={index}>
                    <Card
                      dataList={
                        content === "Course" ? makeCourseContentData(item) : makeContentData(item)
                      }
                      deleteContent={deleteContent}
                      preview={preview}
                      view={view}
                      edit={edit}
                      editPage={editPage}
                      siteList={sitelist}
                      contentType={contentType}
                      handlePageDelete={deletePage}
                      CustomMenuList={
                        <ContentTypeMenuList
                          item={makeContentData(item)}
                          deleteContent={deleteContent}
                          duplicate={duplicate}
                          preview={preview}
                          unPublish={unPublish}
                          view={view}
                          edit={edit}
                          fetchContentDetails={fetchContentDetails}
                        />
                      }
                    />
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </InfiniteScroll>
    </Box>
  );
};
export default memo(ContentListing);
