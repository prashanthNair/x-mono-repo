import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeConstants } from "@platformx/utilities";

export const useFooterSettingStyle = makeStyles((theme: Theme) => ({
  pageContainer: {
    [theme.breakpoints.up("xs")]: {
      padding: "15px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "0",
      overflow: "scroll",
    },
  },

  contentContainer: {
    maxWidth: "820px",
    margin: "auto",
    height: "calc(100vh - 160px)",
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
      padding: "15px 0 15px 32px",
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
  pictureiconinner: {
    display: "flex",
  },
  deleteicon: {
    marginTop: "12px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  addicon: {
    height: "20px !important",
    width: "20px !important",
    margin: "0px 0px -6px 0px",
  },
  aboutUsLeft: {
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
    height: "48px",
    width: "57px",
    backgroundColor: "#EFF0F7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
  },

  aboutUsTextBox: {
    width: "calc(100% - 68px)",
    marginLeft: "11px",
  },

  dragIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  newLinkContainer: {
    marginTop: "35px",
    [theme.breakpoints.up("xs")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-start",
    },
  },

  addNewBtnBox: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
    fontSize: ThemeConstants.FONTSIZE_H7,
    lineHeight: "25px",
    marginLeft: "13px",
  },

  copyRightLeft: {
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
