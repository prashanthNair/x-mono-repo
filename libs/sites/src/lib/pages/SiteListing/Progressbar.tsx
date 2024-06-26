import LinearProgress from "@mui/material/LinearProgress";
import { Box, styled } from "@mui/system";

const BlueLinearProgress = styled(LinearProgress)({
  "& .Platform-x-LinearProgress-barColorPrimary": { backgroundColor: "#4B9EF9" },
});
export const Progressbar = (props) => {
  const { progress } = props;
  return (
    <Box>
      <BlueLinearProgress
        sx={{ maxWidth: "510px", backgroundColor: "#EFF0F6" }}
        variant='determinate'
        value={progress}
      />
    </Box>
  );
};
