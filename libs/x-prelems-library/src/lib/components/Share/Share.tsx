import { Box, useTheme } from "@mui/material";
import {
  IconCopySvg,
  IconEmbed,
  IconFacebookSvg,
  IconLinkedInSvg,
  nullToObject,
} from "@platformx/utilities";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import { errorRequest, linkCopy } from "../ConstantData";
import EmbedDialog from "../EmbededModal/EmbededModal";
import ToastContainerHandle from "../ToastContainer/ToastContainerHandle";
import ToastService from "../ToastContainer/ToastService";

type Sharetype = {
  shareUrl?: string;
  embedData?: any;
  domainUrl?: string;
  border?: string;
  whiteIcon?: boolean;
  enablePreview?: boolean;
  showRecentArticles?: boolean;
};

const Share = (props: Sharetype) => {
  const theme = useTheme();
  const { shareUrl = "", domainUrl = "", enablePreview, showRecentArticles } = nullToObject(props);
  // const ShareCount = (shareCount: any) => <span className='myShareCountWrapper'>{shareCount}</span>;
  /**
   * back ground color will change based on their own brand based
   * @param bgColor string default black
   * @returns object
   */
  const imgCommon = () => {
    if (props.whiteIcon) {
      const styleImg = {
        filter: "brightness(0) invert(1)",
      };
      return styleImg;
    }
  };
  const styleCommon = (bgColor = "#2d2d39") => {
    const boxStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "33px !important",
      width: "33px !important",
      borderRadius: "3px",
      cursor: "pointer",
      marginRight: "12px",
      background: !props.whiteIcon ? theme.palette.textColor : " ",
      "&:hover": {
        img: {
          filter: "brightness(0) invert(1)",
        },
        background: bgColor,
      },
      border: props.border,
    };
    return boxStyle;
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: !enablePreview ? "pointer" : "default",
  };

  const disabledButtonStyle = {
    opacity: 1,
  };
  /**
   * copy url
   */
  const { t } = useTranslation();

  const copyClipBoardData = async () => {
    if ("clipboard" in navigator && domainUrl) {
      await navigator.clipboard.writeText(domainUrl);
      ToastService.SuccessToast(t(linkCopy));
    } else {
      ToastService.failToast(t(errorRequest));
    }
  };

  const onShareWindowClose = () => {};
  const [openEmbedModal, setOpenEmbedModal] = useState(false);
  const emptyToastHandle = (shareUrlData = "") => {
    if (!shareUrlData) {
      ToastService.failToast(t(errorRequest));
    }
  };

  const handleEmbed = () => {
    setOpenEmbedModal(true);
  };
  const closeEmbedButtonHandle = () => {
    setOpenEmbedModal(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: { xs: "flex-start", md: "end" },
        // alignItems: "center",
        mt: "5px",
      }}>
      <ToastContainerHandle />

      <FacebookShareButton
        disabled={enablePreview}
        onClick={() => !enablePreview && emptyToastHandle(shareUrl)}
        onShareWindowClose={onShareWindowClose}
        url={shareUrl}
        style={buttonStyle}
        disabledStyle={disabledButtonStyle}>
        <Box
          sx={{
            ...styleCommon("#1078f0"),
            cursor: !enablePreview ? "pointer" : "default",
          }}
          onClick={() => !enablePreview && emptyToastHandle(shareUrl)}>
          <img
            alt='share1'
            width={15}
            height={15}
            src={IconFacebookSvg}
            style={{ ...imgCommon() }}
          />
          {/* {(shareCount: any) => <span className='myShareCountWrapper'>{shareCount}</span>} */}
          {/* <ShareCount /> */}
        </Box>
      </FacebookShareButton>

      {/* <TwitterShareButton url={shareUrl} style={buttonStyle}>
        <Box sx={{ ...styleCommon('#229af1') }}>
          <img alt="share2" src={Twitter} />
        </Box>
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} style={buttonStyle}>
        <Box sx={{ ...styleCommon('#61db77') }}>
          <img alt="share3" src={Whatsapp} />
        </Box>
      </WhatsappShareButton> */}

      <LinkedinShareButton
        disabled={enablePreview}
        onShareWindowClose={onShareWindowClose}
        url={shareUrl}
        style={buttonStyle}
        disabledStyle={disabledButtonStyle}>
        <Box
          sx={{
            ...styleCommon("#2d67b3"),
            cursor: !enablePreview ? "pointer" : "default",
          }}
          onClick={() => !enablePreview && emptyToastHandle(shareUrl)}>
          <img
            alt='share4'
            width={15}
            height={15}
            src={IconLinkedInSvg}
            style={{ ...imgCommon() }}
          />
        </Box>
      </LinkedinShareButton>

      <Box
        sx={{
          ...styleCommon("#229af1"),
          cursor: !enablePreview ? "pointer" : "default",
        }}
        onClick={() => !enablePreview && copyClipBoardData()}>
        <img alt='share5' width={15} height={15} src={IconCopySvg} style={{ ...imgCommon() }} />
      </Box>

      {showRecentArticles && (
        <Box
          sx={{
            ...styleCommon("#2d2d39"),
            cursor: !enablePreview ? "pointer" : "default",
            marginRight: 0,
          }}
          onClick={() => {
            !enablePreview && handleEmbed();
          }}>
          <img alt='share6' width={15} height={15} src={IconEmbed} style={{ ...imgCommon() }} />
        </Box>
      )}
      {openEmbedModal ? (
        <EmbedDialog
          isDialogOpen={openEmbedModal}
          closeEmbedButtonHandle={closeEmbedButtonHandle}
          setSelectedItem={props?.embedData}
        />
      ) : null}
    </Box>
  );
};

export default React.memo(Share);
