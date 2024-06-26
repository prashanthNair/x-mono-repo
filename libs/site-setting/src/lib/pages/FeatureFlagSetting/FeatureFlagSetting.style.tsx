import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: "#E2E2E2",
    padding: "20px 20px 0 20px",
    maxHeight: "calc(100vh - 70px)",
    overflow: "auto",
  },

  informativeContentContainer: {
    backgroundColor: "white",
    borderRadius: "5px",
  },

  pageContainer: {
    height: "calc(100vh - 125px)",
    [theme.breakpoints.up("xs")]: {
      padding: "1px 15px 15px 15px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "0",
      overflowY: "auto",
    },
  },
  contentContainer: {
    maxWidth: "820px",
    margin: "auto",
    marginBottom: "10px",
  },

  subtitle: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingTop: "5px",
  },
  subtitle2: {
    paddingTop: "5px",
    textTransform: "capitalize",
  },
  featurebox: {
    display: "flex",
  },
}));
