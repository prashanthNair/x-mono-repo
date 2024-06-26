import * as React from "react";
import { makeStyles } from "@mui/styles";
import "./Search.css";
import { useLazyQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import { fetchAllEcomProductContentList } from "@platformx/authoring-apis";
import { ThemeConstants, debounce, SearchBlackSvg, ShowToastError } from "@platformx/utilities";

const useStyles = makeStyles({
  option: {
    "&:hover": {
      backgroundColor: `${ThemeConstants.OFF_WHITE_COLOR} !important`,
    },
  },
});
interface Content {
  Title: string;
}

export default function EcomSearchBox({
  onSearch,
  style,
  inputValue = "",
  setInputValueHandle = () => {},
}: any) {
  const styles = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [options, setOptions] = React.useState<Content[]>([]);
  const loading = open && options.length === 0;
  const [fetchMultiSlotContentList] = useLazyQuery(fetchAllEcomProductContentList);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        await fetchMultiSlotContentList({
          variables: {
            tags: [],
            searchTerm: inputValue,
            isSuggestive: true,
            filter: "Ecommerce",
            pagination: { start: 0, rows: 20 },
            ecommerceRequest: { filter: [] },
          },
        })
          .then((res) => {
            const arr = res?.data?.authoring_getDynamicContentSearch;
            if (arr?.length > 0) {
              const newArray = arr
                .map((ele) => {
                  if (ele?.name) {
                    return {
                      id: ele?.id,
                      Title: ele?.name,
                    };
                  }
                  return undefined;
                })
                .filter((ele: any) => ele !== undefined);
              setOptions(newArray);
            } else {
              setOptions([]);
              setOpen(false);
            }
          })
          .catch(() => {
            setOptions([]);
            setOpen(false);
            ShowToastError(t("api_error_toast"));
          });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const emptyOptions = () => {
    setOptions([]);
  };

  const debouncedCall = React.useCallback(debounce(emptyOptions, 500), []);

  function onInputChange(e, value) {
    setInputValueHandle(value);
    debouncedCall();
  }

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onSearch(inputValue);
      setOpen(false); //Do we need this ?? On enter should it remain open/closed??
    }
  };

  const onSelect = (e, value) => {
    // setInputValue(value)
    if (value) onSearch(value);
  };

  const resetSearch = () => {
    onSearch("");
    setInputValueHandle("");
  };

  return (
    <>
      {/* <style>{css}</style> */}
      <Box
        sx={{
          display: { xs: showSearch ? "none" : "block", md: "none" },
          marginRight: "13px",
        }}
        onClick={() => setShowSearch(true)}>
        <img src={SearchBlackSvg} alt='search' />
      </Box>
      <Autocomplete
        id='asynchronousSearch'
        freeSolo
        forcePopupIcon={false}
        sx={{ display: { xs: showSearch ? "block" : "none", md: "block" } }}
        style={style}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        classes={{
          option: styles.option,
        }}
        onClose={() => {
          setOpen(false);
        }}
        inputValue={inputValue}
        value={inputValue}
        // eslint-disable-next-line react/jsx-no-bind
        onInputChange={onInputChange}
        onChange={onSelect}
        onKeyDown={onEnter}
        filterOptions={(x) => x}
        options={options.map((option) => option.Title)}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t("search")}
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                // <React.Fragment>
                //     {loading ? <CircularProgress color="inherit" size={15} /> : null}
                //     {params.InputProps.endAdornment}
                // </React.Fragment>
                <InputAdornment position='end'>
                  {inputValue && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}>
                      <CloseRoundedIcon
                        onClick={resetSearch}
                        sx={{
                          cursor: "pointer",
                          // position: 'absolute',
                          // right: '18px',
                        }}
                      />
                    </Box>
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
