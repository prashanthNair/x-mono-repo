import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useStyles } from "./PrelemSearchHeader.styles";
import {
  ThemeConstants,
  MiniHeader,
  NotificationBox,
  LanguageDropDown,
} from "@platformx/utilities";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

const PrelemSearchHeader = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const noWeb = useMediaQuery(`@media(max-width:${ThemeConstants.EM - 1}px)`);
  const ifTab = useMediaQuery(theme.breakpoints.up("sm"));
  const getBreakPoint = () => {
    return ifTab;
  };
  return (
    <Box className={classes.prelemsearchheader}>
      <Grid container>
        <Grid item xs={2} md={2} sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              const path = localStorage.getItem("path");
              if (path) {
                navigate({
                  pathname: "/edit-page",
                  search: `?${createSearchParams({
                    page: path.toString(),
                  })}`,
                });
              } else {
                console.error("path from localstorage is empty in PrelemSearchHeader.tsx");
              }
            }}>
            <ArrowBackIcon sx={{ marginRight: "10px" }} /> {!noWeb && t("back")}
          </Box>
        </Grid>
        <Grid item xs={10} md={10} className='d-flex alignitemscenter justify-content-end'>
          <Box className='d-flex alignitemscenter justify-content-end'>
            <LanguageDropDown />
            <NotificationBox />
            {getBreakPoint() && (
              <Box className='headerAvatarIcon' sx={{ marginLeft: "20px" }}>
                <MiniHeader showUserDetails={false} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrelemSearchHeader;
