import { Avatar, Box, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ProfileImageData from "../../assets/images/avatar.png";
// import { Store } from '../../store/ContextStore';
// import ThemeConstants from '../../theme/variable';
// import { logoutUrl } from '../../utils/authConstants';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import usePlatformAnalytics from "../../hooks/usePlatformAnalytics/usePlatformAnalytics";
import useUserSession from "../../hooks/useUserSession/useUserSession";
// import { callSaveandResetWarning } from '../../store/Actions';
// import { capitalizeFirstLetter } from '../../utils/helperFunctions';
// import PlateformXDialog from '../Modal';
import CommonPlateformXDialog from "../../components/Modal/CommonPlateformXDialog";
import { LOGOUT_URL } from "../../constants/AuthConstant";
import ThemeConstants from "../../themes/authoring/lightTheme/lightThemeVariable";
import { capitalizeFirstLetter } from "../../utils/helperFns";
import { Users } from "./Header.types";

const saveWarningMessage = {
  saveWarnTitle: "Unsaved Changes",
  saveWarnSubtitle:
    "You have unsaved changes, do you want to save them before moving out of this window?",
  saveWarnSave: "Save",
  saveWarnReject: "Take me out",
};

export const MiniHeader = ({ showUserDetails = true }: Users) => {
  const { t } = useTranslation();
  const [getSession, updateSession] = useUserSession();
  const userSession = getSession();
  // const { state, dispatch } = useContext(Store); // TODO
  // const { page } = state;
  // const { quiz } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const { saveWarnTitle, saveWarnSubtitle, saveWarnSave, saveWarnReject } = saveWarningMessage;
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const [hasSaveWarning, setHasSaveWarning] = React.useState<boolean>(false);
  const openMenu = Boolean(anchorE2);
  const [triggerCase, setTriggerCase] = useState("");
  const [backgroundStyle, setBackgroundstyle] = useState("");

  useEffect(() => {
    setBackgroundstyle(ThemeConstants.WHITE_COLOR);
    return () => {
      setBackgroundstyle("");
    };
  }, []);

  const onCloseSaveWarningHandler = () => {
    setHasSaveWarning(false);
    // dispatch(callSaveandResetWarning(true));
  };
  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };
  const hasUnsavedChanges = () => {
    // if (location.pathname.includes('/edit-page') && page?.showSaveWarning) {
    if (location.pathname.includes("/edit-page")) {
      setHasSaveWarning(true);
      return true;
    } else if (
      location.pathname.includes("/create-quiz")
      // &&      quiz?.isUnsavedQuiz
    ) {
      setHasSaveWarning(true);
      return true;
    } else if (location.pathname.includes("/create-vod")) {
      setHasSaveWarning(true);
      return true;
    } else if (location.pathname.includes("/create-poll")) {
      setHasSaveWarning(true);
      return true;
    } else if (location.pathname.includes("/create-event")) {
      setHasSaveWarning(true);
      return true;
    } else {
      return false;
    }
  };
  const [handleImpression] = usePlatformAnalytics();
  const callFnsCase = (triggerCaseSent: any) => {
    setHasSaveWarning(false);
    switch (triggerCaseSent) {
      case "CHANGE_PWD":
        setAnchorE2(null);
        navigate("/change-password");
        break;
      case "LOGOUT": {
        const keycloakURL = LOGOUT_URL;
        const pageDataObj = {
          eventType: "Logout User",
          LogOutUser: true,
        };
        handleImpression(pageDataObj.eventType, pageDataObj);
        localStorage.removeItem("selectedSite");
        localStorage.removeItem("imageUuid");
        localStorage.removeItem("videoUuid");
        localStorage.removeItem("path");

        updateSession(null); // TODO:  Check if this is required
        window.location.replace(keycloakURL);
        break;
      }
      case "PAGE_LIST":
        navigate("/sitepage");
        break;
      default:
        window.location.replace(LOGOUT_URL);
        break;
    }
  };
  const handleChangePassword = () => {
    setTriggerCase("CHANGE_PWD");
    if (!hasUnsavedChanges()) {
      callFnsCase("CHANGE_PWD");
    }
  };

  const handleLogout = () => {
    setTriggerCase("LOGOUT");
    if (!hasUnsavedChanges()) {
      callFnsCase("LOGOUT");
    }
  };

  const { role } = userSession;
  return (location.pathname === "/change-password" ||
    location.pathname.includes("/preview-page") ||
    location.pathname.includes("/article-preview") ||
    location.pathname.includes("/vod-preview")) &&
    userSession?.isActive ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  ) : (
    <Box
      sx={{
        width: "100%",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={`${ProfileImageData}`} onClick={handleOpen} />
          {showUserDetails && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component='div' variant='h6medium' ml={2}>
                {capitalizeFirstLetter(userSession?.userInfo?.name)}
              </Typography>

              <Typography component='div' variant='h7medium' ml={2}>
                {t(role)}
              </Typography>
            </Box>
          )}
        </Box>
        <Menu
          anchorEl={anchorE2}
          open={openMenu}
          onClose={handleCloseMenu}
          sx={{
            ".Platform-x-Menu-paper": {
              boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
              borderRadius: "7px",
            },
          }}>
          <MenuItem
            style={{ background: backgroundStyle }}
            disableRipple
            onClick={handleChangePassword}
            onMouseEnter={() => {
              setBackgroundstyle(ThemeConstants.OFF_WHITE_COLOR);
            }}
            onMouseLeave={() => {
              setBackgroundstyle(ThemeConstants.WHITE_COLOR);
            }}
            sx={{
              backgroundColor: ThemeConstants.WHITE_COLOR,
              "&:hover": {
                backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
              },
            }}>
            {t("change_password")}
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={handleLogout}
            sx={{
              backgroundColor: ThemeConstants.WHITE_COLOR,
              "&:hover": {
                backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
              },
            }}>
            {t("logout")}
          </MenuItem>
        </Menu>
      </Box>
      {hasSaveWarning ? (
        <CommonPlateformXDialog
          isDialogOpen={hasSaveWarning}
          title={saveWarnTitle}
          subTitle={saveWarnSubtitle}
          closeButtonText={saveWarnReject}
          confirmButtonText={saveWarnSave}
          confirmButtonHandle={() => callFnsCase(triggerCase)}
          closeButtonHandle={onCloseSaveWarningHandler}
          modalType='unsavedChanges'
        />
      ) : null}
      {/* <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme={'colored'}
        icon={true}
      /> */}
    </Box>
  );
};
