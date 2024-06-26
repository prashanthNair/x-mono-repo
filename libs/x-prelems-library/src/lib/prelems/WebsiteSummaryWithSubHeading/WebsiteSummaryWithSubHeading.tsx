import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import ImageRender from "../../components/ImageRender";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import {
  Analytics,
  AuthoringHelper,
  SecondaryArgs,
  completeButtonUrl,
  formCroppedUrlString,
} from "@platformx/utilities";
import { useCustomStyle } from "./WebsiteSummaryWithSubHeading.style";
import BasicButton from "../../components/BasicButton/BasicButton";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const WebsiteSummaryWithSubHeading = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: WebsiteSummaryWithSubHeadingProps) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const ButtonObj1 = {
    Button_Name: "Button1_Name",
    Button_RedirectURL: "Button1_RedirectURL",
    Button_Type: "Button1_Type",
    Button_Value: "Button1_Value",
    Button_Action: "Button1_Action",
    Button_Content: "Button1_Content",
  };
  const ButtonDataObj1 = {
    Button_Name: content?.Button1_Name,
    Button_RedirectURL: content?.Button1_RedirectURL,
    Button_Type: content?.Button1_Type,
    Button_Value: content?.Button1_Value,
    Button_Action: content?.Button1_Action,
    Button_Content: content?.Button1_Content,
  };
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
  };

  const defaultStructureData = () => {
    let WebsiteSummaryWithSubHeadingStructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrlString(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    ).src;

    try {
      WebsiteSummaryWithSubHeadingStructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Title1,
        image: img,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
        ),
      };
    } catch (e) {
      WebsiteSummaryWithSubHeadingStructureData = {};
    }
    return WebsiteSummaryWithSubHeadingStructureData;
  };
  const genrateStructureData = () => {
    let WebsiteSummaryWithSubHeadingStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        WebsiteSummaryWithSubHeadingStructureData = JSON.parse(tempSD);
      } else {
        WebsiteSummaryWithSubHeadingStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      WebsiteSummaryWithSubHeadingStructureData = defaultStructureData();
    }
    return WebsiteSummaryWithSubHeadingStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Description,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.Title1,
    content?.Title2,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  const firstColumnContent = () => {
    return (
      <Box className='imageWrapper widthheight100'>
        <ImageRender
          originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
          publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
          secondaryArgs={secondaryArgs}
          imgOrder={{
            1440: "landscape",
            1280: "landscape",
            1024: "card2",
            768: "square",
            600: "card1",
            320: "portrait",
          }}
        />
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='secondColumnContentWrapper'>
        <Box className='headingWrapper'>
          <Box className='title'>
            <Typography variant='labelbold' id='Title1'>
              {content.Title1}
            </Typography>
          </Box>
          <Typography variant='h2medium' id='Title2'>
            {content.Title2}
          </Typography>
        </Box>
        <Typography variant='p3regular' id='Description'>
          {content.Description}
        </Typography>
        <BasicButton
          openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
          isAuthoring={analytics?.isAuthoring}
          currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
          variant='primaryButton1'
          analyticsEnabled={analytics?.isAnalyticsEnabled}
          ButtonObj={ButtonObj1}
          isEditing={authoringHelper?.isEditing}
          buttonDataObj={ButtonDataObj1}
          secondaryArgs={secondaryArgs}
          analytics={analytics}
        />
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.websiteSummaryWithSubHeadingWrapper} ${globalClasses.prelemType1} prelem prelemType1 website-summary-with-heading websiteSummaryWithSubHeadingBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Grid container ref={ref}>
          <TwoColumnLayout
            firstColumnContent={firstColumnContent()}
            secondColumnContent={secondColumnContent()}
            gridVal={gridVal}
            customClassName='websiteSummaryWithHeading'
            noGap={true}
            col1Align='start'
            col2Align='start'
          />
        </Grid>
      </Container>
    </div>
  );
};

interface WebsiteSummaryWithSubHeadingProps {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs: SecondaryArgs;
}

interface Content {
  Title1?: string;
  Title2?: string;
  Description?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  TagName?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image?: object;
    };
  };
}
interface Image {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}
WebsiteSummaryWithSubHeading.defaultProps = {
  content: {
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",
    Title1: "Lorem ipsum dolor sit amet",
    Title2: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",

    TagName: "SiteComponents",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690292328116/public/png/WebsiteSummarySubHeading",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "WebsiteSummarySubHeading",
            Name: "WebsiteSummarySubHeading",
            Title: "WebsiteSummarySubHeading",
            Description: "This is for WebsiteSummarySubHeading",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1690292328116/public/png/WebsiteSummarySubHeading-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690292328116/public/png/WebsiteSummarySubHeading-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690292328116/public/png/WebsiteSummarySubHeading-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1690292328116/public/png/WebsiteSummarySubHeading-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690292328116/public/png/WebsiteSummarySubHeading-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690292328116/public/png/WebsiteSummarySubHeading-card2",
          },
        ],
      },
    },
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    isEditPage: false,
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "Website Summary With Sub Heading",
    pageDesc:
      "The Prelem ‘Website Summary With Sub Heading’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags:
      "Website, Introduction, Website Summary With Sub Heading, Image, CTA, Title, Hero Banner",
    prelemTags:
      "Website, Introduction, Website Summary With Sub Heading, Image, CTA, Title, Hero Banner",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default WebsiteSummaryWithSubHeading;
