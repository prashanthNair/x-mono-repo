import { Box } from "@mui/material";
import React, { useState } from "react";
import Frame from "react-frame-component";
import { Mapping } from "@platformx/x-prelems-library";
import { PrelemPreviewFrameType } from "../utils/editTypes";

//mapping dynamic instance
const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module[Mapping[item]],
    })),
  );
  return mappingDynamicInstance;
});

const PrelemPreviewFrame = ({ children, device, prelemid }: PrelemPreviewFrameType) => {
  const [height, setHeight] = useState(300);
  const iframeRef = React.useRef<any>();
  const handleResize = (iframe: any) => {
    if (
      iframe?.current?.contentDocument?.body?.scrollHeight > 100 &&
      prelemid === "Prelem_020" &&
      device === "tablet"
    ) {
      setHeight(400);
    } else if (prelemid === "Prelem_028") {
      setHeight(500);
    } else if (iframe?.current?.contentDocument?.body?.scrollHeight > 100) {
      setHeight(iframe.current.contentDocument.body.scrollHeight);
    }
  };

  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}<style>
    .tweetWrapper iframe {
      visibility: visible !important;
      position: relative !important;
    }
    @media only screen and (min-width: 768px) {
      .tweetWrapper iframe {
        width: 83% !important;
      }
    }
    
    @media only screen and (min-width: 992px) {
      .tweetWrapper iframe {
        width: 72% !important;
      }
    }
    ::-webkit-scrollbar {
      width: 0px;
      height: 10px;
      display: none; 
  }
  ::-webkit-scrollbar-button:start:decrement,
  ::-webkit-scrollbar-button:end:increment  {
      height: 30px;
      background-color: transparent;
  }
  ::-webkit-scrollbar-track-piece  {
      background-color: #3b3b3b;
     -webkit-border-radius: 16px;
  }
  ::-webkit-scrollbar-thumb:vertical {
      height: 50px;
      background-color: #666;
      border: 1px solid #eee;
      -webkit-border-radius: 6px;
  }
    </style></head><body><div></div></body></html>`;

  // const ThemeConstant = ThemeConstantForPrelemThemeBasedOnSite();

  return (
    <Frame
      width='100%'
      height={height}
      ref={iframeRef}
      contentDidMount={() => handleResize(iframeRef)}
      contentDidUpdate={() => handleResize(iframeRef)}
      scrolling={prelemid === "Prelem_028" ? "yes" : "no"}
      frameBorder='0'
      initialContent={initialContent}>
      {/* <ThemeProvider theme={() => PrelemTheme(ThemeConstant)}> */}
      <Box sx={{ margin: (themeOptions) => themeOptions.prelemMargin.value }}>{children}</Box>
      {/* </ThemeProvider> */}
    </Frame>
  );
};
export default PrelemPreviewFrame;
