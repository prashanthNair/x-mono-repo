import CachedIcon from "@mui/icons-material/Cached";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import XImageRender from "./x-image-render";
import { ThemeConstants, UploadThumbnail } from "@platformx/utilities";

interface ImageProps {
  url?: any;
  onUploadClick?: any;
  handleChange?: any;
  type?: any;
  operationType?: string;
  content?: any;
  updateField?: any;
  originalImage?: any;
  publishedImages?: any;
  isShowCrop?: boolean;
  direction?: string;
  diffIcon?: boolean;
}
const AddImage = ({
  url,
  onUploadClick,
  operationType,
  content,
  updateField,
  originalImage,
  publishedImages,
  isShowCrop = false,
  direction = "column",
}: ImageProps) => {
  const { t } = useTranslation();
  return (
    <Box //sx={{ marginTop: '30px' }}
    >
      <Box sx={{ display: "none" }}>
        <TextField
        // onChange={handleChange('imagevideoURL')}
        />
      </Box>
      {url ? (
        <Box
          sx={{
            position: "relative", //height: "91%"
            borderRadius: "15px",
            minHeight: "206px",
            "& picture": {
              height: "206px",
            },
          }}
          mb={2}>
          {isShowCrop ? (
            <XImageRender
              callBack={updateField}
              editData={{
                original_image: originalImage,
                published_images: publishedImages,
              }}
              isCrop={true}
            />
          ) : (
            <img
              alt='selected'
              style={{
                width: "100%",
                height: "206px",
                objectFit: "cover",
                display: "flex",
                borderRadius: "15px",
              }}
              src={url}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#7470708a",
              borderRadius: "15px",
            }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ cursor: "pointer" }} onClick={() => onUploadClick("replace")}>
                <Box
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}>
                  <CachedIcon sx={{ color: "#626060" }} />
                </Box>
                <Typography
                  mt={1}
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    color: ThemeConstants.WHITE_COLOR,
                    textTransform: "capitalize",
                  }}>
                  {t("replace")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box></Box>
          <Box
            sx={{
              borderRadius: "15px",
              // border: 'dashed 2px #707070',
              // paddingLeft: {
              //   xs: "30px",
              //   sm: "30px",
              //   md: "100px",
              // },
              cursor: "pointer",
              height: "206px",
              backgroundColor: "#EFF0F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: direction,
            }}
            onClick={() => onUploadClick("Images")}>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              m={1}>
              <img src={UploadThumbnail} alt='ArrowUpwardIcon' />
            </Box>
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
              }}>
              <Typography variant='h5medium'>{t("page_choose_image")}</Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default React.memo(AddImage);
