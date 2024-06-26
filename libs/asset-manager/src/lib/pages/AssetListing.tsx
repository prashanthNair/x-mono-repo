import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  AssetnoIcon,
  AssetyesIcon,
  NewfolderIcon,
  ShowToastError,
  ShowToastSuccess,
  AUTH_INFO,
  Loader,
} from "@platformx/utilities";
import { useSearchParams } from "react-router-dom";
import { AssetHeader } from "./AssetHeader";
import Folder from "../components/Folder";
import { useImagesStyle } from "./Images.style";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { assetsApi, useAsset } from "@platformx/authoring-apis";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { FolderSkelaton } from "../components/FolderSkeleton";

export const AssetListing = () => {
  const classes = useImagesStyle();
  const { t } = useTranslation();
  const pathName = window.location.pathname.split("/");
  const assetType = pathName.pop() || "images";
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [searchParams] = useSearchParams();
  const assetUUID = {
    images: AUTH_INFO.dspaceImagesUuid,
    videos: AUTH_INFO.dspaceVideosUuid,
    // docs: authInfo.misc
  };
  const uuid1 = searchParams.get("uuid1") || assetUUID[assetType];

  const {
    assetData,
    collectionItem,
    isLazyLoad,
    fetchMoreData,
    startIndex,
    setStartIndex,
    assetLoading,
    folderLoading,
    fetchCommunityCollect,
    fetchCollectionAsset,
  } = useAsset();

  const entityType = {
    images: "Image",
    videos: "Video",
  };
  const handleShow = () => setShow((prev) => !prev);
  const fetchMore = () => {
    const nextIndex = startIndex + 1;
    setStartIndex(() => nextIndex);
    fetchMoreData(nextIndex);
  };

  const createFolder = async () => {
    setIsLoading(true);
    try {
      const { authoring_createAssets = {} } = await assetsApi.createCommunity({
        input: {
          name: folderName,
          uuid: uuid1,
        },
      });

      if (authoring_createAssets.id) {
        //const collectionRes =s
        await assetsApi.createCollection({
          input: {
            name: folderName,
            uuid: authoring_createAssets.id,
          },
          entityType: entityType[assetType],
        });
      }
      ShowToastSuccess(authoring_createAssets.message);
      fetchCommunityCollect(true);
      setStartIndex(0);
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    } finally {
      setShow(false);
      setFolderName("");
      setIsLoading(false);
    }
  };

  const deleteFolder = async (communityId) => {
    try {
      const data = await assetsApi.deleteCommunity({
        uuid1: communityId,
      });

      ShowToastSuccess(data.community?.message);
      fetchCommunityCollect(true);
      setStartIndex(0);
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    }
  };

  const deleteAsset = async (communityId) => {
    try {
      await assetsApi.deleteAsset({
        uuid: communityId,
      });

      ShowToastSuccess(`${t("assetType")} ${t("deleted_toast")}`);
      fetchCollectionAsset();
      setStartIndex(0);
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    }
  };

  useEffect(() => {
    setShow(false);
    setFolderName("");
  }, [uuid1]);

  return (
    <>
      <AssetHeader handleShow={setShow} collectionArr={assetData.collections} />
      {isLoading && <Loader />}
      <Grid id='scrollableDiv' container className={classes.imagecontainer}>
        <InfiniteScroll
          dataLength={collectionItem.collectionItem?.length}
          next={fetchMore}
          hasMore={isLazyLoad}
          loader={<FolderSkelaton size={[1, 2, 3, 4]} />}
          scrollableTarget='scrollableDiv'>
          <Grid container item xs={12} sm={6} md={6} lg={3} className={classes.floatleft}>
            {!show ? (
              <Box className={classes.folderadd} onClick={handleShow}>
                <Box className={classes.folderlisting}>
                  <img className={classes.foldericon} src={NewfolderIcon} alt='folder' />
                  <Box className={classes.typeoexisttest}>
                    <Typography variant='inherit' className={classes.createfol}>
                      {t("create_new_folder")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className={classes.folderadd}>
                <Box className={classes.folderlisting} sx={{ cursor: "auto" }}>
                  <img className={classes.foldericon} src={NewfolderIcon} alt='folder' />
                  <Box className={classes.typeoexisttest}>
                    <TextField
                      inputProps={{ style: { textAlign: "center" } }}
                      className={classes.textcen}
                      placeholder={t("enter_folder_name")}
                      id='standard-basic'
                      variant='standard'
                      autoComplete='off'
                      onChange={(e) => setFolderName(e.target.value)}
                      autoFocus
                    />
                  </Box>
                  <Box className={classes.boxicon}>
                    <img
                      className={classes.assetyesicon}
                      onClick={handleShow}
                      src={AssetyesIcon}
                      alt='cancel'
                    />
                    <img
                      className={classes.assetnoicon}
                      onClick={() => createFolder()}
                      src={AssetnoIcon}
                      alt='done'
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>
          {folderLoading && <FolderSkelaton size={[1, 2, 3]} />}
          {assetData.subcommunities.map((data) => (
            <Folder key={data.uuid} data={data} deleteFolder={deleteFolder} />
          ))}

          {assetLoading && <FolderSkelaton size={[1, 2, 3, 4]} />}
          {collectionItem.collectionItem?.length > 0 &&
            collectionItem.collectionItem?.map((data) => (
              <ImageCard data={data} key={data.uuid} deleteAsset={deleteAsset} />
            ))}
        </InfiniteScroll>
      </Grid>
    </>
  );
};
