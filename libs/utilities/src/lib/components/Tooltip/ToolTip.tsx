import Tooltip from "@mui/material/Tooltip";
import { ThemeConstants } from "@platformx/utilities";
import { FC } from "react";

interface PropType {
  component: JSX.Element;
  Title?: any;
  position?: any;
  className?: string;
}

export const ToolTip: FC<PropType> = ({
  component: Component,
  position = "left",
  Title,
  className,
}) => {
  return (
    <Tooltip
      className={className}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: ThemeConstants.WHITE_COLOR,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            color: ThemeConstants.PRIMARY_COLOR[950],
            fontSize: ThemeConstants.FONTSIZE_H7,
            boxShadow: "0px 10px 25px 0px rgba(0, 0, 0, 0.12)",
            maxWidth: "300px",
            textAlign: "center",
            padding: "10px",
            border: "0.1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "3px",
          },
        },
      }}
      title={Title}
      placement={position}>
      <span style={{ cursor: "pointer" }}>{Component}</span>
    </Tooltip>
  );
};
