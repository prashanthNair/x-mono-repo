import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MenuListing } from "./MenuListing";

export default function SelectPageList({
  handleBack,
  setActiveStep,
  handleNext,
  setPageFinalPage,
  setPageName1,
  setIsPageList,
  setPageListOpen,
  editData,
  setUrl,
  currentButton,
  setCurrentButton,
  isDisableDone,
  setisIsDisableDone,
  isedit,
}) {
  const { t } = useTranslation();

  const onClickDone = () => {
    setIsPageList(false);
    handleNext();
    setPageFinalPage(true);
    setPageListOpen(false);
  };
  const onClickCancel = () => {
    setIsPageList(false);
    handleBack();
    setActiveStep(0);
    setPageListOpen(false);
  };
  return (
    <Box
      sx={{
        width: { sm: "100%", xs: "100%", md: "100%", lg: "100%" },
        display: { xs: "none", sm: "block" },
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
        zIndex: 1300,
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "solid 1px #ced3d9",
          padding: "15px",
        }}>
        <Box
          sx={{
            display: "flex",
            width: { sm: "70%", xs: "100%", md: "70%", lg: "75%" },
            justifyContent: { xs: "center", sm: "flex-start" },
            alignItems: "center",
          }}>
          <Typography variant='h4medium'>{t("choose_your_page")}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            variant='secondaryButton'
            disableElevation
            onClick={onClickCancel}
            className='sm'
            sx={{ marginRight: "12px" }}>
            {t("cancel")}
          </Button>

          <Button
            className='sm addnewpage'
            variant='primaryButton'
            disabled={isDisableDone}
            onClick={onClickDone}>
            {t("done")}
          </Button>
        </Box>
      </Box>

      <MenuListing
        setPageName1={setPageName1}
        currentButton={currentButton}
        setCurrentButton={setCurrentButton}
        setisIsDisableDone={setisIsDisableDone}
        setUrl={setUrl}
        editData={editData}
        isedit={isedit}
      />
    </Box>
  );
}
