/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useImagesStyle } from "./Images.style";
import { Assetmodalicon, FileUploadicon, NoAssetSelected } from "@platformx/utilities";
import AssetBreadsum from "./AssetBreadscum";
import Progressbar from "../components/ProgressBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  collectionArr: any[];
};

export default function PlateformXAssetDialog({
  isDialogOpen,
  closeButtonHandle,
  collectionArr,
}: DialogList) {
  const classes = useImagesStyle();
  const navigate = useNavigate();
  const [files, setFiles] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const uuid1 = searchParams.get("uuid1");
  files.length > 0 && console.log(files, files.length, 2222);
  const routeChange = (event) => {
    event.preventDefault();
    navigate("/create_asset");
  };

  const mockAssetmodalData = [
    {
      id: "AFG",
      value: "Encaurzing Gen Z",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "AGO",
      value: "image 2",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "ALB",
      value: "image 3",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "BHS",
      value: "image 4",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "BIH",
      value: "image 4",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "BLZ",
      value: "image 5",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
  ];

  const handleFileChange = (event) => {
    console.log(event.target.files, 4444);
    setFiles(Array.from(event.target.files));
  };

  const handleFileUpload = () => {
    const id = collectionArr[0].uuid;
    const url = `${process.env.NX_API_URI}api/v1/assets/image/single-upload`;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("uuid", id);
    axios
      .post(url, formData)
      .then((response) => {
        console.log(response, 2222, "response");
      })
      .catch((error) => {
        console.log("Error:", error, 2222);
      });
  };

  useEffect(() => {
    if (files.length > 0) {
      console.log("api to be called", 2222);
      handleFileUpload();
    }
  }, [files]);

  return (
    <Box className='socialsharemodal'>
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        className={classes.dialograpper}>
        <Box
          sx={{
            display: { xs: "flex", md: "flex" },
          }}>
          <Box className={classes.modalbox} onClick={closeButtonHandle}>
            <CloseIcon className={classes.closeicon} />
          </Box>
          <Box className={classes.modalboxone}>
            <Box>
              <Typography variant='h5bold'>Upload Assests</Typography>
            </Box>
            <Box>
              <Typography variant='h7regular' className={classes.textupload}>
                Upload the File JPG,PNG,GIF,MOV,MP4,Doc
              </Typography>
            </Box>
            <Box className={classes.modalboxnew}></Box>
            <Grid container className={classes.modalcontainer}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Box className={classes.assetmodalback}>
                  <Box>
                    <img className={classes.fileuploadicon} src={FileUploadicon} alt='' />
                    <Typography className={classes.modaltypo} variant='h5bold'>
                      Choose Your File
                    </Typography>
                    {/* <Button sx={{ textTransform: "none" }} className={classes.btnmodal}>
                      Browse to Upload
                    </Button> */}
                    <label htmlFor='fileupload' className={classes.btnmodal}>
                      Browse to Upload
                    </label>
                    <input
                      type='file'
                      id='fileupload'
                      name='fileupload'
                      accept='image/png, image/jpeg'
                      multiple
                      hidden
                      onChange={handleFileChange}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.assetmodalbox}>
                  {files?.length > 0 && (
                    <>
                      <Box className={classes.modalbread}>
                        <AssetBreadsum />
                      </Box>
                      <Divider></Divider>
                      <Box className={classes.boxover}>
                        {/* {mockAssetmodalData.map((transaction) => (
                          <Box key={""} className={classes.modalassetbox}>
                            <Box key={transaction.id} className={classes.boxcloseinnercontain}>
                              <img src={transaction.img} alt='' />
                              <Box className={classes.modalboxtypo}>
                                <Typography variant='h6semibold'>{transaction.value}</Typography>
                                <Typography sx={{ color: "#6E7191" }}>
                                  {transaction.text}
                                </Typography>
                              </Box>
                              <Box className={classes.closeiconreop}>
                                <CloseIcon />
                              </Box>
                            </Box>
                          </Box>
                        ))} */}
                        {files.map((file: any) => (
                          <Box key={file.lastModified} className={classes.modalassetbox}>
                            <Box className={classes.boxcloseinnercontain}>
                              <img
                                src={URL.createObjectURL(file)}
                                style={{ width: "44px", height: "44px" }}
                                alt='img'
                              />
                              <Box className={classes.modalboxtypo}>
                                <Typography variant='h6semibold'>{file.name}</Typography>
                                <Typography sx={{ color: "#6E7191" }}>
                                  {(file.size / 1048576).toFixed(2)}MB . Image
                                </Typography>
                              </Box>
                              <Box className={classes.closeiconreop}>
                                <CloseIcon />
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Divider></Divider>
                      <Box className={classes.modalnecontain}>
                        <Box className={classes.beofrecircul}>
                          <Progressbar />
                          <Typography variant='h6semibold' className={classes.modaltyponew}>
                            Uploading 1/50
                          </Typography>
                        </Box>
                        <Box className={classes.beofrecircul}>
                          <Button
                            className={`${classes.modalbtn} sm`}
                            variant='primaryButton'
                            onClick={routeChange}>
                            Next
                          </Button>
                        </Box>
                      </Box>
                    </>
                  )}

                  {files?.length === 0 && (
                    <>
                      <Box className={classes.assetboxone}>
                        <img src={NoAssetSelected} alt='No asset' />s
                      </Box>
                      <Typography className={classes.modaltypo} variant='h5bold'>
                        There are no files here
                      </Typography>
                      <Typography className={classes.modaltypo} variant='h6medium'>
                        Please Upload the files
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
