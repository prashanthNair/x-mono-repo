import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Button, MenuItem } from "@mui/material";
import { ErrorTooltip, useAccess } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledMenu } from "./Submit.styles";
import { workflowKeys } from "./Utils/contstants";
import {
  doAccessState,
  enableNextStep,
  enableReferBack,
  getNextStepLabel,
  getPendingRole,
  isDisabledSubmit,
} from "./Utils/helper";

const Submit = ({
  category,
  subCategory,
  workflow,
  handleSave,
  handlePublish,
  createComment = () => {},
  prelemEditState = false,
}) => {
  const { canAccessAction } = useAccess();
  const { t } = useTranslation();
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const openListMenu = Boolean(listMenu);
  const handleListClose = () => {
    setListMenu(null);
  };
  const handleSubmitList = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setListMenu(event.currentTarget);
  };
  const handleOnSubmit = (event, workflow_enable) => {
    if (workflow_enable) {
      handleSubmitList(event);
    } else {
      handlePublish();
    }
  };
  const submitForNextStep = (props, event_step) => {
    handleSave(true, props, event_step);
  };
  const [workflowState, setWorkflowState] = useState(true);
  useEffect(() => {
    if (Object.keys(workflow).length > 0) {
      setWorkflowState(false);
    }
  }, [workflow]);
  return (
    <>
      {workflowState ? (
        <Button disabled={true} variant='primaryButton' className='sm' type='submit'>
          {t("publish")}
        </Button>
      ) : (
        <ErrorTooltip
          component={
            <Button
              disabled={isDisabledSubmit(
                canAccessAction,
                prelemEditState,
                category,
                subCategory,
                workflow,
              )}
              variant='primaryButton'
              onClick={(event) => handleOnSubmit(event, workflow?.enable)}
              endIcon={workflow?.enable && <KeyboardArrowDownRoundedIcon />}
              className='sm'
              type='submit'>
              {workflow?.enable ? t("submit_text") : t("publish")}
            </Button>
          }
          doAccess={doAccessState(
            canAccessAction,
            prelemEditState,
            category,
            subCategory,
            workflow,
          )}
          tooltipMsg={
            workflow?.enable
              ? workflow?.workflow_status === workflowKeys.published.toLowerCase()
                ? ""
                : workflow?.task_user_name !== ""
                ? `${t("workflow_pending")} ${t("with")} ${workflow?.task_user_name}`
                : `${t("workflow_pending")} ${t("at")} ${getPendingRole(workflow?.stages)} ${t(
                    "end",
                  )}`
              : " "
          }
        />
      )}
      <StyledMenu id='long-menu' anchorEl={listMenu} open={openListMenu} onClose={handleListClose}>
        {enableNextStep(workflow) && (
          <MenuItem
            disableRipple
            disabled={prelemEditState}
            onClick={() => {
              createComment();
              submitForNextStep(workflow, workflowKeys.approve);
              handleListClose();
            }}>
            {getNextStepLabel(workflow)}
          </MenuItem>
        )}
        {enableReferBack(workflow) && (
          <MenuItem
            disableRipple
            disabled={prelemEditState}
            onClick={() => {
              submitForNextStep(workflow, workflowKeys.refer_back);
              createComment();
              handleListClose();
            }}>
            {t("refer_back")}
          </MenuItem>
        )}
        {canAccessAction(category, subCategory, workflowKeys.publish) &&
        workflow?.workflow_status === workflowKeys.publish.toLowerCase() ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <></>
        ) : (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={
                  !canAccessAction(category, subCategory, workflowKeys.publish) || prelemEditState
                }
                onClick={() => {
                  handlePublish();
                  handleListClose();
                }}>
                {t("publish")}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, workflowKeys.publish)}
          />
        )}
      </StyledMenu>
    </>
  );
};

export default Submit;
