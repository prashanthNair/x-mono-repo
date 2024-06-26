import { useEffect, useState } from "react";
import "./EcommerceAuthoring.css";
import EComTopHeading from "./EComTopHeading";
import { useLazyQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography } from "@mui/material";
import EcommerceCard from "./EcommerceCard/EcommerceCard";
import EcomLeftSidebar from "./EcomLeftSidebar/EcomLeftSidebar";
import EcomViewQueryDropDown from "./EcomViewQueryDropDown/EcomViewQueryDropDown";
import {
  fetchAllEcomProductContentList,
  fetchAllFilterProductList,
} from "@platformx/authoring-apis";
import { ThemeConstants, nullToArray, nullToObject, nullToString } from "@platformx/utilities";

type EcommerceAuthoringProps = {
  ecomDoneClick?: any;
  ecomCancelClick?: any;
  fromPageContentType?: string;
};

const EcommerceAuthoring = (_props: EcommerceAuthoringProps) => {
  const { ecomDoneClick = () => {}, ecomCancelClick = () => {}, fromPageContentType = "" } = _props;

  const { t } = useTranslation();
  const { ecommerceRequest: { filter = [] } = {} } = nullToObject(fromPageContentType);

  const [fetchMultiSlotContentList] = useLazyQuery(fetchAllEcomProductContentList);

  const [fetchFilterContentList] = useLazyQuery(fetchAllFilterProductList);

  const startData = 12;
  const [items, setItems] = useState<any>([]);
  const [inputValue, setInputValue] = useState<any>("");
  const [contentLoading, setContentLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoriesFilter, setCategoriesFilter] = useState<any>([...filter]);
  const [stateManage, setStateManage] = useState({
    start: 0,
    rows: 12,
    searchTerm: "",
    nodeIdData: [...filter],
  });

  /**
   * pass node id from categories filter
   * @param nodeId string
   */
  const onNodeIdHandle = (nodeId: string) => {
    let parentIdCheck = "";
    let newArray = [...categoriesFilter];
    const findIndexData = newArray.findIndex((ele) => ele?.id === nodeId);
    const newObj = {
      ...newArray[findIndexData],
      isCheck: !newArray[findIndexData]?.isCheck,
    };

    //first child and second check box handle
    if (newObj.parentId !== "") {
      newArray = newArray.map((ele) => {
        if (ele.parentId === nodeId) {
          return {
            ...ele,
            isCheck: newObj?.isCheck,
          };
        }
        return ele;
      });
    } else {
      // parent to entire child
      const newArray1 = newArray.map((ele) => {
        if (ele.parentId === nodeId) {
          ele.isCheck = newObj?.isCheck;
          parentIdCheck = ele.id;
          return ele;
        }
        return ele;
      });

      if (newArray1.length === newArray.length) {
        newArray = newArray1.map((ele) => {
          if (ele.parentId === parentIdCheck) {
            ele.isCheck = newObj?.isCheck;
            return ele;
          }
          return ele;
        });
      }
    }

    newArray[findIndexData] = newObj;
    const filterCHeckedData = newArray.filter((ele) => ele?.isCheck === true).map((ele) => ele?.id);
    setStateManage({
      ...stateManage,
      start: 0,
      rows: 12,
      nodeIdData: filterCHeckedData,
    });
    setItems([]); //array empty
    setCategoriesFilter(newArray);
  };

  /**
   * get all contentType list
   */
  const getContent = async () => {
    const { start = 0, rows = 0, nodeIdData = [], searchTerm = "" } = stateManage;
    await fetchMultiSlotContentList({
      variables: {
        tags: [],
        filter: "Ecommerce",
        isSuggestive: false,
        searchTerm: searchTerm,
        pagination: { start: start, rows: rows },
        ecommerceRequest: { filter: [...nodeIdData] },
      },
    })
      .then((res) => {
        if (res?.data?.authoring_getDynamicContentSearch) {
          const newArray = res?.data?.authoring_getDynamicContentSearch.map((ele: any) => {
            return {
              ...ele,
              Title: nullToString(ele?.ecomx_name),
              Banner: nullToArray(ele?.attr_images).length > 0 ? ele?.attr_images[0] : "",
              Thumbnail: {
                Name: nullToString(ele?.ecomx_name),
                Url: nullToArray(ele?.attr_images).length > 0 ? ele?.attr_images[0] : "",
                Title: nullToString(ele?.ecomx_name),
                Description: nullToString(ele?.ecomx_desc),
                Attribution: false,
                AltText: nullToString(ele?.ecomx_name),
              },
              Description: nullToString(ele?.ecomx_desc),
              PublishedDate: "",
              lastModifiedDate: "",
              ContentType: "Product",
              tags: "[]",
              Author: "",
              CurrentPageURL: nullToString(ele?.ecomx_slug),
            };
          });
          if (start === 0) {
            setItems([...newArray]);
          } else {
            setItems([...items, ...newArray]);
          }
        } else {
          setItems([]);
        }
      })
      .catch(() => {
        setItems([]);
      });
  };
  const getAllContentTypes = async () => {
    setContentLoading(true);
    await getContent();
    setContentLoading(false);
  };
  /**
   * get all contentType list
   */
  const getCategory = async () => {
    const { nodeIdData = [] } = stateManage;
    await fetchFilterContentList({
      variables: {
        filter: [],
        searchTerm: "",
      },
    })
      .then((res) => {
        if (res?.data?.authoring_getEcommerceCategories) {
          const newArray = res?.data?.authoring_getEcommerceCategories.map((ele: any) => {
            return {
              ...ele,
              isCheck: (nodeIdData || []).some((elem) => elem === ele.id) ? true : false,
            };
          });
          setCategoriesFilter([...(newArray || [])]);
        } else {
          setCategoriesFilter([]);
        }
      })
      .catch((err) => {
        setCategoriesFilter([]);
      });
  };
  const getAllFilterList = async () => {
    setCategoryLoading(true);
    await getCategory();
    setCategoryLoading(false);
  };

  /**
   * pagination infinity scroll
   */
  const fetchMoreData = () => {
    if (items.length > 11) {
      const newObj = {
        ...stateManage,
        start: stateManage.start + startData,
      };
      setStateManage(newObj);
    }
  };

  /**
   * final obj making
   */
  const makeFinalObj = () => {
    const { nodeIdData = [], searchTerm = "" } = stateManage;
    const newObj = {
      tags: [],
      filter: "Ecommerce",
      isSuggestive: false,
      searchTerm: searchTerm,
      ContentType: "ecommerce",
      isQueryType: "ecomEnCodeParse",
      currentPath: "product-listing",
      pagination: { start: 0, rows: 20 },
      ecommerceRequest: {
        filter: [...nodeIdData],
      },
    };
    ecomDoneClick(JSON.stringify(newObj));
  };

  const onSearch = (searchData) => {
    const newObj = {
      ...stateManage,
      searchTerm: searchData,
      start: 0,
      rows: 12,
    };
    setStateManage(newObj);
  };

  const setInputValueHandle = (searchData = "") => {
    setInputValue(searchData);
  };

  useEffect(() => {
    getAllContentTypes(); //get api call
  }, [stateManage, fromPageContentType]);

  useEffect(() => {
    getAllFilterList(); //getFilter api call
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: ThemeConstants.WHITE_COLOR,
      }}
      className='ecommerce_container'>
      {/* Done and cancel handle here */}
      <EComTopHeading
        onSearch={onSearch}
        inputValue={inputValue}
        doneClick={makeFinalObj}
        loading={categoryLoading}
        cancelClick={ecomCancelClick}
        onNodeIdHandle={onNodeIdHandle}
        categoriesFilter={categoriesFilter}
        setInputValueHandle={setInputValueHandle}
      />

      <Grid container spacing={0}>
        <Grid
          container
          className='leftsidebar-scroll'
          item
          xs={12}
          em={3}
          xl={2.5}
          lg={2.5}
          sx={{
            display: { xs: "none", em: "block" },
            borderRight: `solid 1px ${ThemeConstants.LIGHT_GRAY_VARIENT1}`,
          }}>
          <EcomLeftSidebar
            toggleDrawer={() => {}}
            loading={categoryLoading}
            onNodeIdHandle={onNodeIdHandle}
            categoriesFilter={categoriesFilter}
            // onClearAll={onClearAll}
          />
        </Grid>

        <Grid
          item
          xs={12}
          em={9}
          xl={9.5}
          lg={9.5}
          sx={{
            padding: { xs: "8px", em: "8px 16px 10px 16px" },
          }}
          className='right-topbar-container'>
          <Box className='right-topbar'>
            <Typography
              sx={{
                fontSize: ThemeConstants.FONTSIZE_H3,
                fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
                fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                minWidth: "140px",
              }}>
              {t("Products")}
            </Typography>
            <EcomViewQueryDropDown stateManage={stateManage} filterData={categoriesFilter} />
          </Box>

          <EcommerceCard
            cardObj={items}
            isLazyLoad
            fetchMoreData={fetchMoreData}
            isLoading={contentLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EcommerceAuthoring;
