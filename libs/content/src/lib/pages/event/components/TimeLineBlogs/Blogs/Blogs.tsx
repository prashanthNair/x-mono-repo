import { makeStyles } from "@mui/styles";
import { TextareaAutosize } from "@mui/base";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import { Box, Card, Dialog, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useRef, useState } from "react";
import ReactDomServer from "react-dom/server";
import {
  Loader,
  ThemeConstants,
  convertToLowerCase,
  formCroppedUrlInCrop,
  AUTH_INFO as authInfo,
  TextBoxWithBorder as TextBoxWidthBorder,
  TextBoxWithoutBorder,
} from "@platformx/utilities";
import { DamContentGallery } from "@platformx/x-image-render";
import { blockQuotes } from "../blogCss";
import BlogContentEdit from "./BlogContentEdit";
import BlogContentTypeMobile from "./BlogContentType/BlogContentTypeMobile";
import BlogContentTypeWeb from "./BlogContentType/BlogContentTypeWeb";
import "./Blogs.css";
import ContentTypeCard from "./ContentTypeCard";
import { ContentGallery } from "@platformx/site-page";
import { defaultFallBackImage } from "../Utils/helperBlogs";
import { useTranslation } from "react-i18next";

const bQuotes = blockQuotes();
const useStyles = makeStyles({
  buttonArea: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    border: `1px solid #ced3d9`,
    borderRadius: 2,
    backgroundColor: "#fff ",
    height: "42px",
    "& .MuiButtonBase-root ": {
      borderRadius: "0px !important",
      width: "40px ",
      fontSize: "18px",
      height: "40px ",
      "& .Platform-x-SvgIcon-root ": {
        fontSize: "18px",
      },
      "&:hover, &.Mui-focusVisible ": {
        backgroundColor: "#f5f6f8 ",
        color: "#2d2d39 ",
        borderRadius: "0px !important ",
      },

      ":disabled ": { color: "#5c6574 !important " },
    },
  },
  button: {
    border: "1px solid #89909a !important",
    color: "#89909a !important ",
    height: "40px !important ",
    "&:hover, &.Mui-focusVisible ": { backgroundColor: "#ced3d9 " },
  },
  saveDisabled: {
    border: "1px solid #89909a !important",
    color: "#89909a !important ",
    height: "40px !important ",
    fontSize: `${ThemeConstants.FONTSIZE_H6}!important`,
  },
  publishDisabled: {
    border: "1px solid #ced3d9 !important",
    backgroundColor: "#ced3d9 !important",
    color: "#89909a !important ",
    height: "40px !important ",
    fontSize: `${ThemeConstants.FONTSIZE_H6}!important`,
  },
  publishActive: {
    backgroundColor: "#2D2D39 !important",
    color: "#fff",
    height: "40px !important ",
    padding: "8px 15px",
    minWidth: "110px",
    "&:hover": {
      color: "#fff",
    },
  },
  saveActive: {
    color: "#2D2D39 !important",
    border: "1px solid #2D2D39 !important",
    height: "40px !important ",
    padding: "8px 15px",
    minWidth: "110px",
    "&:hover": {
      color: "#fff !important",
    },
  },
});

const Blogs = ({
  contentItem = {},
  onRemoveContentType = () => {},
  selectedVideo = {},
  selectedImage = {},
  starClickHandel = () => {},
  quoteClickHandel = () => {},
  handleBlogChange,
  blogData,
  saveButtonHandle = () => {},
  savePublishHandle = () => {},
  isBlogLoad,
  // eslint-disable-next-line no-unused-vars
  setImageOrVideoToDefault,
  handleSelectedImage,
  handleSelectedVideo,
  setBlogData,
  isCodeOpen,
  isQuoteOpen,
  isStarOpen,
  publishButton,
  // eslint-disable-next-line no-unused-vars
  embeddURLValue,
  onRemoveImage = () => {},
  onRemoveVideo = () => {},
  handleContentType = (e) => e,
}) => {
  const classes = useStyles();

  const [isCode, setIsCode] = useState(false);

  const desc = useRef<any>("");
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>("Images");
  const [contentGalleryState, setContentGalleryState] = useState<boolean>(false);
  const contentType = useRef<string[]>();
  const contentTypes: string[] = ["Quiz", "Poll", "Article", "Vod"];
  const secondaryArgs = {
    gcpUrl: authInfo.gcpUri,
    bucketName: authInfo.gcpBucketName,
  };
  const { t } = useTranslation();
  const toggleGallery = (toggleState) => {
    setGalleryState(toggleState);
  };

  const showGallery = (gType) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;

    switch (convertToLowerCase(gType)) {
      case "videos":
        setGalleryState(true);
        break;
      case "images":
        setGalleryState(true);
        break;
      case "content":
        contentType.current = contentTypes;
        setContentGalleryState(true);
        break;
      default:
        break;
    }
    galleryType.current = gType;
  };

  const handleDescriptionChange = () => {
    setBlogData({
      ...blogData,
      BlogTextArea: desc.current.innerHTML,
    });
  };

  const codeClickHandel = () => {
    setIsCode(!isCode);
  };

  const handleSelectedContent = (item) => {
    const newObj = {
      ...item,
      Thumbnail: {
        ...item?.Thumbnail,
        Url: item?.Thumbnail?.Url
          ? formCroppedUrlInCrop(item?.Thumbnail?.Url, item?.Thumbnail?.ext)
          : defaultFallBackImage(),
      },
    };

    const contentAdded = ReactDomServer.renderToString(
      <Box className='contentTypeBox'>
        <ContentTypeCard content={newObj} secondaryArgs={secondaryArgs}></ContentTypeCard>
      </Box>,
    );
    setContentGalleryState(!contentGalleryState);
    handleContentType({
      contentItem: newObj,
      contentHtml: contentAdded,
    });
  };

  const onToggleContentGallery = () => {
    setContentGalleryState(!contentGalleryState);
  };

  const handlePlaceholder = (e) => {
    const ele = document.getElementById("desc");
    // Get the placeholder attribute
    const placeholder = ele?.getAttribute("data-placeholder");
    // Set the placeholder as initial content if it's empty
    if (ele?.innerHTML === "") {
      ele.innerHTML = placeholder || "";
    }
    const value = e.target.innerHTML;
    if (value === placeholder) {
      e.target.innerHTML = "";
    }
  };

  const handleDateChangeRaw = (event: any) => {
    event.preventDefault();
  };

  const handleBlogTimeStamp = (newValue: any) => {
    setBlogData({ ...blogData, BlogTimeStamp: newValue?.toISOString() });
  };

  useEffect(() => {
    const dataHolder = document.getElementById("desc");
    dataHolder?.addEventListener("focus", handlePlaceholder);
    return () => {
      dataHolder?.removeEventListener("focus", handlePlaceholder);
    };
  }, []);

  useEffect(() => {
    if (isCodeOpen) {
      codeClickHandel();
    }
  }, [isCodeOpen]);

  return (
    <Box className='blogContainer'>
      <style>{bQuotes}</style>
      <Box className='contentArea' sx={{ margin: { lg: "0 16px 0px", xs: "0" } }}>
        {/* gallery dialog */}
        {/* <Dialog fullScreen open={galleryState}>
          {/* <Gallery
              toggleGallery={toggleGallery}
              galleryMode={galleryType.current}
              handleImageSelected={handleSelectedImage}
              handleVideoSelected={handleSelectedVideo}
            /> */}
        {galleryState && (
          <DamContentGallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            assetType={galleryType.current === "Images" ? "Image" : "Video"}
            handleSelectedVideo={handleSelectedVideo}
            dialogOpen={galleryState}
          />
        )}
        {/* </Dialog> */}

        {/* content dialog */}
        <Dialog fullScreen open={contentGalleryState}>
          <ContentGallery
            handleSelectedContent={handleSelectedContent}
            onToggleContentGallery={onToggleContentGallery}
            contentType={contentType.current}
          />
        </Dialog>

        {/* content type attachment mobile view */}
        <BlogContentTypeMobile
          contentItem={contentItem}
          isQuoteOpen={isQuoteOpen}
          showGallery={showGallery}
          onRemoveImage={onRemoveImage}
          onRemoveVideo={onRemoveVideo}
          selectedVideo={selectedVideo}
          selectedImage={selectedImage}
          starClickHandel={starClickHandel}
          codeClickHandel={codeClickHandel}
          quoteClickHandel={quoteClickHandel}
          onRemoveContentType={onRemoveContentType}
        />

        <Card
          className='editor'
          sx={{
            margin: { xs: "15px -24px 0 -24px", lg: "0" },
            borderRadius: { xs: "0" },
          }}>
          {isBlogLoad ? (
            <Loader />
          ) : (
            <>
              {!isQuoteOpen ? (
                <TextBoxWithoutBorder
                  name='BlogTitle'
                  placeHolder={t("blog_title")}
                  handleChange={handleBlogChange}
                  maxCharLength={60}
                  state={blogData?.BlogTitle}
                />
              ) : null}

              <BlogContentEdit
                desc={desc}
                blogData={blogData}
                maxCharLength={1000}
                handleDescriptionChange={handleDescriptionChange}
              />
            </>
          )}

          {/* <Box dangerouslySetInnerHTML={{__html: addContentTypes}}></Box> */}
        </Card>
        <Box className='attachments'>
          {isStarOpen ? (
            <Box
              className='KeyHighlighterArea'
              sx={{
                display: "flex ",
                flexDirection: { xs: "column", lg: "row" },
              }}>
              <Box sx={{ flexGrow: 1, mr: { lg: 2, xs: "0" } }}>
                <Typography variant='h6semibold' component='h6' sx={{ mt: 2, mb: 1 }}>
                  {t("key_highlighter")}
                </Typography>
                <TextBoxWidthBorder
                  name='BlogKeyHighlighter'
                  placeHolder={t("highlighter_place_holder")}
                  handleChange={handleBlogChange}
                  maxCharLength={30}
                  state={blogData?.BlogKeyHighlighter}
                />
              </Box>
              <Box>
                <Typography variant='h6semibold' component='h6' sx={{ mt: 2, mb: 1 }}>
                  {t("time_stamp")}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    disabled={false}
                    inputFormat='MM/DD/YYYY | HH:mm'
                    value={blogData?.BlogTimeStamp ? blogData?.BlogTimeStamp : null}
                    disablePast={false}
                    onChange={handleBlogTimeStamp}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          padding: "0px !important",
                        }}
                        className='inputBase withBorder'
                        InputProps={{ readOnly: true }}
                        onKeyDown={handleDateChangeRaw}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          ) : null}

          {isQuoteOpen ? (
            <>
              <Typography variant='h6semibold' component='h6' sx={{ mt: 2, mb: 1 }}>
                {`${t("author")} ${t("name")}`}
              </Typography>
              <TextBoxWidthBorder
                name='BlogAuthorName'
                placeHolder={t("author_place_holder")}
                handleChange={handleBlogChange}
                maxCharLength={30}
                state={blogData?.BlogAuthorName}
              />
            </>
          ) : null}

          {isCode ? (
            <>
              <Typography variant='h6semibold' component='h6' sx={{ mt: 2, mb: 1 }}>
                {t("embed")}
              </Typography>
              <TextareaAutosize
                name='BlogEmbed'
                className='textArea withBorder'
                placeholder={t("embed_place_holder")}
                value={blogData?.BlogEmbed}
                style={{
                  fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
                  height: "120px",
                }}
                maxLength={3000}
                onChange={(e) => handleBlogChange(e)}
              />
            </>
          ) : null}
        </Box>

        <Box className='footer' sx={{ display: "flex " }}>
          {/*  content type attachment web view */}
          <BlogContentTypeWeb
            isCode={isCode}
            isStar={isStarOpen}
            contentItem={contentItem}
            isQuoteOpen={isQuoteOpen}
            showGallery={showGallery}
            onRemoveImage={onRemoveImage}
            onRemoveVideo={onRemoveVideo}
            selectedImage={selectedImage}
            selectedVideo={selectedVideo}
            starClickHandel={starClickHandel}
            codeClickHandel={codeClickHandel}
            quoteClickHandel={quoteClickHandel}
            onRemoveContentType={onRemoveContentType}
          />

          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", lg: "unset" },
              justifyContent: { md: "center" },
            }}>
            <Button
              variant='secondaryButton'
              disabled={blogData?.BlogTitle || blogData.BlogTextArea ? false : true}
              sx={{
                mr: 2,
                minWidth: "110px",
                width: { xs: "50%", md: "unset" },
                "@media (width:1280px)": {
                  marginRight: "8px",
                },
              }}
              className={
                blogData?.BlogTitle || blogData.BlogTextArea
                  ? `${classes.saveActive} sm`
                  : `${classes.saveDisabled} sm`
              }
              startIcon={<SaveIcon />}
              onClick={saveButtonHandle}>
              {t("save")}
            </Button>

            <Button
              disabled={
                (blogData?.BlogTitle || blogData.BlogTextArea ? false : true) || publishButton
              }
              variant='primaryButton'
              sx={{ minWidth: "110px", width: { xs: "50%", md: "unset" } }}
              className={
                blogData?.BlogTitle || blogData.BlogTextArea || publishButton
                  ? `${classes.publishActive} sm`
                  : `${classes.publishDisabled} sm`
              }
              startIcon={<SendIcon className='rotateIcon45' />}
              onClick={savePublishHandle}>
              {t("publish")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Blogs;
