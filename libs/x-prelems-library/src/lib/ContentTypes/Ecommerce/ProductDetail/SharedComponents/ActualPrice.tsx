import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { currencyBasedIcon, formateNumber } from "@platformx/utilities";
import "./ActualPrice.css";

const ActualPrice = ({
  price,
  currency,
  variant,
  className,
  style,
  loading = false,
  color,
}: any) => {
  return (
    <Box className={`ecom-actual-price ${loading ? "skeletonLoad" : ""}`}>
      {!loading && (
        <Typography
          component='span'
          variant={variant ? variant : "h2semibold"}
          color={color ? color : ""}
          sx={style}
          className={className ? className : ""}>
          {`${currencyBasedIcon(currency)} ${formateNumber(price)}`}
        </Typography>
      )}
    </Box>
  );
};

export default ActualPrice;
