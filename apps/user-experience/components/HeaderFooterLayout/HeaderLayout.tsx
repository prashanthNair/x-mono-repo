import getConfig from "next/config";
import dynamic from "next/dynamic";
import React from "react";
import { getDomainUrl, navigateTo } from "../../utils/helperFunctions";
import { useRouter } from "next/router";

const { publicRuntimeConfig = {} } = getConfig() || {};

const HeaderLayout = (props: any) => {
  const {
    route = {},
    MenuData = [],
    authState = {},
    showHeader = false,
    footerSettingData = {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logoutButtonHandle = () => {},
    isEcomPage = false, //ecom purpose
    isProductUpdateCount = 0, //ecom purpose
    onLogin,
    host = "",
    locale = "",
  } = props;

  const headerFooterData = {
    Menus: MenuData || [],
  };

  const DynamicHeader: any = dynamic(
    () => import(`platform-x-prelems/prelems/HeaderFooter`).then((mod) => mod.Header),
    { ssr: false },
  );

  const router = useRouter();
  const tempHide = true;

  return (
    <>
      {showHeader && tempHide ? (
        <DynamicHeader
          isAuthoring={false}
          onLogin={onLogin}
          homePageUrl={publicRuntimeConfig?.NEXT_PUBLISH_APP_URL}
          data={{
            ...headerFooterData,
            ...footerSettingData,
          }}
          authData={authState}
          logoutButtonHandle={logoutButtonHandle}
          langCode={route?.locale}
          isEcomPage={isEcomPage}
          isProductUpdateCount={isProductUpdateCount}
          gcpUrl={publicRuntimeConfig?.NEXT_GCP_URL}
          bucketName={publicRuntimeConfig?.NEXT_BUCKET_NAME}
          handleMyProfile={() => navigateTo(router, `/${router?.locale}/user/profile`)}
          navigateToCartPage={() => navigateTo(router, `/${router?.locale}/ecommerce/cart-list`)}
          handleChangePassword={() => navigateTo(router, `/${router?.locale}/user/changepassword`)}
          secondaryArgs={{
            site_host: host,
            publishEndPoint: getDomainUrl(host),
            locale: locale,
            deliveryUrl: publicRuntimeConfig.NEXT_DELIVERY_ENGINE,
          }}
        />
      ) : null}
    </>
  );
};
export default React.memo(HeaderLayout);