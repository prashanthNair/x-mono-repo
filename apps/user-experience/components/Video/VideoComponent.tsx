import dynamic from "next/dynamic";

const VideoPrelem = dynamic(
  () => import("@platformx/x-prelems-library").then((mod) => mod.VideoLandingPage),
  {
    ssr: false,
  },
);
const VideoComponent = (props) => {
  const { pageData = {}, secondaryArgs = {} } = props;
  const analyticsProp = {
    pageId: pageData?.Page,
    pageTitle: pageData?.PageSettings?.Page,
    pageDesc: pageData?.PageSettings?.Description,
    pageTags: pageData?.Tags?.join(", "),
    isAuthoring: false,
    isSeoEnabled: pageData?.SeoEnable,
    isAnalyticsEnabled: pageData?.AnalyticsEnable,
  };

  const prelemAuthoringHelper = {
    isAuthoring: false,
  };

  return (
    <VideoPrelem
      content={pageData}
      analytics={analyticsProp}
      secondaryArgs={secondaryArgs}
      authoringHelper={prelemAuthoringHelper}
    />
  );
};

export default VideoComponent;
