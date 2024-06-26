import { Box, Container, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useCustomStyle } from "./ParagraphWithHeadline.style";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import prelemTypes from "../../globalStyle";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import { Analytics, AuthoringHelper, SecondaryArgs } from "@platformx/utilities";

const ParagraphWithHeadline = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ParagraphWithHeadlineProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let ParagraphWithHeadlineStructureData;
    try {
      ParagraphWithHeadlineStructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Title,
        description: content?.Description,
      };
    } catch (e) {
      ParagraphWithHeadlineStructureData = {};
    }
    return ParagraphWithHeadlineStructureData;
  };

  const genrateStructureData = () => {
    let ParagraphWithHeadlineStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ParagraphWithHeadlineStructureData = JSON.parse(tempSD);
      } else {
        ParagraphWithHeadlineStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ParagraphWithHeadlineStructureData = defaultStructureData();
    }
    return ParagraphWithHeadlineStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Description]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  const firstColumnContent = () => {
    return (
      <Box className='heading'>
        <Typography variant='h1bold' id='Title'>
          {content.Title}
        </Typography>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Typography
        variant='p3regular'
        id='Description'
        className='detail'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content.Description || ""),
        }}></Typography>
    );
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.paragraphWithHeadlineWrapper} ${globalClasses.prelemType1} prelem prelemType1 paragraph-with-headline paragraphWithHeadlineBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          customClassName='ParagraphWithHeadline'
          noPadding={true}
          col1Align='start'
          col2Align='start'
        />
      </Container>
    </div>
  );
};

interface ParagraphWithHeadlineProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs: SecondaryArgs;
}

interface Content {
  Title?: string;
  Description?: string;
}

ParagraphWithHeadline.defaultProps = {
  content: {
    Title: "Paragraph with Headline",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut .",
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
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Paragraph With Headline",
    pageDesc: "This prelem can be used to add Paragraph With Headline anywhere in the website.",
    pageTags: "Text, Full Width, Paragraph With Headline",
    prelemTags: "Text, Full Width, Paragraph With Headline",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};
export default ParagraphWithHeadline;
