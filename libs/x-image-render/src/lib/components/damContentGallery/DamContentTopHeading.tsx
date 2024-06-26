import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneIcon from "@mui/icons-material/Done";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Fab, Grid, Grow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MobileMenuIconSvg, SearchBlackSvg, ThemeConstants } from "@platformx/utilities";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DamContentSearchBox from "./DamContentSearchBox";
import "./DamContentTopHeading.css";
import useContentGlleryStyle from "./contentTypeCard/DamContentGllery.style";

const DamContentTopHeading = ({
  loading = false,
  onSearch = () => {},
  setInputValueHandle = () => {},
  assetType,
  toggleGallery,
  handleDoneClick,
  imageData,
  toggleDrawer,
}: any) => {
  const { t } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const classes = useContentGlleryStyle();

  const searchToggle = () => {
    setShowSearch(!showSearch);
  };

  const searchCloseToggle = () => {
    setInputValueHandle("");
    setShowSearch(!showSearch);
  };

  return (
    <Box className='damcontent-topbar' sx={{ background: ThemeConstants.WHITE_COLOR }}>
      {/* {Large view design} */}
      <Grid
        container
        pt={2}
        pb={0}
        pl={4}
        pr={4}
        sx={{
          display: {
            xs: "none",
            em: "flex",
            borderBottom: "1px solid",
            borderColor: ThemeConstants.DIVIDER_COLOR,
          },
        }}>
        <Grid
          item
          xs={12}
          sm={12}
          em={3}
          lg={3}
          sx={{
            margin: "auto 0",
            paddingBottom: { xs: "10px", sm: "10px", lg: "5px" },
          }}>
          <Typography
            variant='h4bold'
            sx={{
              fontSize: ThemeConstants.FONTSIZE_H3,
              fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
              fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
              color: ThemeConstants.BLACK_COLOR,
              padding: "0 0 10px 0px",
              textTransform: "capitalize",
            }}>
            {assetType === "Image" ? t("page_choose_image") : t("video_subtitle")}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={6}
          lg={6}
          sx={{
            paddingTop: "5px",
            paddingBottom: { xs: "20px", sm: "20px", display: "flex" },
          }}>
          <Grid
            item
            xs={12}
            sm={12}
            em={8}
            lg={8}
            sx={{ margin: "0px auto" }}
            className='searchWrapper'>
            <DamContentSearchBox onSearch={onSearch} />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} em={3} lg={3}>
          <Box sx={{ display: "flex", paddingTop: "5px", gap: "10px", justifyContent: "flex-end" }}>
            <Button variant='secondaryButton' onClick={() => toggleGallery(false, "cancel")}>
              {t("cancel")}
            </Button>
            <LoadingButton
              onClick={handleDoneClick}
              loading={loading}
              loadingPosition='start'
              variant='primaryButton'
              disabled={!imageData.bitStreamId}>
              {t("done")}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>

      {/* {small view design} */}
      <Grid
        container
        pt={1}
        pb={1}
        pl={2}
        pr={6}
        sx={{
          display: {
            xs: "flex",
            em: "none",
            borderBottom: "1px solid",
            borderColor: ThemeConstants.DIVIDER_COLOR,
            padding: "16px 16px 4px 16px",
            height: "60px",
          },
        }}>
        <Box
          className='fixed-screen-inner'
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: ThemeConstants.FONTSIZE_H4,
          }}>
          {!showSearch ? (
            <>
              <Grow
                in={!showSearch}
                style={{ transformOrigin: "0 0 0" }}
                {...(!showSearch ? { timeout: 1000 } : {})}>
                <Box>
                  <Grid item sx={{ display: "flex" }}>
                    <Button
                      variant='text'
                      startIcon={<ArrowBackIosNewIcon sx={{ padding: "0px" }} />}
                      sx={{ padding: 0, minWidth: "0px" }}
                      onClick={() => toggleGallery(false, "cancel")}></Button>
                    <Typography variant='h4bold'>
                      {assetType === "Image" ? t("page_choose_image") : t("video_subtitle")}
                    </Typography>
                  </Grid>
                </Box>
              </Grow>

              <Grid item className='icon-container'>
                <Typography
                  className='top-icons right-search-icon'
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_LG,
                  }}
                  onClick={searchToggle}>
                  <img src={SearchBlackSvg} alt='icon' />
                </Typography>

                <Typography
                  className='top-icons'
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_LG,
                  }}
                  onClick={toggleDrawer}>
                  <img src={MobileMenuIconSvg} alt='icon' />
                </Typography>
              </Grid>
            </>
          ) : (
            <Grid item className='search-item-container small-device'>
              <DamContentSearchBox onSearch={onSearch} searchCloseToggle={searchCloseToggle} />
            </Grid>
          )}
        </Box>

        <Box className={classes.leftcontent}>
          <Box sx={{ margin: "0 25px 25px 0" }} onClick={handleDoneClick}>
            <Fab size='large' color='primary' aria-label='add'>
              <DoneIcon style={{ color: "#fff" }} />
            </Fab>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default DamContentTopHeading;
