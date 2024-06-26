/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unescaped-entities */
import CloseIcon from "@mui/icons-material/Close";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {
  PlatXLogo,
  Step4img,
  Step4imgupdate,
  Step4imgn,
  Step4imgn1,
  Step4imgn2,
  Step4imgnblur,
} from "@platformx/utilities";
import { useCreatesiteStepStyle } from "./Createstep.style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Progressbar } from "../SiteListing/Progressbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  handlenextbutton: any;
  handlebackbutton: any;
};

export default function PlateformXCreatestep4Dialog({
  isDialogOpen,
  closeButtonHandle,
  handlenextbutton,
  handlebackbutton,
}: DialogList) {
  const classes = useCreatesiteStepStyle();
  const handleFilterClose = () => {
    // setAnchor(null);
  };

  const mockDatastep = [
    { id: 1, value: "Rugby" },
    { id: 2, value: "baseball" },
    { id: 3, value: "Swimming" },
    { id: 4, value: "Adidas" },
    { id: 5, value: "Nike" },
    { id: 6, value: "Puma" },
    { id: 7, value: "America" },
    { id: 4, value: "Scotland" },
    { id: 8, value: " Football" },
    { id: 9, value: "baseball" },
    { id: 19, value: "American Football" },
  ];

  // Function to handle click on image box
  return (
    <Box className='socialsharemodal'>
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        className={classes.dialograpper}>
        <Box>
          <Box className={classes.modalbox} onClick={closeButtonHandle}>
            <CloseIcon className={classes.closeicon} />
          </Box>
          <Box className={classes.modalcontain}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.step2margin}>
                <Box className={classes.platxlogo}>
                  <Box className={classes.xlogo}>
                    <img src={PlatXLogo} alt='logo' />
                  </Box>
                  <Box className={classes.progrebar}>
                    <Progressbar progress={75} />
                  </Box>
                  <Box className={classes.textmargin}>
                    <Typography variant='h7regular'>Step 4 out of 5</Typography>
                    <Typography variant='h3bold'>Choose Tags</Typography>
                    <Typography className={classes.step2typo} variant='h5medium'>
                      Choose the tags that certain to your company. it will contribute to better SEO
                      ranking.
                    </Typography>
                  </Box>
                  <Box className={classes.boxscroll}>
                    <Grid item xs={12} sm={4} md={12} lg={12}>
                      <Box className={classes.step4boxn}>
                        <Accordion sx={{ boxShadow: "none" }}>
                          <AccordionSummary
                            className={classes.accordiansum}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1-content'
                            id='panel1-header'>
                            Sports
                          </AccordionSummary>
                          <AccordionDetails className={classes.accordiandeatail}>
                            {mockDatastep.map((item) => (
                              <Box key={item.id} className={classes.stepmockval}>
                                <Button variant='outlined'>{item.value}</Button>
                              </Box>
                            ))}
                          </AccordionDetails>
                          <Box className={classes.accordianborder}></Box>
                        </Accordion>
                      </Box>
                      <Box className={classes.step4boxn}>
                        <Accordion sx={{ boxShadow: "none" }}>
                          <AccordionSummary
                            className={classes.accordiansum}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1-content'
                            id='panel1-header'>
                            Fashion & Trends
                          </AccordionSummary>
                          <AccordionDetails className={classes.accordiandeatail}>
                            {mockDatastep.map((item) => (
                              <Box key={item.id} className={classes.stepmockval}>
                                <Button variant='outlined'>{item.value}</Button>
                              </Box>
                            ))}
                          </AccordionDetails>
                          <Box className={classes.accordianborder}></Box>
                        </Accordion>
                      </Box>
                      <Box className={classes.step4boxn}>
                        {/* using accordian to showcase the button with mock data */}
                        <Accordion sx={{ boxShadow: "none" }}>
                          <AccordionSummary
                            className={classes.accordiansum}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1-content'
                            id='panel1-header'>
                            Sales & Marketing
                          </AccordionSummary>
                          <AccordionDetails className={classes.accordiandeatail}>
                            {mockDatastep.map((item) => (
                              <Box key={item.id} className={classes.stepmockval}>
                                <Button variant='outlined'>{item.value}</Button>
                              </Box>
                            ))}
                          </AccordionDetails>
                          <Box className={classes.accordianborder}></Box>
                        </Accordion>
                      </Box>
                    </Grid>
                  </Box>

                  <Box className={classes.btnbox}>
                    <Box className={classes.skipbtn}>
                      <Typography className={classes.skipbtncolor}>Skip</Typography>
                      <ArrowForwardIosIcon
                        onClick={() => {
                          handlenextbutton({ step5: true });
                          handleFilterClose();
                        }}
                        className={classes.skipbtncolor}
                      />
                    </Box>
                    <Box className={classes.backbtn}>
                      <Button
                        className={classes.innercancel}
                        onClick={() => {
                          handlebackbutton({ step4: false });
                          handleFilterClose();
                        }}
                        variant='outlined'>
                        back
                      </Button>
                      <Button
                        onClick={() => {
                          handlenextbutton({ step5: true });
                          handleFilterClose();
                        }}
                        variant='primaryButton'>
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.createcontainnew}>
                  <Typography className={classes.typowidthstep4} variant='h2bold'>
                    Choose the tags to provide additional information about the website and promote
                    it widely
                  </Typography>
                </Box>
                <Box className={classes.siteiconnew}>
                  <Box className={classes.step4blur}>
                    <img src={Step4imgnblur} alt='' className={classes.blurboximg1} />
                    <Box className={classes.step4imgtc}>
                      <img className={classes.siteiconinner} src={Step4img} alt='icon' />
                    </Box>
                    <Box className={classes.step4imgtc1}>
                      <img src={Step4imgn2} alt='icon' />
                    </Box>
                  </Box>

                  <Box className={classes.step4blur1}>
                    <img src={Step4imgnblur} alt='' className={classes.blurboximg2} />
                    <Box className={classes.step4innerimg1}>
                      <img
                        className={classes.step4innerimgupdate}
                        src={Step4imgupdate}
                        alt='icon'
                      />
                    </Box>
                    <Box className={classes.step4innerimg2}>
                      <img src={Step4imgn} alt='' />
                    </Box>

                    <Box className={classes.step4innerimg3}>
                      <img src={Step4imgn1} alt='icon' />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
