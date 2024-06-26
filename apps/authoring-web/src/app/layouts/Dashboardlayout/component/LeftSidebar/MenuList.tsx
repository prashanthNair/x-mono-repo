/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */

import { Box } from "@mui/material";
import { t } from "i18next";
import { useEffect, useState } from "react";

import { contentTypeSchemaApi } from "@platformx/authoring-apis";
import { PollIcon, ShowToastError, useUserSession } from "@platformx/utilities";
import MenuSitesListDropdown from "../../../../components/MenuSitesListDropdown/MenuSitesListDropdown";
import { MenuData } from "../../../../hooks/useDynamicRoutes/menuData";
import MenuItems from "./MenuItems";

export default function Menu(props) {
  const [getSession] = useUserSession();
  const [dynamicMenu, setDynamicMenu] = useState<any>(MenuData);
  const { permissions } = getSession();
  const filtered = permissions
    ?.map((val) => val?.category?.toLowerCase())
    ?.filter((val, index, arr) => arr.indexOf(val) === index);
  const fetchSchema = () => {
    return contentTypeSchemaApi.getSchema();
  };
  const getSchema = async () => {
    try {
      const detailsRes: any = await fetchSchema();
      const menu: any = [];
      detailsRes?.authoring_getDocument?.map((val) => {
        return menu.push({
          MenuName: val?.title,
          Icon: <img alt='settings' src={PollIcon} />,
          url: `/content/${val?.name}`,
          id: val?.title,
          category: "content",
          subCategory: "",
        });
      });

      // const menuArr = [{ url: "", Title: "content", id: "content", Menu: menu }];
      const temp: any = MenuData.filter((val) => {
        return val.id === "content" ? val["Menu"].push(...menu) : val;
      });

      setDynamicMenu(temp);
    } catch (err: any) {
      ShowToastError(t("api_error_toast"));
    }
  };
  useEffect(() => {
    // getSchema();  // Commented out because API is not returning all content types
  }, []);

  return (
    <Box className='menulist'>
      <MenuSitesListDropdown />

      {dynamicMenu?.map((val, index) => {
        const isShow = filtered?.includes(val.id);
        return (
          isShow && (
            <MenuItems
              key={index}
              Title={val.Title}
              MenuName={val.Menu}
              open={props.open}
              roles={val.roles}
              props={val}
              url={val.url}
              handleMenuclose={props.handleMenuclose}
              handleMenuAction={props.handleMenuAction}
            />
          )
        );
      })}
    </Box>
  );
}
