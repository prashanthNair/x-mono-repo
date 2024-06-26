import { Box, FormControl, IconButton, InputAdornment, InputBase } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "../../assets/svg/index";
import "./Search.css";

export default function SearchBox({ handleSearch, setLoading = () => {} }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const handleOnChange = (event: any) => {
    setLoading(true);
    setSearchQuery(event.target.value);
  };
  const resetSearch = () => {
    setLoading(true);
    // handleSearch("");
    setSearchQuery("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery.toLowerCase());
    }, 1000);

    return () => clearTimeout(timer);
  }, [handleSearch, searchQuery]);

  return (
    <FormControl className='userSearchBox'>
      <InputBase
        id='search-users'
        type='text'
        size='small'
        value={searchQuery}
        onChange={handleOnChange}
        sx={{
          border: "1px solid #D9DBE9",
          borderRadius: "5px",
          height: "46px",
        }}
        startAdornment={
          <InputAdornment position='start'>
            <IconButton aria-label='search users' edge='start' sx={{ padding: 0, margin: 0 }}>
              <img src={SearchIcon} alt='' />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position='end'>
            {searchQuery && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                <CloseRoundedIcon
                  sx={{
                    width: ".75em",
                    height: ".75em",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  onClick={resetSearch}
                />
              </Box>
            )}
          </InputAdornment>
        }
        placeholder={`${t("search")}...`}
      />
    </FormControl>
  );
}
