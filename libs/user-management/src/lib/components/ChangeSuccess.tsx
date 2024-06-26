import React from "react";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { congrats } from "@platformx/utilities";

export const ChangeSuccess = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCancel = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth='xs'
      aria-labelledby='confirmation-dialog-title'
      open={open}
      fullScreen={fullScreen}
      data-testid='change-success-dialog'>
      <DialogContent sx={{ padding: { xs: "20px 14px", md: "20px 24px" } }}>
        <>
          <Box
            sx={{ display: "block", margin: "0 auto" }}
            component='img'
            alt='congrats'
            src={congrats}
          />
          <Typography variant='h3' align='center'>
            Congratulations!
          </Typography>
          <Typography variant='body1' align='center'>
            Your Password has been changed
          </Typography>
        </>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
        }}>
        <Button
          sx={{
            width: "75%",
          }}
          variant='contained'
          data-testid='dashboard-button'
          onClick={handleCancel}>
          Go to Dashboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};
