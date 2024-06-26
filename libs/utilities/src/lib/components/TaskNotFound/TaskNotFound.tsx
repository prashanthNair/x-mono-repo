import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TaskNotFoundIcon from "../../assets/svg/taskNotFoundIcon.svg";
import { useCustomStyle } from "./TaskNotFound.style";

const TaskNotFound = () => {
  const classes = useCustomStyle();
  const { t } = useTranslation();
  return (
    <Box className={`${classes.taskNotFoundWp} taskNotFoundWp`}>
      <Box className='contentWpBox'>
        <Box className='imgboxWp'>
          <img src={TaskNotFoundIcon} alt='Task Not Found' />
        </Box>
        <Box className={classes.typo}>
          <Typography variant='p2regular'>{t("task_not_found")}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskNotFound;
