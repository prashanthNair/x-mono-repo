import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { ThemeConstants } from "@platformx/utilities";

export const useHeaderSettingStyle = makeStyles((theme: Theme) => ({
  pageContainer: {
    [theme.breakpoints.up("xs")]: {
      padding: "15px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "15px",
      overflow: "scroll",
    },
  },

  contentContainer: {
    maxWidth: "820px",
    margin: "auto",
    paddingBottom: "70px",
    height: "calc(100vh - 190px)",
  },
  globalnewcontain: {
    [theme.breakpoints.up("sm")]: {
      right: "5px !important",
    },
    [theme.breakpoints.up("xs")]: {
      right: "0",
    },
    position: "fixed",
    top: "25%",
    zIndex: 1000,
  },

  leftForm: {
    [theme.breakpoints.up("xs")]: {
      paddingRight: "0",
      borderRight: "0",
    },
    [theme.breakpoints.up("sm")]: {
      paddingRight: "32px",
      borderRight: "1px solid #D9DBE9",
    },
  },

  rightForm: {
    [theme.breakpoints.up("xs")]: {
      padding: "24px 0 0 0",
      borderTop: "1px solid #D9DBE9",
      marginTop: "24px",
      // display: isShowPreview ? 'block' : 'none',
    },
    [theme.breakpoints.up("sm")]: {
      padding: "0 0 15px 32px",
      borderTop: "0",
      marginTop: "0",
      display: "block",
    },
  },

  skeletonTitle: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
    fontSize: ThemeConstants.FONTSIZE_H7,
    lineHeight: ThemeConstants.LINE_HEIGHT_H6,
    color: "#6E7191",
  },

  headerFaviconUsLeft: {
    [theme.breakpoints.up("xs")]: {
      paddingRight: "0",
      borderRight: "0",
      height: "fit-content",
    },
    [theme.breakpoints.up("sm")]: {
      paddingRight: "32px",
      borderRight: "1px solid #D9DBE9",
      height: "270px",
    },
  },

  pictureIconContainer: {
    height: "57px",
    width: "57px",
    backgroundColor: "#EFF0F7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
  },
  addNewBtnBox: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
    fontSize: ThemeConstants.FONTSIZE_H7,
    lineHeight: "25px",
    marginLeft: "13px",
  },
  dragIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  faviconbox: {
    marginTop: "15px",
  },
  faviconbox2: {
    width: "40%",
  },
  ctaTitleLeft: {
    [theme.breakpoints.up("xs")]: {
      paddingRight: "0",
      borderRight: "0",
      height: "fit-content",
    },
    [theme.breakpoints.up("sm")]: {
      paddingRight: "32px",
      borderRight: "1px solid #D9DBE9",
      height: "282px",
    },
  },
}));
