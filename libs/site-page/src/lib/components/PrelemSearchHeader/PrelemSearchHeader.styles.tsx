import { makeStyles } from "@mui/styles";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles(() => ({
  prelemsearchheader: {
    padding: "9px 15px",
    minHeight: "60px",
    borderBottom: "1px solid #D9DBE9",
    display: "flex",
    alignItems: "center",
    background: ThemeConstants.WHITE_COLOR,
    position: "sticky",
    top: 0,
    zIndex: 9,
  },
  headerAvatarIcon: {
    marginLeft: "20px",
  },
}));
