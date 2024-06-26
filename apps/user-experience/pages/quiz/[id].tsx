import { Box } from "@mui/material";
import PageHead from "../../components/pageHead";
import { useInView } from "react-intersection-observer";
import { QuizComponent } from "../../components/Quiz/QuizComponent";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import {
  navigateToHome,
  nullToObject,
  prelemBaseEndpointObj,
  snowplowSchemaUrl,
} from "../../utils/helperFunctions";
import getConfig from "next/config";
import { CONTENT_TYPES, SNOWPLOW } from "../../constants/CommonConstants";
import { getInitialData } from "../../utils/helperInitialData";
import { usePageImpression } from "../../components/Common/customHook/PageImpressionHook";

const { publicRuntimeConfig = {} } = getConfig() || {};

export async function getServerSideProps(context) {
  const { query = {}, locale = "", req } = context;
  const { id = "" } = query;
  const host = req.headers.host || "";

  const [, footerSettingData, contentResponse] = await getInitialData(
    CONTENT_TYPES.QUIZ,
    id,
    locale || "en",
    host,
  );

  if (Object.keys(nullToObject(contentResponse?.fetchQuizContent)).length === 0)
    return navigateToHome(locale);

  return {
    props: {
      route: { ...query, locale: locale, query: id, host },
      pageData: contentResponse?.fetchQuizContent || {},
      type: "",
      footerSettingData: footerSettingData,
      site_host: host,
    },
  };
}

const Quiz = (props: any) => {
  const { pageProps = {}, instances = {} } = props;
  const { pageData = {}, route, site_host } = pageProps;
  const { footerSettingData = "" } = props;

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  usePageImpression(pageData, inView, instances, SNOWPLOW.CONTENT_TYPE.QUIZ, route, site_host);

  return (
    <Box ref={ref}>
      <ErrorBoundary>
        {/* page head */}
        <PageHead
          pageData={{
            ...pageData,
            settings: {
              ...pageData.settings,
              socialog_title: pageData.title,
            },
          }}
          favIcon={footerSettingData?.fav_icon}
        />

        <QuizComponent
          pageData={pageData}
          secondaryArgs={{
            prelemBaseEndpoint,
            ...snowplowSchemaUrl(),
            gcpUrl: publicRuntimeConfig.NEXT_GCP_URL,
            bucketName: publicRuntimeConfig.NEXT_BUCKET_NAME,
          }}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default Quiz;
