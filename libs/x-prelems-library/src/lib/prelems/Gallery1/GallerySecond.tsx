import { Box } from "@mui/material";
import { formCroppedUrlString } from "@platformx/utilities";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";
import "./Gallery1.css";

function GallerySecond({ GalleryTwo, handleOpen, secondaryArgs }: any) {
  return (
    <Box className='gallery1FirstBox'>
      {GalleryTwo?.map((item: any, index: number) => {
        return (
          <Box
            className='gallery1ImageWrapper'
            key={`${item?.Title}_${index.toString()}`}
            onClick={() => handleOpen(GalleryTwo, index)}>
            {!("Thumbnail" in item) ? (
              <img
                alt='gallery 1'
                src={
                  formCroppedUrlString(
                    secondaryArgs?.gcpUrl,
                    secondaryArgs?.bucketName,
                    item?.Url,
                    item?.ext,
                  ).src
                }
              />
            ) : (
              <VideoPlayer
                playerProp={{
                  posterImg: "",
                  videoUrl: item.Url,
                  controls: false,
                  loop: true,
                  classname: "videobox",
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default GallerySecond;
