import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import ProductLoader from "../../Ecommerce/ProductListing/ProductLoader";
import CDCourseContent from "../CDCourseContent/CDCourseContent";
import CDInstructors from "../CDInstructors/CDInstructors";
import CDOverview from "../CDOverview/CDOverview";
import CourseDetailsHero from "../CourseDetailsHero/CourseDetailsHero";
import Reviews from "../Reviews/Reviews";
import CourseIFrame from "../CourseIFrame";
import { getCourseDetailsApiCall } from "../../../utils/helper";
import { useCustomStyle } from "./CourseDetails.style";
import prelemTypes from "../../../globalStyle";

const CourseDetails = ({ secondaryArgs = {}, courseId }: any) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCourseFrame, setIsCourseFrame] = useState(false);

  const [activeLink, setActiveLink] = useState("Description");

  const getCourseDetails = async () => {
    setLoading(true);
    const res = await getCourseDetailsApiCall(courseId, secondaryArgs);
    const { data: { data: { fetchCourse = {} } = {} } = {} } = res;
    setDetails(fetchCourse);
    setLoading(false);
  };

  useEffect(() => {
    if (courseId) {
      getCourseDetails();
    }
  }, [courseId]);
  return (
    <>
      {loading ? (
        <Box sx={{ position: "absolute", left: "50%", top: "40%" }}>{/* <ProductLoader /> */}</Box>
      ) : null}
      {!loading && !isCourseFrame ? (
        <CourseDetailsHero content={details} setIsCourseFrame={setIsCourseFrame} />
      ) : null}
      {isCourseFrame ? (
        <CourseIFrame setIsCourseFrame={setIsCourseFrame} content={details} />
      ) : null}
      {!loading && !isCourseFrame ? (
        <Box
          className={`${classes.CourseDetailsContentBox} ${globalClasses.prelemType1} prelem prelemType1 CourseDetails CourseDetailsContentWp`}>
          <Container className='grid_container'>
            <Grid container>
              <Grid xs={12} md={8} sx={{ paddingRight: { xs: 0, md: "45px" } }}>
                <Box className='CourseDetailsContentBox'>
                  <Box className='linksButtons'>
                    <ul>
                      <li
                        className={activeLink === "Description" ? "active" : ""}
                        onClick={() => setActiveLink("Description")}>
                        <a href='#Description'>
                          <Typography variant='p4regular'>Description</Typography>
                        </a>
                      </li>
                      <li
                        className={activeLink === "Requirements" ? "active" : ""}
                        onClick={() => setActiveLink("Requirements")}>
                        <a href='#Requirements'>
                          <Typography variant='p4regular'>Requirements</Typography>
                        </a>
                      </li>
                      <li
                        className={activeLink === "Credits" ? "active" : ""}
                        onClick={() => setActiveLink("Credits")}>
                        <a href='#Credits'>
                          <Typography variant='p4regular'>Credits</Typography>
                        </a>
                      </li>
                      <li
                        className={activeLink === "Course_type" ? "active" : ""}
                        onClick={() => setActiveLink("Course_type")}>
                        <a href='#Course_type'>
                          <Typography variant='p4regular'>Course Type</Typography>
                        </a>
                      </li>
                    </ul>
                  </Box>
                  <CDOverview content={details} />
                  <CDCourseContent content={details} />
                  <CDInstructors content={details} />
                  <Reviews content={details} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : null}
    </>
  );
};

export default CourseDetails;
