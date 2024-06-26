import { useEffect, useState } from "react";
import { nullToObject } from "../../../utils/helperFunctions";
import { useSnowplowTracking } from "./snowplowTrackingHook";

export const usePageImpression = (
  pageData: any,
  inView: boolean,
  instances: any,
  snowplowContentType: string,
  route: any,
  site_host: any,
) => {
  const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);
  const { pageImpressionsObject } = useSnowplowTracking();

  useEffect(() => {
    let isMounted = true;
    const performImpressions = () => {
      if (
        (pageData?.analytics_enable || pageData?.AnalyticsEnable) &&
        enableImpressionTracking &&
        inView &&
        Object.keys(nullToObject(instances)).length > 0
      ) {
        pageImpressionsObject(pageData, snowplowContentType, route?.locale, instances, site_host);
        if (isMounted) {
          setEnableImpressionTracking(false);
        }
      }
    };
    performImpressions();

    return () => {
      isMounted = false;
    };
  }, [inView, Object.keys(nullToObject(instances)).length]);
};
