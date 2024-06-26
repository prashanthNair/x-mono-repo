/* eslint-disable default-param-last */
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { CircularProgress, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { Loader, ShowToastError, ShowToastSuccess, nullToObject } from "@platformx/utilities";
import { ImageCrop, ShowCaseCrops, usePostImageCrop } from "@platformx/x-image-render";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PictureComponent from "./Components/PictureComponent";
import { ratios } from "./Utils/Constants";

const ArticleImageRender = (props: any = {}) => {
  const { postRequest } = usePostImageCrop();
  const {
    content = {}, //image from dspace
    imgOrder = {
      1440: "hero",
      1280: "hero",
      1024: "portrait",
      768: "portrait",
      600: "square",
      320: "square",
    }, //breakpoints with ratios
    updateField, //function to update original image and published images
    originalImage, //we are saving image, bitstreamid and auto(boolean) in original image for edit
    publishedImages, //all the cropped images(manual, auto)
    operationType = "choose", //dspace operation type
    // resetSelectedImage,
    isArticleCrop,
    isCropLoading = false,
    isUploadArticle,
    count,
  } = nullToObject(props);
  const { Thumbnail, bitStreamId } = content || {};
  const [processing, setProcessing] = useState(false);
  const [imageExtension, setImageExtension] = useState("");
  const [autoCropDone, setAutoCropDone] = useState(false);
  const [manualCropDone, setManualCropDone] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [autoCroppedImages, setAutoCroppedImages] = useState([]);
  const [manualCropShow, setManualCropShow] = useState(false);
  const [showCropPreview, setShowCropPreview] = useState(false);
  const [manualCroppedImages, setManualCroppedImages] = useState([]);
  const { t } = useTranslation();

  const autoCropCallBack = (data) => {
    if (data) {
      const {
        images = [],
        ext,
        original_image_relative_path = "",
        visibility = "",
      } = nullToObject(data);
      if (images?.length > 0) {
        setAutoCroppedImages(images);
        setImageExtension(ext);
        setAutoCropDone(true);
        setProcessing(false);
        setManualCropDone(false);
        if (isUploadArticle) {
          count.current++;
          count.current === 1 && ShowToastSuccess(`${t("auto_cropped_successfully")}`);
        } else {
          ShowToastSuccess(`${t("auto_cropped_successfully")}`);
        }
        updateField({
          Banner: Thumbnail,
          published_images: images,
          original_image: {
            original_image_relative_path,
            bitStreamId,
            auto: true,
            ext: ext,
            visibility,
            Thumbnail,
          },
        });
      } else {
        ShowToastError(`${t("auto_cropping_failed")}`);
        setProcessing(false);
      }
    }
  };

  const autoCrop = async () => {
    setProcessing(true);
    const payload = {
      url: Thumbnail,
      bitstreamId: bitStreamId,
      visibility: "public",
    };
    await postRequest("api/v1/assets/image/auto-crop", payload, autoCropCallBack, "");
  };

  const handleEdit = () => {
    setShowCropPreview(false);
    setManualCropShow(true);
  };

  const changeCrop = () => {
    setShowCropPreview(true);
  };
  useEffect(() => {
    if (isArticleCrop) {
      changeCrop();
    }
  }, [isArticleCrop]);

  const backTo = () => {
    if (manualCropShow) setManualCropShow(false);
    if (showCropPreview) setShowCropPreview(false);
  };

  const doneCropCompleted = (
    cropImages = [],
    ext,
    original_image_relative_path,
    visibility,
    bitstream_id = "",
    img: any = {},
  ) => {
    if (cropImages.length > 0) {
      setAutoCropDone(false);
      setManualCropDone(true);
      setManualCroppedImages(cropImages);
      updateField({
        published_images: cropImages,
        original_image: {
          original_image_relative_path,
          bitStreamId: bitstream_id,
          auto: true,
          ext: ext,
          visibility,
          Thumbnail: img?.Thumbnail,
        },
      });
    }
    setManualCropShow(false);
  };

  useEffect(() => {
    if (publishedImages && publishedImages.length > 0 && operationType !== "replace") {
      const { auto, ext } = originalImage || {};
      setImageExtension(ext);
      setSelectedContent(originalImage);
      if (auto) {
        setAutoCropDone(true);
        setManualCropDone(false);
        setAutoCroppedImages(publishedImages);
      } else {
        setManualCropDone(true);
        setAutoCropDone(false);
        setManualCroppedImages(publishedImages);
      }
    } else {
      if (bitStreamId) {
        setSelectedContent({});
        if (Thumbnail && originalImage?.original_image_relative_path !== Thumbnail) {
          autoCrop();
        }
      }
    }
  }, [content]);

  const RoundBox = styled("div")({
    position: "absolute",
    right: "20px",
    top: "20px",
    width: "40px",
    height: "40px",
    background: "#fff",
    zIndex: "9",
    borderRadius: "4px",
    boxShadow: "0 10px 25px 0 rgba(0, 0, 0, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });

  return (
    <>
      {processing && !isCropLoading ? (
        <RoundBox>
          <CircularProgress size='22px' color='inherit' />
        </RoundBox>
      ) : (
        processing && isCropLoading && <Loader />
      )}
      {!isCropLoading && (autoCropDone || manualCropDone) && bitStreamId && (
        <RoundBox onClick={changeCrop}>
          <ViewQuiltIcon
            sx={{
              fontSize: { md: "22px" },
            }}
          />
        </RoundBox>
      )}
      {manualCropDone && manualCroppedImages.length > 0 ? (
        <PictureComponent
          croppedImages={manualCroppedImages}
          imgOrder={imgOrder}
          extension={imageExtension}
        />
      ) : autoCropDone && autoCroppedImages.length > 0 ? (
        <PictureComponent
          croppedImages={autoCroppedImages}
          imgOrder={imgOrder}
          extension={imageExtension}
        />
      ) : Thumbnail && Thumbnail.search("dspace") !== -1 ? (
        <Paper
          sx={{
            aspectRatio: {
              xs: ratios[imgOrder["320"]],
              sm: ratios[imgOrder["600"]],
              md: ratios[imgOrder["768"]],
              em: ratios[imgOrder["1024"]],
              lg: ratios[imgOrder["1280"]],
              xl: ratios[imgOrder["1440"]],
            },
            height: "inherit",
          }}>
          {" "}
          <img
            src={Thumbnail}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt='img'
          />
        </Paper>
      ) : null}
      {manualCropShow && (
        <ImageCrop
          open={manualCropShow}
          backTo={backTo}
          doneCropCompleted={doneCropCompleted}
          originalImage={Object.keys(selectedContent).length !== 0 ? selectedContent : content}
        />
      )}
      {showCropPreview && (
        <ShowCaseCrops
          open={showCropPreview}
          backTo={backTo}
          handleEdit={handleEdit}
          data={{
            published_images: manualCropDone ? manualCroppedImages : autoCroppedImages,
            original_image: { ext: imageExtension },
          }}
        />
      )}
    </>
  );
};

export default React.memo(ArticleImageRender);
