import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { ThemeConstants } from "@platformx/utilities";

export const useEmptyResultStyle = makeStyles((theme: Theme) => ({
  noresult: {
    fontSize: "24px",
    fontFamily: "inter",
    fontStyle: "normal",
    lineHeight: "34px",
    fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
  },
  creathide: {
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  pagecontent: {
    fontFamily: "inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
  },
  emptysite: {
    textAlign: "center",
    marginTop: "15%",
  },
  nofilter: {
    marginTop: "8px",
  },
  typonew: {
    textAlign: "center",
    marginTop: "7px",
  },
  addbutton: {
    padding: " 9px 16px",
    fontFamily: "HCLTech Roobert",
    fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#FFFFFF",
    textTransform: "capitalize",
    bottom: "5px",
    right: "5px",
    border: "0",
    [theme.breakpoints.up("xs")]: {
      height: "56px",
      width: "56px",
      borderRadius: "50%",
      position: "fixed",
      backgroundColor: "#A0A3BD",
      minWidth: "unset",
    },
    [theme.breakpoints.up("sm")]: {
      height: "38px",
      width: "fit-content",
      borderRadius: "5px",
      position: "static",
      backgroundColor: "#14142B",
      minWidth: "inherit",
    },
  },
}));
