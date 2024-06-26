import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderTop: `1px solid ${ThemeConstants.PRIMARY_COLOR[500]}`,
    margin: "auto",
    padding: "30px 0",
    [theme.breakpoints.up(ThemeConstants.XS)]: {
      width: "90%",
    },
    [theme.breakpoints.up(ThemeConstants.SM)]: {
      width: "77%",
    },
  },
  TableHead: {
    backgroundColor: ThemeConstants.COLOR_N0300,
  },
  tableContainer: {
    border: `1px solid ${ThemeConstants.PRIMARY_COLOR[500]}`,
    boxShadow: "none",
  },
}));
