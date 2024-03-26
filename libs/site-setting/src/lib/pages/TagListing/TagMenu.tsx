import { Box, IconButton } from "@mui/material";
import {
  MoreHorizIcon,
  CardOptionViewIcon,
  CardOptionEditIcon,
  CardOptionDuplicateIcon,
  CardOptionUnPublishIcon,
  CardOptionDeleteIcon,
} from "@platformx/utilities";
import React, { memo, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

export const useStyles = makeStyles(() => ({
  icon: {
    width: "16px",
    marginRight: "10px",
  },
}));

const TagMenu = ({ dataList, view }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          margin: "0px",
        }}
        onClick={handleClickListItem}>
        <IconButton>
          <img
            alt='moreHorizIcon'
            src={MoreHorizIcon}
            style={{
              objectFit: "cover",
              // transform: 'rotate(90deg)',
              padding: "4px 0px",
            }}
          />
        </IconButton>
      </Box>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          ".Platform-x-Menu-paper": {
            boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
            borderRadius: "7px",
            marginTop: "5px",
          },
          ".Platform-x-Menu-list": {
            borderRadius: "4px",
            boxShadow: "0 0 2px 0 rgba(115, 114, 114, 0.14)",
            border: "solid 1px rgba(112, 112, 112, 0.1)",
          },
          ".Platform-x-MenuItem-root": {
            ".Platform-x-SvgIcon-root": {
              fontSize: 20,
              marginRight: "10px",
            },
            paddingLeft: "18px",
            fontSize: "16px",
            zIndex: 999,
          },
          textTransform: "capitalize",
        }}>
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
            view(dataList);
          }}>
          <div className={classes.icon}>
            <img src={CardOptionViewIcon} alt='view' />
          </div>
          {t("view")} {t("category")}
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
          }}>
          <div className={classes.icon}>
            <img src={CardOptionEditIcon} alt='edit' />
          </div>
          {t("edit")}
        </MenuItem>
        {dataList.status === "published" && (
          <MenuItem
            disableRipple
            onClick={() => {
              handleClose();
            }}>
            <div className={classes.icon}>
              <img src={CardOptionDuplicateIcon} alt='duplicate' />
            </div>
            {t("duplicate")}
          </MenuItem>
        )}
        {dataList.status === "published" && (
          <MenuItem
            disableRipple
            onClick={() => {
              handleClose();
            }}>
            <div className={classes.icon}>
              <img src={CardOptionUnPublishIcon} alt='unpublish' />
            </div>
            {t("unpublish")}
          </MenuItem>
        )}
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
          }}>
          <div className={classes.icon}>
            <img src={CardOptionDeleteIcon} alt='delete' />
          </div>
          {t("delete")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default memo(TagMenu);