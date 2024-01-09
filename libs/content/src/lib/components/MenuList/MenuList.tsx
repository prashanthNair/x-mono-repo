import { Box, IconButton } from '@mui/material';
import { memo, useState } from 'react';
import { MoreHorizIcon } from '@platformx/utilities';
import { getSelectedObject } from './Utils/Mapper';
import { QuizPollEventMenu } from '../QuizPollEventsMenu/QuizPollEventsMenu';

const MenuList = ({
  item,
  deleteContent,
  duplicate,
  preview,
  unPublish,
  view,
  edit,
  fetchContentDetails,
}) => {
  const selectedItem = getSelectedObject(item);
  const contentType = selectedItem.contentType;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          margin: '0px',
        }}
        onClick={handleClickListItem}
      >
        <IconButton>
          <img
            alt='moreHorizIcon'
            src={MoreHorizIcon}
            style={{
              objectFit: 'cover',
              transform: 'rotate(90deg)',
              padding: '4px 0px',
            }}
          />
        </IconButton>
      </Box>
      {(contentType === 'quiz' ||
        contentType === 'poll' ||
        contentType === 'event' ||
        contentType === 'article') &&
        <QuizPollEventMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={() => {
            setAnchorEl(null);
          }}
          contentType={contentType}
          listItemDetails={selectedItem}
          category='content'
          subCategory='QuizPollARticleEvents'
          deleteContent={deleteContent}
          duplicate={duplicate}
          preview={preview}
          unPublish={unPublish}
          view={view}
          edit={edit}
          fetchContentDetails={fetchContentDetails}
          sitelist={[]}
          duplicateToSite={undefined}
        />}
      {/* {contentType === 'vod' &&
        <VodMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={() => {
            setAnchorEl(null);
          }}
          contentType={contentType}
          listItemDetails={item}
        />} */}
    </Box>
  );
};

export default memo(MenuList);
