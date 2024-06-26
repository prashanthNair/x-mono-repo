import { ErrorTooltip, UploadThumbnail, useAccess } from "@platformx/utilities";
import CachedIcon from "@mui/icons-material/Cached";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
// import { ErrorTooltip, useAccess } from "@platformx/utilities";
// import "../../../../../components/Common/commonStyles/disabledStyles.css";
import { useStyles } from "./ChooseVideoTray.styles";
import { ChooseVideoTrayProps } from "./ChooseVideoTray.types";
import { Category, ContentAction, ContentType } from "../../../../../enums/ContentType";

export const ChooseVideoTray: FC<ChooseVideoTrayProps> = ({ ifVideoUrl, onUploadClick }) => {
  const { t } = useTranslation();
  const { canAccessAction } = useAccess();
  const classes = useStyles();
  return (
    <ErrorTooltip
      component={
        <Box
          className={
            !canAccessAction(Category.Content, ContentType.Vod, ContentAction.View) ? "disable" : ""
          }>
          {ifVideoUrl ? (
            <Box
              sx={{
                position: "relative",
                borderRadius: "15px",
                overflow: "hidden",
              }}
              mb={1}>
              <video style={{ width: "100%", height: "100%" }} src={ifVideoUrl} controls></video>
              <Box className={classes.replaceTray}>
                <Box onClick={() => onUploadClick("Videos")}>
                  <Box className={classes.cashedContainer}>
                    <CachedIcon sx={{ color: "#626060" }} />
                  </Box>
                  <Typography mt={1} variant='h7regular' className={classes.whiteColor}>
                    {t("replace")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className={classes.chooseTray} onClick={() => onUploadClick("Videos")}>
              <Box className={classes.arrowUpContainer} mr={1}>
                <img src={UploadThumbnail} alt='UploadThumbnail' />
              </Box>
              <Box className={classes.chooseTextContainer}>
                <Typography variant='h5medium'>{t("video_subtitle")}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      }
      doAccess={!canAccessAction(Category.Content, ContentType.Vod, ContentAction.View)}
    />
  );
};
