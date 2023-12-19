import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ErrorTooltip } from '@platformx/utilities';
import { useStyles } from './CardMenu.styles';
// import EmbedDialog from '@platformx/utilities';
import { PlateformXDialog } from '@platformx/utilities';
import { ShowToastError, ShowToastSuccess } from '@platformx/utilities';
import { useAccess } from '@platformx/utilities';
import { convertToLowerCase, getSubDomain } from '@platformx/utilities';
import DuplicateContentPopup from '../DuplicateContentPopup/DuplicateContentPopup';
// import ShareContentWithSiteDialog from '../../../../components/ShareContentWithSites/shareContentWithSites';
import {
  CardOptionApprovalStatusIcon,
  CardOptionCopyUrlIcon,
  CardOptionDeleteIcon,
  CardOptionDuplicateIcon,
  CardOptionEditIcon,
  CardOptionImbedIcon,
  CardOptionShareIcon,
  CardOptionUnPublishIcon,
  CardOptionViewIcon,
} from '../../../assets/svg';

import { useMediaQuery, useTheme } from '@mui/material';
import EmbedDialog from '../EmbedDialog/EmbedDialog';
import { makeStyles } from '@material-ui/core';
import { MenuActions } from '../CardMenu/CardMenu.types';
import PlateformXSocialDialog from '../PlateformXSocialDialog/PlateformXSocialDialog';
import { getEmbedTempData, getSocialShareData } from '../../utils/Helper';
import WorkflowStepper from '../WorkflowStepper/WorkflowStepper';

export const QuizPollEventMenu = ({
  anchorEl,
  open,
  handleClose,
  contentType,
  listItemDetails,
  category,
  subCategory,
  deleteContent,
  duplicate,
  preview,
  unPublish,
  view,
  edit,
  fetchContentDetails,
  sitelist,
  duplicateToSite,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { canAccessAction } = useAccess();
  const [menuActions, setMenuActions] = useState({
    duplicate: false,
    delete: false,
    embed: false,
    socialShare: false,
    unpublish: false,
    approvalStatus: false,
    shareWithSites: false,
  });
  const [selectedContent, setSelectedContent] = useState<any>(listItemDetails);
  const [language, setLanguage] = useState<string[]>([]);
  const [embedData, setEmbedData] = useState({});

  useEffect(() => {
    setSelectedContent(listItemDetails);
  }, [listItemDetails]);

  const openSettingsPanel = (path) => {
    navigate(
      `/content/create-${contentType?.toLowerCase()}?path=${path}&open=socialShare`
    );
  };

  const handleEditContentType = (listItemDetails) => {
    edit(listItemDetails);
  };

  const handleStartBlog = (path) => {
    navigate(`/content/create-blog?path=${path}`);
  };

  const createContent = (IsDuplicate = false, title = '', isCalled = false) => {
    duplicate(IsDuplicate, title, language, selectedContent);
    onClose();
  };

  const handleCopy = () => {
    const text = `${getSubDomain()}/${i18n.language}/${
      contentType.toLowerCase() === 'vod' ? 'video' : contentType.toLowerCase()
    }${listItemDetails.current_page_url}`;
    if (listItemDetails.current_page_url) {
      navigator.clipboard.writeText(text);
      ShowToastSuccess(t('url_copy_toast'));
    } else {
      ShowToastError(t('api_error_toast'));
    }
  };

  const getDuplicateTitle = () => {
    const timestamp = new Date().getTime();
    const newVal = `${timestamp} - ${selectedContent?.title}`.trim();
    // const newVal = `${t('copy_of')} ${selectedContent?.title}`.trim();
    const duplicateContentTitle =
      newVal.length > 100 ? newVal.slice(0, 100) : newVal;
    return duplicateContentTitle.trim();
  };

  const deleteConfirmButtonHandle = () => {
    deleteContent(selectedContent);
    onClose();
  };

  const unPublishConfirmButtonHandle = () => {
    unPublish(selectedContent);
    onClose();
  };
  const handlePublishedPageView = () => {
    preview(listItemDetails);
  };
  const onClose = () => {
    setMenuActions({
      duplicate: false,
      delete: false,
      embed: false,
      socialShare: false,
      unpublish: false,
      approvalStatus: false,
      shareWithSites: false,
    });
  };

  const onHandleMenuActions = (action) => {
    switch (action) {
      case MenuActions.EDIT:
        handleEditContentType(listItemDetails);
        break;
      case MenuActions.DELETE:
        setMenuActions({ ...menuActions, delete: true });
        break;
      case MenuActions.DUPLICATE:
        setMenuActions({ ...menuActions, duplicate: true });
        break;
      case MenuActions.SOCIAL_SHARE:
        setMenuActions({ ...menuActions, socialShare: true });
        break;
      case MenuActions.EMBED:
        setMenuActions({ ...menuActions, embed: true });
        getSelectedCardDetails();
        break;
      case MenuActions.SHARE_WITH_SITES:
        setMenuActions({ ...menuActions, shareWithSites: true });
        getSelectedCardDetails();
        break;
      case MenuActions.UNPUBLISH:
        setMenuActions({ ...menuActions, unpublish: true });
        break;
      case MenuActions.VIEW_PREVIEW:
        handlePublishedPageView();
        break;
      case MenuActions.COPY_URL:
        handleCopy();
        break;
      case MenuActions.SETTINGS:
        openSettingsPanel(listItemDetails.page);
        break;
      case MenuActions.SELECTED_DATA:
        setSelectedContent(listItemDetails);
        break;
      case MenuActions.APPROVAL_STATUS:
        setMenuActions({ ...menuActions, approvalStatus: true });
        break;
    }
  };

  const getSelectedCardDetails = async () => {
    const cardDetails = await fetchContentDetails(listItemDetails);
    await setEmbedData(getEmbedTempData(cardDetails));
  };
  const theme = useTheme();
  const tabView = useMediaQuery(theme.breakpoints.down('em'));
  return (
    <React.Fragment>
      {/* {menuActions.shareWithSites && (
        <ShareContentWithSiteDialog
          isDialogOpen={menuActions.shareWithSites}
          closeButtonHandle={onClose}
          sitelist={sitelist}
          duplicateToSite={duplicateToSite}
          titledata={`${getDuplicateTitle()}`}
          contentType={t(contentType?.toLowerCase())}
          selectedContent={selectedContent}
        />
      )} */}
      {menuActions.socialShare && (
        <PlateformXSocialDialog
          isDialogOpen={menuActions.socialShare}
          closeButtonHandle={onClose}
          setSelectedItem={getSocialShareData(selectedContent)}
          contentType={contentType}
        />
      )}
      {menuActions.embed && (
        <EmbedDialog
          isDialogOpen={menuActions.embed}
          closeEmbedButtonHandle={onClose}
          setSelectedItem={embedData}
          contentType={convertToLowerCase(contentType)}
        />
      )}
      {menuActions.delete && (
        <PlateformXSocialDialog
          isDialogOpen={menuActions.delete}
          title={t('delete_title')}
          subTitle={`${t('delete_confirm')} ${t(
            contentType?.toLowerCase()
          )}?. ${t('process_undone')}`}
          closeButtonText={t('no_keep_it')}
          confirmButtonText={t('yes_delete_it')}
          closeButtonHandle={onClose}
          confirmButtonHandle={deleteConfirmButtonHandle}
        />
      )}
      {menuActions.duplicate && (
        <DuplicateContentPopup
          titledata={`${getDuplicateTitle()}`}
          isDialogOpen={menuActions.duplicate}
          closeButtonHandle={onClose}
          doneButtonHandle={createContent}
          contentType={t(contentType?.toLowerCase())}
          language={language}
          setLanguage={setLanguage}
        />
      )}
      {menuActions.unpublish && (
        <PlateformXDialog
          isDialogOpen={menuActions.unpublish}
          title={`${t('unpublish')} ${t(contentType?.toLowerCase())}`}
          subTitle={`${t('unpublish_confirm')} ${t(
            contentType?.toLowerCase()
          )}`}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={onClose}
          confirmButtonHandle={unPublishConfirmButtonHandle}
        />
      )}
      {menuActions.approvalStatus && (
        <WorkflowStepper
          open={menuActions.approvalStatus}
          setOpen={onClose}
          path={selectedContent?.page}
          contentType={contentType}
        />
      )}
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '.Platform-x-Menu-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '7px',
            marginTop: '5px',
          },
          '.Platform-x-Menu-list': {
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
            border: 'solid 1px rgba(112, 112, 112, 0.1)',
          },
          '.Platform-x-MenuItem-root': {
            '.Platform-x-SvgIcon-root': {
              fontSize: 20,
              marginRight: '10px',
            },
            paddingLeft: '18px',
            fontSize: '16px',
            zIndex: 999,
          },
          textTransform: 'capitalize',
        }}
      >
        {contentType === 'event' &&
          (listItemDetails.page_state === 'published' ||
            (listItemDetails.page_state === 'draft' &&
              listItemDetails?.is_published)) && (
            <MenuItem
              disableRipple
              onClick={() => {
                handleClose();
                handleStartBlog(listItemDetails?.page);
              }}
            >
              <CardOptionEditIcon className={classes.icon} />
              {t('write_a_blog')}
            </MenuItem>
          )}
        {(listItemDetails.page_state === 'published' ||
          (listItemDetails.page_state === 'draft' &&
            listItemDetails.is_published)) && (
          <MenuItem
            disableRipple
            onClick={() => {
              handleClose();
              view(listItemDetails);
            }}
          >
            <CardOptionViewIcon className={classes.icon} />
            {t('view')}
          </MenuItem>
        )}
        {(listItemDetails.page_state === 'draft' ||
          listItemDetails.page_state === 'unpublished') &&
          listItemDetails?.tagName?.toLowerCase() !== 'vod' && (
            <MenuItem
              disableRipple
              onClick={() => {
                handleClose();
                preview(listItemDetails);
              }}
            >
              <CardOptionViewIcon className={classes.icon} /> {t('preview')}
            </MenuItem>
          )}
        {tabView && (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, 'Update')}
                onClick={() => onHandleMenuActions('edit')}
              >
                <CardOptionEditIcon className={classes.icon} /> {t('edit')}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, 'Update')}
          />
        )}
        {listItemDetails?.tagName?.toLowerCase() !== 'vod' && (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, 'duplicate')}
                onClick={() => {
                  handleClose();
                  onHandleMenuActions('duplicate');
                }}
              >
                <CardOptionDuplicateIcon className={classes.icon} />{' '}
                {t('duplicate')}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, 'duplicate')}
          />
        )}

        {(listItemDetails.page_state === 'published' ||
          (listItemDetails.page_state === 'draft' &&
            listItemDetails?.is_published)) && (
          <MenuItem
            disableRipple
            onClick={() => {
              handleClose();
              onHandleMenuActions('copy_url');
            }}
          >
            <CardOptionCopyUrlIcon className={classes.icon} />
            {t('copy_url')}
          </MenuItem>
        )}

        {/* <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
            onHandleMenuActions('settings');
          }}
        >
          <SettingsIcon /> {t('settings')}
        </MenuItem> */}
        {listItemDetails.page_state === 'published' && (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, 'unpublish')}
                onClick={() => {
                  handleClose();
                  onHandleMenuActions('unpublish');
                }}
              >
                <CardOptionUnPublishIcon className={classes.icon} />{' '}
                {t('unpublish')}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, 'unpublish')}
          />
        )}

        {tabView && (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, 'delete')}
                onClick={() => {
                  handleClose();
                  onHandleMenuActions('delete');
                }}
              >
                <CardOptionDeleteIcon className={classes.icon} /> {t('delete')}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, 'delete')}
          />
        )}

        {(listItemDetails.page_state === 'published' ||
          (listItemDetails.page_state === 'draft' &&
            listItemDetails?.is_published)) && (
          <MenuItem
            disableRipple
            onClick={() => {
              handleClose();
              onHandleMenuActions('social_share');
            }}
          >
            <CardOptionShareIcon className={classes.icon} /> {t('social_share')}
          </MenuItem>
        )}
        {duplicateToSite &&
          (listItemDetails.page_state === 'published' ||
            (listItemDetails.page_state === 'draft' &&
              listItemDetails?.is_published)) && (
            <ErrorTooltip
              component={
                <MenuItem
                  disableRipple
                  disabled={
                    listItemDetails.tagName?.toLowerCase() === 'vod' ||
                    listItemDetails.tagName?.toLowerCase() === 'quiz' ||
                    listItemDetails.tagName?.toLowerCase() === 'event'
                  }
                  onClick={() => {
                    handleClose();
                    onHandleMenuActions('share_with_sites');
                  }}
                >
                  <CardOptionShareIcon className={classes.icon} />{' '}
                  {t('share_with_sites')}
                </MenuItem>
              }
              doAccess={!canAccessAction(category, subCategory, 'sharetosite')}
            />
          )}

        {convertToLowerCase(listItemDetails.tagName) !== 'vod' && (
          <>
            {(listItemDetails.page_state === 'published' ||
              (listItemDetails.page_state === 'draft' &&
                listItemDetails?.is_published)) && (
              <MenuItem
                disableRipple
                onClick={() => {
                  handleClose();
                  onHandleMenuActions('embed');
                }}
              >
                <CardOptionImbedIcon className={classes.icon} /> {t('embed')}
              </MenuItem>
            )}
            {/* {(listItemDetails.page_state === 'published' ||
              (listItemDetails.page_state === 'draft' &&
                listItemDetails?.is_published)) && (
              <MenuItem
                disableRipple
                onClick={() => {
                  handleClose();
                  onHandleMenuActions('social_share');
                }}
              >
                <ShareIcon /> {t('social_share')}
              </MenuItem>
            )} */}
            {/* {(listItemDetails.page_state === 'published' ||
              (listItemDetails.page_state === 'draft' &&
                listItemDetails?.is_published)) && (
              <MenuItem
                disableRipple
                onClick={() => {
                  handleClose();
                  onHandleMenuActions('embed');
                }}
              >
                <CodeIcon /> {t('embed')}
              </MenuItem>
            )} */}
            <MenuItem
              disableRipple
              onClick={() => {
                handleClose();
                onHandleMenuActions('approval_status');
              }}
            >
              <CardOptionApprovalStatusIcon className={classes.icon} />
              {t('approval_status')}
            </MenuItem>
          </>
        )}
      </Menu>
    </React.Fragment>
  );
};
