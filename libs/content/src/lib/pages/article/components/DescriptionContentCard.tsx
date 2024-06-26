import { Box, Button } from "@mui/material";
import { AUTH_INFO, getSubDomain, handleHtmlTags } from "@platformx/utilities";
import { useTranslation } from "react-i18next";
import "./Description/Description.css";

function DescriptionContentCard({ content }) {
  const { i18n } = useTranslation();
  const imageURL =
    content?.ContentType === "VOD"
      ? content?.Thumbnail?.Url
      : `${AUTH_INFO.gcpUri}/${AUTH_INFO.gcpBucketName}/${content?.Thumbnail?.Url}.${content?.Thumbnail?.ext}`;
  return (
    <Box>
      <div>
        <div style={{ position: "relative" }} className='content'>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "100%",
            }}>
            {content.Thumbnail.Url !== "" ? (
              <img
                src={imageURL}
                style={{ width: "100%", objectFit: "cover", height: "100%" }}
                alt={content?.Thumbnail?.AltText ? content?.Thumbnail?.AltText : ""}
              />
            ) : (
              <div
                style={{
                  backgroundColor: content?.background_content?.Color,
                  width: "100%",
                  objectFit: "cover",
                  height: "100%",
                }}></div>
            )}
          </div>
          <div
            style={{
              position: "relative",
              bottom: 0,
              left: 0,
              padding: "2% 3%",
              backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000 100%)",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "end",
              minHeight: "224px",
            }}>
            <div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#fff",
                  textTransform: "uppercase",
                  WebkitLineClamp: 1,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  wordWrap: "break-word",
                }}>
                {content.Thumbnail.Title}
              </h1>
              <h1
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#fff !important",
                  WebkitLineClamp: 2,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  wordWrap: "break-word",
                }}>
                {handleHtmlTags(content.Thumbnail.Description)}
              </h1>
              <a
                href={`${getSubDomain()}/${i18n.language}/${content.ContentType.toLowerCase()}/${
                  content.CurrentPageURL
                }`}
                target='_blank'
                style={{
                  textDecoration: "none",
                  width: "140px",
                  height: "40px",
                }}
                rel='noreferrer'>
                <Button
                  style={{
                    padding: "0 8px",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    width: "140px",
                    height: "40px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}>
                  {content.ContentType === "Quiz" || content.ContentType === "Poll"
                    ? "Start"
                    : "View"}{" "}
                  {content.ContentType}
                  {/* <img src={BigArrow} style={{ marginLeft: "10px" }} /> */}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </Box>
  );
}
export default DescriptionContentCard;
