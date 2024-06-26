import { Menu, MenuItem } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CardOptionDeleteIcon } from "@platformx/utilities";
import { useStyles } from "./CardMenu.styles";

const AssetCardMenu = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { anchorEl, open, handleMenuClose, handleDelete } = props;

  const onHandleMenuActions = (action) => {
    switch (action) {
      case "delete":
        handleDelete();
        break;
      default:
        return;
    }
    handleMenuClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} className={classes.assetnew}>
      <MenuItem
        disableRipple
        disabled={false}
        onClick={() => {
          onHandleMenuActions("delete");
        }}>
        <img src={CardOptionDeleteIcon} alt='cardoption' />
        {t("delete")}
      </MenuItem>
    </Menu>
  );
};

export default memo(AssetCardMenu);
