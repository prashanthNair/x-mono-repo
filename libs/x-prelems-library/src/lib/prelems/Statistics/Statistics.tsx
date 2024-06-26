import { Box, Container, Grid, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import "./Statistic.css";
import { useCustomStyle } from "./Statistic.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import { Analytics, AuthoringHelper, SecondaryArgs } from "@platformx/utilities";

const Statistics = ({ content, analytics, authoringHelper, secondaryArgs }: StatisticsProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let StatisticsStructureData;
    try {
      StatisticsStructureData = {
        "@context": "https://schema.org/",
        "@type": "Organization",
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            name: content?.Description1,
            userInteractionCount: content?.Title1,
          },
          {
            "@type": "InteractionCounter",
            name: content?.Description2,
            userInteractionCount: content?.Title2,
          },
          {
            "@type": "InteractionCounter",
            name: content?.Description3,
            userInteractionCount: content?.Title3,
          },
        ],
      };
    } catch (e) {
      StatisticsStructureData = {};
    }
    return StatisticsStructureData;
  };

  const genrateStructureData = () => {
    let StatisticsStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        StatisticsStructureData = JSON.parse(tempSD);
      } else {
        StatisticsStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      StatisticsStructureData = defaultStructureData();
    }
    return StatisticsStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Title1,
    content?.Description1,
    content?.Title2,
    content?.Description2,
    content?.Title3,
    content?.Description3,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  return (
    <Box
      className={`${classes.statisticsWrapper} ${globalClasses.prelemType1} prelem prelemType1 statistics statisticsBg`}>
      <Container
        ref={authoringHelper?.innerRef}
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Grid container ref={ref} className='mincounterwp'>
          <Grid item xs={12} md={4} className='gridItem'>
            <Box className='counternumberBox'>
              {secondaryArgs?.editState ? (
                <Typography variant='h1largebold' id='Title1'>
                  {parseInt(content.Title1)}
                </Typography>
              ) : (
                <Typography variant='h1largebold' id='Title1'>
                  <CountUp
                    enableScrollSpy={true}
                    start={0}
                    end={parseInt(content.Title1)}
                    delay={0}>
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                  +
                </Typography>
              )}
              <Typography
                className={`threeline-trancate description`}
                variant='p3regular'
                id='Description1'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content.Description1 || ""),
                }}></Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className='gridItem'>
            <Box className={`counternumberBox gap`}>
              {secondaryArgs?.editState ? (
                <Typography variant='h1largebold' id='Title2'>
                  {parseInt(content.Title2)}
                </Typography>
              ) : (
                <Typography variant='h1largebold' id='Title2'>
                  <CountUp
                    enableScrollSpy={true}
                    start={0}
                    end={parseInt(content.Title2)}
                    delay={0}>
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                  +
                </Typography>
              )}
              <Typography
                variant='p3regular'
                id='Description2'
                className={`threeline-trancate description`}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content.Description2 || ""),
                }}></Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className='gridItem'>
            <Box className='counternumberBox'>
              {secondaryArgs?.editState ? (
                <Typography variant='h1largebold' id='Title3'>
                  {parseInt(content.Title3)}
                </Typography>
              ) : (
                <Typography variant='h1largebold' id='Title3'>
                  <CountUp
                    enableScrollSpy={true}
                    start={0}
                    end={parseInt(content.Title3)}
                    delay={0}>
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                  +
                </Typography>
              )}
              <Typography
                variant='p3regular'
                id='Description3'
                className={`threeline-trancate description`}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content.Description3 || ""),
                }}></Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

interface StatisticsProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs: SecondaryArgs;
}

interface Content {
  Title1: string;
  Description1?: string;
  Title2: string;
  Description2?: string;
  Title3: string;
  Description3?: string;
}

Statistics.defaultProps = {
  content: {
    Title1: "100",
    Description1: "Lorem ipsum dolor sit amet",
    Title2: "200",
    Description2: "Lorem ipsum dolor sit amet",
    Title3: "35",
    Description3: "Lorem ipsum dolor sit amet",
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
    pageTitle: "Counter With Number",
    pageDesc: "This prelem can be used to add Counter with number anywhere in the website.",
    pageTags: "Text, Full Width, Counter with number",
    prelemTags: "Text, Full Width, Counter with number",
  },
};
export default Statistics;
