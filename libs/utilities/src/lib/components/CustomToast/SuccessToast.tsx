import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SuccessToast = ({ title = "title", description = "description" }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
      <Box>
        <CheckCircleOutlineIcon style={{ color: "#0FA069", marginRight: 2 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginLeft: "10px",
        }}>
        <Typography variant='h7bold' sx={{ color: "#0FA069" }}>
          {t(title)}
        </Typography>
        <Typography variant='h7regular' sx={{ color: "black", fontWeight: 400 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
export default SuccessToast;
