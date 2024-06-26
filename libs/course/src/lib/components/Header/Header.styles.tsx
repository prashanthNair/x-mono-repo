import { makeStyles } from "@mui/styles";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles(() => ({
  containerStyle: {
    position: "absolute",
    top: "0",
    left: "0",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    zIndex: "999",
  },
  logoDispaly: {
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      display: "none",
    },
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      display: "none",
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      display: "flex",
    },
    cursor: "pointer",
  },
  headerTextDispaly: {
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      display: "flex",
    },
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      display: "flex",
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      display: "none",
    },
  },
  createCoursetophead: {
    display: "flex",
    position: "sticky",
    top: 0,
    zIndex: 2,
    background: "#fff",
    borderBottom: "solid 1px #ced3d9",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    minHeight: "62px",
  },

  contentStyle: {
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      paddingRight: "10px",
    },
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      paddingRight: "10px",
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      paddingRight: "55px",
    },
    display: "flex",
    flexDirection: "row",
    background: "#FFFFFF",
    alignItems: "center",
    border: "1px solid #D9DBE9",
    borderRadius: "5px",
    // width: '389px',
    height: "50px",
    marginTop: "15px",
    position: "relative",
  },
  imgUploadBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px 0px 0px 5px",
    width: "89px",
    height: "-webkit-fill-available",
    backgroundColor: "#F7F7FC",
    cursor: "pointer",
  },

  heroBannerCloudIconBox: {
    width: "20px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIconStyle: {
    position: "absolute",
    right: 0,
    padding: "5px 10px 5px 5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  workflowIconContainer: {
    display: "flex",
    padding: "10px",
  },
  workflowIconActive: {
    filter: "brightness(0) invert(5%)",
    height: "16px",
  },
  workflowIconInactive: {
    filter: "brightness(0) invert(50%)",
    height: "16px",
  },
}));
