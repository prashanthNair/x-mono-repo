import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import {
  Analytics,
  AuthoringHelper,
  SecondaryArgs,
  ServiceCard2Background,
} from "@platformx/utilities";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import { useClickImpression } from "../../components/ImpressionHooks/ClickImpressionHook";
import prelemTypes from "../../globalStyle";
import "../../Style.css";
import "./ServiceCard2.css";
import { useCustomStyle } from "./ServiceCard2.style";

const ServiceCard2 = ({ content, analytics, authoringHelper, secondaryArgs }: ServiceCard2Prop) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const [contentType] = React.useState("image");
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const defaultStructureData = () => {
    let ServiceCard2StructureData;
    try {
      ServiceCard2StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Title,
        itemListElement:
          content?.Slots &&
          Object.entries(content?.Slots).map(([, value], index) => {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "ImageObject",
                contentUrl: value?.Image_1?.Url,
                name: value?.Title,
                Description: value?.Description,
              },
            };
          }),
      };
    } catch (e) {
      ServiceCard2StructureData = {};
    }

    return ServiceCard2StructureData;
  };
  const generateStructureData = () => {
    let ServiceCard2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ServiceCard2StructureData = JSON.parse(tempSD);
      } else {
        ServiceCard2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ServiceCard2StructureData = defaultStructureData();
    }
    return ServiceCard2StructureData;
  };

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    dots: false,
    arrow: false,
    //adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
          autoPlay: true,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          autoPlay: true,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 599,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoPlay: true,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  const themeCss = `
  @charset 'UTF-8';.slick-dots,.slick-next,.slick-prev{position:absolute;display:block;padding:0}.slick-dots li button:before,.slick-next:before,.slick-prev:before{font-family:slick;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.slick-loading .slick-list{background:url(ajax-loader.gif) center center no-repeat #fff}@font-face{font-family:slick;font-weight:400;font-style:normal;src:url(fonts/slick.eot);src:url(fonts/slick.eot?#iefix) format('embedded-opentype'),url(fonts/slick.svg#slick) format('svg')}.slick-next,.slick-prev{font-size:0;line-height:0;top:50%;width:20px;height:20px;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%);cursor:pointer;color:transparent;border:none;outline:0;background:0 0}.slick-next:focus:before,.slick-next:hover:before,.slick-prev:focus:before,.slick-prev:hover:before{opacity:1}.slick-next.slick-disabled:before,.slick-prev.slick-disabled:before{opacity:.25}.slick-next:before,.slick-prev:before{font-size:20px;line-height:1;opacity:.75;color:#fff}.slick-prev{left:-25px}[dir=rtl] .slick-prev{right:-25px;left:auto}.slick-prev:before{content:'←'}.slick-next:before,[dir=rtl] .slick-prev:before{content:'→'}.slick-next{right:-25px}[dir=rtl] .slick-next{right:auto;left:-25px}[dir=rtl] .slick-next:before{content:'←'}.slick-dotted.slick-slider{margin-bottom:30px}.slick-dots{bottom:-25px;width:100%;margin:0;list-style:none;text-align:center}.slick-dots li{position:relative;display:inline-block;width:20px;height:20px;margin:0 5px;padding:0;cursor:pointer}.slick-dots li button{font-size:0;line-height:0;display:block;width:20px;height:20px;padding:5px;cursor:pointer;color:transparent;border:0;outline:0;background:0 0}.slick-dots li button:focus,.slick-dots li button:hover{outline:0}.slick-dots li button:focus:before,.slick-dots li button:hover:before{opacity:1}.slick-dots li button:before{font-size:6px;line-height:20px;position:absolute;top:0;left:0;width:20px;height:20px;content:'•';text-align:center;opacity:.25;color:#000}.slick-dots li.slick-active button:before{opacity:.75;color:#000}
  `;
  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Slots]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  const { triggerClickAnalytics } = useClickImpression();

  return (
    <Box
      className={`${classes.serviceCard2Prelem} ${globalClasses.prelemType1} prelem prelemType1 serviceCard2PrelemBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Box ref={authoringHelper?.innerRef}>
          <style>{themeCss}</style>
          {/* For Mobile */}
          <Box className='sliderWrapperSmall'>
            <Typography variant='h1semibold' className='textWrapper' ref={ref}>
              {content?.Title}
            </Typography>
            <Grid container item className='service-card2 sliderInnerWrapper'>
              <Slider {...settings} className='slider-container1'>
                {content?.Slots &&
                  Object.entries(content?.Slots).map(([key, value], index) => (
                    <Grid
                      item
                      key={key}
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      justifyContent='center'
                      alignItems='center'
                      paddingBottom={2}
                      sx={{
                        height: "100%",
                      }}>
                      <Card
                        className='serviceCardsItems'
                        onClick={() => {
                          if (value?.URL) {
                            triggerClickAnalytics(
                              value?.URL,
                              index,
                              analytics,
                              secondaryArgs,
                              content?.Slots && content?.Slots[index]?.Title,
                              "Service Card",
                            );
                            if (value?.Internal) {
                              window.location.assign(value.URL);
                            } else {
                              window.open(value.URL);
                            }
                          }
                        }}
                        sx={{ cursor: value?.URL ? "pointer" : "auto" }}>
                        <Box>
                          <CardMedia
                            component='img'
                            height='134'
                            image={value?.Image_1?.Url}
                            alt={value?.Image_1?.AltText}
                          />
                        </Box>
                        <CardContent>
                          <Typography variant='h4bold' className='title'>
                            {value?.Title}
                          </Typography>
                          <Typography variant='p3regular' className='description'>
                            {value?.Description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Slider>
            </Grid>
          </Box>
          {/* For Desktop and Tablet*/}
          <Box className='sliderWrapperLarge'>
            <Box className='titleWrapper'>
              <Typography variant='h1semibold' id='Title'>
                {content?.Title}
              </Typography>
            </Box>
            <Box
              className='overlayWrapper'
              sx={{
                "&:hover": {
                  ".add-content-overlay": {
                    display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                  },
                },
              }}>
              <Box
                ref={ref}
                className='service-card2 allCardItemsWrapper'
                sx={{ backgroundImage: `url(${ServiceCard2Background})` }}>
                {content?.Slots &&
                  Object.entries(content?.Slots).map(([key, value], index) => (
                    <Box
                      key={key}
                      justifyContent='center'
                      alignItems='center'
                      paddingBottom={2}
                      className='indicisualCard'>
                      <Card
                        className='serviceCardsItems'
                        onClick={() => {
                          if (value?.URL) {
                            triggerClickAnalytics(
                              value?.URL,
                              index,
                              analytics,
                              secondaryArgs,
                              content?.Slots && content?.Slots[index]?.Title,
                              "Service Card",
                            );
                            if (value?.Internal) {
                              window.location.assign(value.URL);
                            } else {
                              window.open(value.URL);
                            }
                          }
                        }}
                        sx={{ cursor: value?.URL ? "pointer" : "auto" }}>
                        <Box>
                          <CardMedia
                            component='img'
                            height='194'
                            image={value?.Image_1?.Url}
                            alt={value?.Image_1?.AltText}
                          />
                        </Box>
                        <CardContent>
                          <Typography variant='h4bold' className='title'>
                            {value?.Title}
                          </Typography>
                          <Typography variant='p3regular' className='description'>
                            {value?.Description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
              </Box>
              <Box className='add-content-overlay'>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    secondaryArgs?.multiSlot?.onToggleContentGallery(contentType, true)
                  }>
                  <AutorenewIcon className='autorenewIcon' />
                  <Typography variant='h3regular' color='textColor'>
                    Replace
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

interface ServiceCard2Prop {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs: SecondaryArgs;
}

interface Content {
  Title?: string;
  ImageIcon?: boolean;
  ContentType?: string;
  Slots?: [
    {
      Title: string;
      Description: string;
      URL: string;
      Internal: boolean;
      Image_1: {
        Name: string;
        Url: string;
        AltText: string;
      };
    },
    {
      Title: string;
      Description: string;
      URL: string;
      Internal: boolean;
      Image_1: {
        Name: string;
        Url: string;
        AltText: string;
      };
    },
    {
      Title: string;
      Description: string;
      URL: string;
      Internal: boolean;
      Image_1: {
        Name: string;
        Url: string;
        AltText: string;
      };
    },
  ];
  TagName?: string;
}

ServiceCard2.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    ImageIcon: true,
    ContentType: "ServiceCard",
    Slots: [
      {
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "https://www.google.com/",
        Internal: true,
        Image_1: {
          Name: "image1",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/25bb468d-438a-41bc-adf1-b40dd11ba3e8/content",
          AltText: "ProductSummary",
        },
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "https://www.google.com/",
        Internal: true,
        Image_1: {
          Name: "image1",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/25bb468d-438a-41bc-adf1-b40dd11ba3e8/content",
          AltText: "ProductSummary",
        },
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "https://www.google.com/",
        Internal: true,
        Image_1: {
          Name: "image1",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/25bb468d-438a-41bc-adf1-b40dd11ba3e8/content",
          AltText: "ProductSummary",
        },
      },
    ],
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
    authoringHoverShow: false,
    isEditPage: false,
  },

  analytics: {
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 19,
    prelemId: 19,
    pageTitle: "Full Width Image",
    pageDesc:
      "This prelem can be used to house a full width image. It can be used anywhere in the website to add an element of beautification to it.",
    pageTags: "Image, Full Width Image",
    prelemTags: "Image, Full Width Image",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      device: "",
    },
    editState: false,
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ServiceCard2;
