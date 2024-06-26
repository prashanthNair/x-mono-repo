import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  // const theme = useTheme(); // TODO: use theme
  return {
    taskNotFoundWp: {
      "&.taskNotFoundWp": {
        "& .contentWpBox": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          // [theme.breakpoints.down('em')]: { // TODO: use theme
          //   flexDirection: 'column',
          //   textAlign: 'center',
          //   paddingBottom: '15px',
          // },
          "& .imgboxWp": {
            width: "100px",
            height: "100%",
            marginRight: "20px",
            // [theme.breakpoints.down('em')]: { //TODO use theme
            //   marginRight: '0px',
            // },
          },
        },
      },
    },
    typo: {
      marginTop: "10px",
    },
  };
});
