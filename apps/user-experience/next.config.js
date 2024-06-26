const { composePlugins, withNx } = require("@nx/next");
const withImages = require("next-images");
const withFonts = require("next-fonts");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // reactStrictMode: false,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@platformx/x-prelems-library", "@mui/material", "@platformx/utilities"],
  compiler: {
    // For other options, see https://styled-components.com/docs/tooling#babel-plugin
    styledComponents: true,
    removeConsole: process.env.NEXT_ELASTIC_APM_ENVIRONMENT !== "develop",
  },
  images: {
    domains: ["storage.googleapis.com"],
    disableStaticImages: true,
  },
  headers() {
    return [
      {
        // Sets security headers for all routes
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Added a loader for font files
    config.module.rules.push(
      //   {
      //     test: /\.(woff|woff2|eot|ttf|otf)$/,
      //     use: {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         outputPath: "static/fonts/",
      //         publicPath: "/_next/static/fonts/",
      //       },
      //     },
      //   },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.node$/,
      //   use: "raw-loader",
      // },
    );

    //   // Conditionally exclude @platformx/x-prelem-library from server-side bundling
    //   if (!isServer) {
    //     config.externals.push("@platformx/x-prelem-library");
    //   }

    return config;
  },
  publicRuntimeConfig: {
    NEXT_GA_ID: process.env.NEXT_GA_ID,
    NEXT_GTM_ID: process.env.NEXT_GTM_ID,
    NEXT_PUBLISH_APP_URL: process.env.NEXT_PUBLISH_APP_URL,
    NEXT_PUBLISH_API_URL: process.env.NEXT_PUBLISH_API_URL,
    NEXT_CLUSTER_API_URL: process.env.NEXT_CLUSTER_API_URL,
    NEXT_GOOGLE_SEARCH_VERIFICATION: process.env.NEXT_GOOGLE_SEARCH_VERIFICATION,
    NEXT_PUBLISH_API_URL_GENERIC: process.env.NEXT_PUBLISH_API_URL_GENERIC,
    NEXT_API_URL: process.env.NEXT_API_URL,
    NEXT_BLOGS_API: process.env.NEXT_BLOGS_API,
    NEXT_CLIENT_ID: process.env.NEXT_CLIENT_ID,
    NEXT_GRANT_TYPE: process.env.NEXT_GRANT_TYPE,
    NEXT_REALM: process.env.NEXT_REALM,
    NEXT_LOGOUT: process.env.NEXT_LOGOUT,
    NEXT_AUTH: process.env.NEXT_AUTH,
    NEXT_SESSION_VERIFY: process.env.NEXT_SESSION_VERIFY,
    NEXT_SESSION: process.env.NEXT_SESSION,
    NEXT_ELASTIC_APM_SERVER_URL: process.env.NEXT_ELASTIC_APM_SERVER_URL,
    NEXT_ELASTIC_APM_ENVIRONMENT: process.env.NEXT_ELASTIC_APM_ENVIRONMENT,
    NEXT_ELASTIC_APM_TRACING: process.env.NEXT_ELASTIC_APM_TRACING,
    NEXT_GEOLOCATION_API_URL: process.env.NEXT_GEOLOCATION_API_URL,
    NEXT_GEOLOCATION_API_KEY: process.env.NEXT_GEOLOCATION_API_KEY,
    NEXT_GCP_URL: process.env.NEXT_GCP_URL,
    NEXT_BUCKET_NAME: process.env.NEXT_BUCKET_NAME,
    NEXT_SNOWPLOW_APP_ID: process.env.NEXT_SNOWPLOW_APP_ID,
    NEXT_SNOWPLOW_COLLECTOR_URL: process.env.NEXT_SNOWPLOW_COLLECTOR_URL,
    NEXT_USER_SERVICE_APP_URL: process.env.NEXT_USER_SERVICE_APP_URL,
    NEXT_SITE_HOST: process.env.NEXT_SITE_HOST,
    NEXT_RPI_PUBLISH_ID: process.env.NEXT_RPI_PUBLISH_ID,
    NEXT_RPI_CLIENT_ID: process.env.NEXT_RPI_CLIENT_ID,
    NEXT_RPI_AUTH_KEY: process.env.NEXT_RPI_AUTH_KEY,
    NEXT_RPI_VIEW_NAME: process.env.NEXT_RPI_VIEW_NAME,
    NEXT_LOYALTY_END_POINT: process.env.NEXT_LOYALTY_END_POINT,
    NEXT_LOYALTY_PORTAL_END_POINT: process.env.NEXT_LOYALTY_PORTAL_END_POINT,
    NEXT_PAGE_IMPRESSIONS_SCHEMA: process.env.NEXT_PAGE_IMPRESSIONS_SCHEMA,
    NEXT_SNOWPLOW_PRELEM_IMPRESSIONS: process.env.NEXT_SNOWPLOW_PRELEM_IMPRESSIONS,
    NEXT_SNOWPLOW_CLICK_IMPRESSIONS: process.env.NEXT_SNOWPLOW_CLICK_IMPRESSIONS,
    NEXT_SNOWPLOW_REGISTER_USER_IMPRESSIONS: process.env.NEXT_SNOWPLOW_REGISTER_USER_IMPRESSIONS,
    NEXT_SNOWPLOW_PLACE_ORDER_IMPRESSIONS: process.env.NEXT_SNOWPLOW_PLACE_ORDER_IMPRESSIONS,
    NEXT_SITE_BASED_THEME: process.env.NEXT_SITE_BASED_THEME,
    NEXT_DELIVERY_ENGINE: process.env.NEXT_DELIVERY_ENGINE,
  },
  staticPageGenerationTimeout: 1000,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "fr", "de"],
    defaultLocale: "en",
  },
  rewrites: async () => {
    return await [
      {
        source: "/healthcheck/healthz",
        destination: "/api/healthz",
      },
    ];
  },
};
const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withImages,
  withFonts,
  withBundleAnalyzer,
];

module.exports = composePlugins(...plugins)(nextConfig);
