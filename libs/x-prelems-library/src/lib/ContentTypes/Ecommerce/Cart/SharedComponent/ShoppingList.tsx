import React from "react";
import { nullToArray, nullToObject } from "@platformx/utilities";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import "./ShoppingList.css";
import ShoppingListCard from "./ShoppingListCard";
import ShoppingSkeletonListCard from "./ShoppingSkeletonListCard";
import { useCustomStyle } from "./ShoppingList.style";

type ecommerceShoppingListProps = {
  addedCartDetails: any;
  loading: boolean;
  loadCart: any;
  refetchLoading: boolean;
  secondaryArgs: any;
};
const ShoppingList = (_props: ecommerceShoppingListProps) => {
  const classes = useCustomStyle();
  const { t } = useTranslation();
  const {
    addedCartDetails = {},
    loading,
    loadCart,
    refetchLoading,
    secondaryArgs = {},
  } = nullToObject(_props);
  const { line_item = [] } = nullToObject(addedCartDetails);

  return (
    <Box className={`cart-product-list ${classes.productCartListWrapper} productCartListRow`}>
      <Typography variant='h3semibold' className='heading'>
        {t("cart")}
      </Typography>
      {loading ? (
        <>
          <ShoppingSkeletonListCard />
          <ShoppingSkeletonListCard />
          <ShoppingSkeletonListCard />
        </>
      ) : (
        <Box className='productCartList'>
          {nullToArray(line_item).length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant='p2medium'>{`${t("empty_cart_msg")}!`}</Typography>
            </Box>
          ) : (
            nullToArray(line_item).map((product: any, index: number) => (
              <ShoppingListCard
                cartId={addedCartDetails?.id}
                key={product?.id}
                product={product}
                index={index}
                loadCart={loadCart}
                refetchLoading={refetchLoading}
                secondaryArgs={secondaryArgs}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default ShoppingList;
