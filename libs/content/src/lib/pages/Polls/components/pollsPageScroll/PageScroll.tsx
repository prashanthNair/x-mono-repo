import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PageScroll = ({ icons, parentToolTip, scrollToView }) => {
  const { t } = useTranslation();
  const [activeScoll, setActiveScroll] = useState("");
  const scrollToViewFn = (id, toolTip) => {
    setActiveScroll(toolTip);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start", //id === "questions" ? "center" : "start",
    });
  };

  useEffect(() => {
    if (parentToolTip !== activeScoll) {
      setActiveScroll(parentToolTip);
    }
  }, [activeScoll, parentToolTip]);

  useEffect(() => {
    if (scrollToView !== "") {
      setActiveScroll("socialShare");
      scrollToViewFn(scrollToView, "socialShare");
    } else {
      setActiveScroll(icons[0].tooltip);
    }
  }, [icons, scrollToView]);
  return (
    <ButtonGroup
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        boxShadow: "0 10px 25px 0 rgba(0, 0, 0, 0.12)",
      }}>
      {icons?.length > 0
        ? icons.map((icon, key) => (
            <Tooltip
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              title={t(icon.tooltip)}
              placement='left'
              sx={{
                ".Platform-x-Tooltip-tooltipPlacementLeft": {
                  backgroundColor: "red",
                },
              }}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#fff",
                    color: "#2d2d39",
                    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.06)",
                    paddingRight: "5px",
                    "& .MuiTooltip-arrow": {
                      color: "black",
                    },
                  },
                },
              }}>
              <IconButton
                onClick={() => scrollToViewFn(icon.id, icon.tooltip)}
                sx={{
                  borderRadius: "0",
                  backgroundColor: activeScoll === icon.tooltip ? "#D7ECFD" : "transparent",
                  ":hover": {
                    backgroundColor: activeScoll === icon.tooltip ? "#D7ECFD" : "#f5f6f8",
                  },
                }}>
                {activeScoll === icon.tooltip ? (
                  <icon.iconName filter='brightness(0) saturate(100%) invert(55%) sepia(48%) saturate(2094%) hue-rotate(188deg) brightness(100%) contrast(96%)' />
                ) : (
                  <icon.iconName />
                )}
              </IconButton>
            </Tooltip>
          ))
        : ""}
    </ButtonGroup>
  );
};
export default PageScroll;
