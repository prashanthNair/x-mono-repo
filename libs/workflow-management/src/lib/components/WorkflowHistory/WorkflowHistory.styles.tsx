import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles((theme: Theme) => ({
  outerContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "initial",
    },
  },
  backIconContainer: {
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    padding: "15px 10px",
    margin: 0,
    width: "100%",
    borderBottom: `1px solid ${ThemeConstants.PRIMARY_COLOR[500]}`,
    [theme.breakpoints.up(ThemeConstants.MD)]: {
      width: "42px",
      border: `1px solid ${ThemeConstants.PRIMARY_COLOR[500]}`,
      margin: "24px 0 0 22px",
      padding: "8px",
    },
  },

  icon: {
    cursor: "pointer",
  },
}));
