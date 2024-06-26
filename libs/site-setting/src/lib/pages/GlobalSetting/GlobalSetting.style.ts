import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useGlobalSettingStyle = makeStyles((theme: Theme) => ({
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

  globalContainer: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "75px",
    borderRadius: "5px",
    border: "1px solid #D9DBE9",
    borderColor: "#D9DBE9",
    backgroundColor: "#FCFCFC",
    overflow: "hidden",
    marginTop: "10px",
  },
  containertypo: {
    marginTop: "10px !important",
  },
  globalimg: {
    width: "45px",
    height: "45px",
    borderRadius: "5px",
    backgroundColor: "#EFF0F6",
    padding: "10px",
    marginLeft: "12px",
    marginTop: "12px",
  },

  globalbread: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
  },
  marginTop5px: {
    marginTop: "5px",
  },
  btnbox: {
    marginTop: "10px !important",
    height: "50px !important",
    marginRight: "15px !important",
    display: "none",
  },
  btnboxnew: {
    display: "flex",
  },
}));
