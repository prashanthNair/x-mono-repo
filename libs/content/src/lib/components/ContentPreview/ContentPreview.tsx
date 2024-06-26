/* eslint-disable @typescript-eslint/no-unused-vars */
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import weakMemoize from "@emotion/weak-memoize";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import TabletAndroidRoundedIcon from "@mui/icons-material/TabletAndroidRounded";
import { Box, Divider, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RootState } from "@platformx/authoring-state";
import { AUTH_INFO, PrelemTheme, ThemeConstants } from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Mapping } from "../../utils/Mapper";

const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module[Mapping[item]],
    })),
  );
  return mappingDynamicInstance;
});

const tabs = [
  { type: "desktop", icon: ComputerRoundedIcon },
  { type: "tablet", icon: TabletAndroidRoundedIcon },
  { type: "mobile", icon: PhoneAndroidRoundedIcon },
];

const ContentPreview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const iframeRef = React.useRef<any>();
  const [deviceType, setDeviceType] = useState("desktop");
  const [initialContent, setInitialContent] = useState(`<!DOCTYPE html><html><head>
    <style>
      body {
        overflow-x: hidden;
      }
    </style></head><body><div id="site-root"></div></body></html>`);
  const { currentContent } = useSelector((state: RootState) => state.content);

  const memoizedCreateCacheWithContainer = weakMemoize((container: any) => {
    const newCache = createCache({ container, key: "css", prepend: true });
    return newCache;
  });
  const [height, setHeight] = useState(300);
  const [previewObject, setPreviewObject] = useState({
    options_compound_fields: "",
    contentType: "",
  });

  const handleReturn = () => {
    window.history.back();
  };
  const handleResize = (iframe: any) => {
    if (iframe?.current?.contentDocument?.body?.scrollHeight > 100) {
      // setHeight(window.parent.innerHeight);
    }
  };
  useEffect(() => {
    if (Object.keys(currentContent).length > 0) {
      setPreviewObject(currentContent);
    } else {
      window.history.back();
    }
  }, [currentContent]);

  useEffect(() => {
    const headContent = document.head.innerHTML;
    setInitialContent(`<!DOCTYPE html><html><head>
      ${headContent}
        <style>
          body {
            overflow-x: hidden;
          }
        </style></head><body><div id="site-root"></div></body></html>`);
  }, []);
  // const ThemeConstant = ThemeConstantForPrelemThemeBasedOnSite();
  const prelemAuthoringHelper = {
    isAuthoring: true,
  };
  const secondaryArgs = {
    gcpUrl: AUTH_INFO.gcpUri,
    bucketName: AUTH_INFO.gcpBucketName,
  };
  const ContentType = mappingDynamicInstance[currentContent?.contentType];

  return (
    <>
      <Box
        sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
        onClick={handleReturn}>
        <ArrowBackIosIcon
          sx={{
            fontSize: ThemeConstants.FONTSIZE_H6,
            margin: "18px 4px 18px 16px",
          }}
        />
        <Typography variant='h3medium'>{t("resend_text_left_button")}</Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}>
        <Box pl={2} onClick={() => navigate(-1)} sx={{ cursor: "pointer" }}>
          <ArrowBackIcon />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ced3d9",
            borderRadius: "24px",
          }}>
          {tabs.map((tab, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                backgroundColor:
                  deviceType === tab.type
                    ? ThemeConstants.PRIMARY_MAIN_COLOR
                    : ThemeConstants.WHITE_COLOR,
                transition: "all 0.50s",
                padding: "12px 27px",
                borderRadius: "24px",
                cursor: deviceType === tab.type ? "pointer" : "default",
              }}
              onClick={() => {
                setDeviceType(tab.type);
              }}>
              <tab.icon
                sx={{
                  fontSize: ThemeConstants.FONTSIZE_H2,
                  color:
                    deviceType === tab.type
                      ? ThemeConstants.WHITE_COLOR
                      : ThemeConstants.PRIMARY_MAIN_COLOR,
                  cursor: "pointer",
                }}
              />
            </Box>
          ))}
        </Box>
        <Box>{}</Box>
      </Box>
      <Divider sx={{ mb: { sm: "31px" } }} />
      <Box>
        <Box
          sx={{
            border: "1px solid #ced3d9",
            borderRadius: "45px",
            padding: "20px",
            width: {
              sm: deviceType === "desktop" ? "100%" : deviceType === "tablet" ? "100%" : "402px",
              md: deviceType === "desktop" ? "100%" : deviceType === "tablet" ? "768px" : "402px",
              lg: deviceType === "desktop" ? "1092px" : deviceType === "tablet" ? "909px" : "402px",
            },
            margin: "auto",
            transition: "width 0.50s",
          }}>
          <Box
            sx={{
              border: "1px solid #ced3d9",
              borderRadius: "30px",
              overflow: "hidden",
            }}>
            <Frame
              width={deviceType === "desktop" ? "100%" : deviceType === "tablet" ? "100%" : "100%"}
              height={window?.parent?.innerHeight}
              initialContent={initialContent}
              id='site-root'
              ref={iframeRef}
              contentDidMount={() => handleResize(iframeRef)}
              contentDidUpdate={() => handleResize(iframeRef)}
              frameBorder='0'>
              <FrameContextConsumer>
                {({ document }: any) => {
                  return (
                    <CacheProvider value={memoizedCreateCacheWithContainer(document.head)}>
                      <ThemeProvider theme={PrelemTheme}>
                        <ContentType
                          showRecentArticles={false}
                          content={previewObject}
                          showLoading={false}
                          results={previewObject.options_compound_fields}
                          enablePreview
                          authoringHelper={prelemAuthoringHelper}
                          secondaryArgs={secondaryArgs}
                        />
                      </ThemeProvider>
                    </CacheProvider>
                  );
                }}
              </FrameContextConsumer>
            </Frame>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ContentPreview;
