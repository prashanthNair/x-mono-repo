import { Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  RootState,
  saveSchedulePublishDateTime,
  saveScheduleUnpublishDateTime,
} from "@platformx/authoring-state";
import { addMinutes } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../BackButton/BackButton";
import "./PageSettings.css";

const Schedule = ({ setPageId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state);
  const {
    SchedulePublishDateTime,
    ScheduleUnpublishDateTime,
    IsSchedulePublish,
    IsScheduleUnpublish,
  } = page.pageSettings;
  const initialPublishRender = useRef(true);
  const initialUnpublishRender = useRef(true);
  const initialScheduleAt = SchedulePublishDateTime ? new Date(SchedulePublishDateTime) : null;
  const initialUnscheduleAt = ScheduleUnpublishDateTime
    ? new Date(ScheduleUnpublishDateTime)
    : null;
  const [publishTime, setPublishTime] = useState(initialScheduleAt);
  const [unpublishTime, setunpublishTime] = useState(initialUnscheduleAt);
  const [schedulePagePublish, setSchedulePagePublish] = useState<boolean | null>(IsSchedulePublish);
  const [schedulePageUnpublish, setSchedulePageUnpublish] = useState<boolean | null>(
    IsScheduleUnpublish,
  );

  const handleChange = (newValue) => {
    setPublishTime(newValue);
  };
  const handleUnpublishValChange = (newValue) => {
    setunpublishTime(newValue);
  };
  const handlePublishChange = (event) => {
    setSchedulePagePublish(event.target.checked);
    if (event.target.checked && publishTime == null) {
      setPublishTime(addMinutes(new Date(), 6));
    }
  };
  const handleUnpublishChange = (event) => {
    setSchedulePageUnpublish(event.target.checked);
    if (event.target.checked && unpublishTime == null) {
      setunpublishTime(addMinutes(new Date(), 6));
    }
  };
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (initialPublishRender.current) {
      initialPublishRender.current = false;
    } else {
      dispatch(
        saveSchedulePublishDateTime({
          status: schedulePagePublish,
          time: publishTime?.toISOString(),
        }),
      );
      // if (schedulePagePublish && publishTime != null) {
      //   ShowToastSuccess(`${t("schedule_info_toast")} ${t("saved_toast")}`);
      // }
    }
  }, [publishTime, schedulePagePublish]);
  useEffect(() => {
    if (initialUnpublishRender.current) {
      initialUnpublishRender.current = false;
    } else {
      dispatch(
        saveScheduleUnpublishDateTime({
          status: schedulePageUnpublish,
          time: unpublishTime?.toISOString(),
        }),
      );
      // if (schedulePageUnpublish && unpublishTime != null) {
      //   ShowToastSuccess(`${t("schedule_info_toast")} ${t("saved_toast")}`);
      // }
    }
  }, [unpublishTime, schedulePageUnpublish]);

  return (
    <Box className='pageSettingmainWp'>
      <BackButton setPageId={setPageId} Title={t("page_schedule")} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormGroup>
          <Box className='rowBox'>
            <FormControlLabel
              control={
                <Checkbox checked={schedulePagePublish || false} onChange={handlePublishChange} />
              }
              label={<Typography variant='p4regular'>{t("page_schedule_publish")}</Typography>}
            />
            <DateTimePicker
              disabled={!schedulePagePublish}
              value={publishTime == null ? addMinutes(new Date(), 6) : publishTime}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  size='small'
                  disabled={true}
                  variant='outlined'
                  onKeyDown={handleDateChangeRaw}
                  InputProps={{ readOnly: true }}
                  {...params}
                  placeholder={t("page_schedule_publish_placeholder")}
                />
              )}
            />
          </Box>
          <Box className='rowBox'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={schedulePageUnpublish || false}
                  onChange={handleUnpublishChange}
                />
              }
              label={<Typography variant='p4regular'>{t("page_schedule_unpublish")}</Typography>}
            />
            <DateTimePicker
              value={unpublishTime == null ? addMinutes(new Date(), 6) : unpublishTime}
              disabled={!schedulePageUnpublish}
              onChange={handleUnpublishValChange}
              renderInput={(params) => (
                <TextField
                  size='small'
                  disabled={true}
                  variant='outlined'
                  onKeyDown={handleDateChangeRaw}
                  InputProps={{ readOnly: true }}
                  {...params}
                  placeholder={t("page_schedule_unpublish_placeholder")}
                />
              )}
            />
          </Box>
        </FormGroup>
      </LocalizationProvider>
    </Box>
  );
};
export default Schedule;
