import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  CrossIcon: {
    background: "#fff",
    marginLeft: "10px",
    border: "1px solid #14142b ",
    width: "38px",
    height: "38px",
    borderRadius: "3px",
    // display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      background: "#262338",
      color: "#fff",
    },
  },
  BoxReview: {
    display: "flex",
    border: "solid 1px #4b9ef9",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: "3px",
    color: "#4b9ef9",
  },
  Doticon: {
    position: "relative",
    marginLeft: "10px",
    order: 2,
    minWidth: "auto",
    paddingLeft: "14px",
  },

  Tasklistbox: {
    alignItems: "center",
    display: "flex",
    background: "#FFFFFF",
    borderBottom: "1px solid #CED3D9",
    marginBottom: "0px",
    padding: "10px 0px",
    "&:last-child": {
      borderBottom: 0,
    },
  },
  BoxImage: {
    minWidth: "44px",
    minHeight: "44px",
    maxWidth: "44px",
    maxHeight: "44px",
    overflow: "hidden",
    borderRadius: "5px",
  },
  Title: {
    cursor: "pointer",
    overflow: "hidden",
    textOverflow: "ellipses",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
    "&:hover": {
      textDecoration: "underline",
      fontWeight: 600,
    },
  },
  Description: {
    overflow: "hidden",
    textOverflow: "ellipses",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  },
  Button: {
    padding: "0px 10px",
    borderRadius: "5px",
    justifyContent: "space-between",
    width: "100%",
    margin: "13px 0",
    "& button": {
      width: "50%",
      height: "47px",
      "&:first-child": {
        marginRight: "15px",
      },
    },
  },

  Blackdot: {
    background: "black",
    height: "5px",
    width: "5px",
    borderRadius: "50%",
    display: "inline-block",
    marginBottom: "2px",
    marginLeft: "10px",
  },
  reviewButton: {
    maxHeight: "40px",
    minWidth: "150px !important",
  },
}));
