import { Box, Button, Typography } from "@mui/material";
import { RootState, updateAnalyticsEnable, updateContentForCard } from "@platformx/authoring-state";
import {
  BasicSwitch,
  ShowToastSuccess,
  ThemeConstants,
  usePlatformAnalytics,
} from "@platformx/utilities";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../BackButton/BackButton";
import { AnalyticsInfo } from "../utils/editTypes";
import "./PageSettings.css";

const Analytics = ({ setPageId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state);
  const { AnalyticsEnable } = page.pageModel;
  const initialAnalytics = useRef<AnalyticsInfo>({ PageAnalytics: false });
  const [analyticsInfo, setAnalyticsInfo] = useState<AnalyticsInfo>(initialAnalytics.current);

  useEffect(() => {
    initialAnalytics.current = {
      PageAnalytics: AnalyticsEnable === undefined ? false : AnalyticsEnable,
    };
    setAnalyticsInfo(initialAnalytics.current);
  }, [page.pageModel]);
  // Function to handle switch changes
  const handleControlsChange = (event, fieldType) => {
    setAnalyticsInfo({ ...analyticsInfo, [fieldType]: event.target.checked });
  };
  // Function to close toast notification
  const [handleImpression] = usePlatformAnalytics();
  //save analytics info
  const saveAnalytics = () => {
    dispatch(updateAnalyticsEnable({ AnalyticsEnabled: analyticsInfo.PageAnalytics }));
    page?.prelemMetaArray?.map((item, index) => {
      dispatch(
        updateContentForCard({
          selectedPrelemIndex: index,
          sectionToUpdate: "AnalyticsEnabled",
          data: analyticsInfo.PageAnalytics,
          index: undefined,
        }),
      );
    });
    const pageDataObj = {
      eventType: "Analytics PageSetting Saved",
      AnalyticsSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
    ShowToastSuccess(`${t("analytics_info_toast")} ${t("saved_toast")}`);
  };
  return (
    <Box className='pageSettingmainWp'>
      <Box className='rowBox'>
        <BackButton setPageId={setPageId} Title={t("page_analytics")} />
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t("page_view_analytics")}
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            onChange={(e: any) => handleControlsChange(e, "PageAnalytics")}
            checked={analyticsInfo.PageAnalytics}
          />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={initialAnalytics.current === analyticsInfo}
          sx={{ width: "100%" }}
          onClick={saveAnalytics}>
          {t("done")}
        </Button>
      </Box>
    </Box>
  );
};
export default Analytics;
