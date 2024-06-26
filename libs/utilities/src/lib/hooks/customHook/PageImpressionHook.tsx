import { useEffect, useState } from "react";
import { nullToObject } from "../../utils/helperFns";
import { useSnowplowTrackingHook } from "./snowplowTrackingHook";

export const usePageImpression = (
  pageData: any,
  inView: boolean,
  instances: any,
  snowplowContentType: string,
  route: any,
  site_host: any,
) => {
  const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);
  const { pageImpressionsObject } = useSnowplowTrackingHook();
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
