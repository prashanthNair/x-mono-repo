import { Typography } from "@mui/material";
import { AssetListing, CreateAsset } from "@platformx/asset-manager";
import { CreateSpace } from "@platformx/community";
import { Content, CreateArticle, CreateContent, TimeLineBlogs } from "@platformx/content";
import {
  CommonPreview,
  CommonContentRender,
  getCurrentLang,
  getSelectedSite,
} from "@platformx/utilities";
import { CreateCourse } from "@platformx/course";
import { Dashboard, Charts } from "@platformx/dashboard";
import NavTreeCreation from "@platformx/nav-menu";
import {
  EditPage,
  PagePreview,
  PrelemInfo,
  PrelemPreview,
  SearchPrelem,
} from "@platformx/site-page";
import {
  CategoryDetail,
  CookieSetting,
  CreateTags,
  FeatureFlagSetting,
  FooterSetting,
  GlobalSetting,
  HeaderSetting,
  MediaHandle,
  TagListing,
} from "@platformx/site-setting";
import { AddSite, SiteListing } from "@platformx/sites";
import { CreateUserGroup, UserGroupListing } from "@platformx/user-groups";
import { CreateUser, UserListing } from "@platformx/user-management";
import { WorkflowDetails, WorkflowManagement } from "@platformx/workflow-management";
import { Suspense } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { RouteConfig } from "./routes.type";

const iframedurl = `${window?.location?.origin}/${getSelectedSite()}/${getCurrentLang()}/content/common/preview`;
export const routes: RouteConfig[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/overview",
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard'>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports/user-engagement",
    element: (
      <ProtectedRoute category='reports' subCategory=''>
        <Suspense fallback={<Typography variant='h3bold'>Loading...</Typography>}>
          <Charts dashboardName='userEngagement' heading='user_engagement' />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports/web-master",
    element: (
      <ProtectedRoute category='reports' subCategory=''>
        <Suspense fallback={<Typography variant='h3bold'>Loading...</Typography>}>
          <Charts dashboardName='webMaster' heading='web_master' />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/article",
    element: (
      <ProtectedRoute category='content' subCategory='article' name='article'>
        <Content></Content>
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/quiz",
    element: (
      <ProtectedRoute category='content' subCategory='quiz' name='quiz'>
        <Content></Content>
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/poll",
    element: (
      <ProtectedRoute category='content' subCategory='article' name='poll'>
        <Content></Content>
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/event",
    element: (
      <ProtectedRoute category='content' subCategory='event' name='event'>
        <Content></Content>
      </ProtectedRoute>
    ),
  },
  {
    path: "/search-results",
    element: (
      <ProtectedRoute category='search-results' subCategory='search-results' name='search-results'>
        <Content></Content>
      </ProtectedRoute>
    ),
  },
  {
    path: "/workflow/workflow-list",
    element: (
      <ProtectedRoute name='article' subCategory='article' category='content'>
        <WorkflowManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workflow/workflow-details",
    element: (
      <ProtectedRoute name='article' subCategory='article' category='content'>
        <WorkflowDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "user-management/user-create",
    element: (
      <ProtectedRoute
        name='user'
        category='UserManagement'
        subCategory=''
        isHeader={false}
        isSideBar={false}>
        <CreateUser />
      </ProtectedRoute>
    ),
  },

  {
    path: "/content/:contentType",
    element: (
      <ProtectedRoute name='quiz' subCategory='quiz' category='content'>
        <CreateContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/community/create-space",
    element: (
      <ProtectedRoute
        name='space'
        category='public'
        subCategory='public'
        isHeader={false}
        isSideBar={false}>
        <CreateSpace />
      </ProtectedRoute>
    ),
  },
  {
    path: "/navtree",
    element: (
      <ProtectedRoute
        name='navigation'
        category='menu'
        subCategory=''
        isSideBar={false}
        isHeader={false}>
        <NavTreeCreation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/preview",
    element: (
      <ProtectedRoute
        name='content'
        category='content'
        subCategory='content-preview'
        isSideBar={false}
        isHeader={false}>
        <CommonPreview iframeUrl={iframedurl} type='content' />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/common/preview",
    element: (
      <ProtectedRoute
        name='content'
        category='content'
        subCategory='content-preview'
        isSideBar={false}
        isHeader={false}>
        <CommonContentRender />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-course",
    element: (
      <ProtectedRoute
        name='course'
        subCategory=''
        category='content'
        isHeader={false}
        isSideBar={false}>
        <CreateCourse />
      </ProtectedRoute>
    ),
  },
  {
    path: "/asset/images",
    element: (
      <ProtectedRoute category='Assets' subCategory=''>
        <AssetListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/asset/videos",
    element: (
      <ProtectedRoute category='Assets' subCategory=''>
        <AssetListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/asset/create",
    element: (
      <ProtectedRoute category='Assets' subCategory=''>
        <CreateAsset />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/media-handle",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='MediaHandle'>
        <MediaHandle />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/global-setting",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='GlobalSetting'>
        <GlobalSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/footer-setting",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='FooterSetting'>
        <FooterSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/header-setting",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='HeaderSetting'>
        <HeaderSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/cookie-setting",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='CookieSetting'>
        <CookieSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/feature-flag",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='GlobalSetting'>
        <FeatureFlagSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/tags",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='Tag'>
        <TagListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/tags/:category",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='Tag'>
        <CategoryDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/create-tags",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='Tag'>
        <CreateTags />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/create-tags/:docPath",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='Tag'>
        <CreateTags />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sites/site-creation",
    element: (
      <ProtectedRoute category='site' subCategory='Sites' isHeader={false} isSideBar={false}>
        <AddSite />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sites/site-creation/:siteName",
    element: (
      <ProtectedRoute category='site' subCategory='Sites' isHeader={false} isSideBar={false}>
        <AddSite />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sites/site-listing",
    element: (
      <ProtectedRoute category='site' subCategory='Sites'>
        <SiteListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-article",
    element: (
      <ProtectedRoute
        name='article'
        category='content'
        subCategory='article'
        isHeader={false}
        isSideBar={false}>
        <CreateArticle />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/vod",
    element: (
      <ProtectedRoute category='content' subCategory='vod' name='vod'>
        <Content></Content>
      </ProtectedRoute>
    ),
  },
  {
    path: "/sitepage",
    element: (
      <ProtectedRoute category='page' subCategory='SitePage' name='SitePage'>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workflow/workflow-list",
    element: (
      <ProtectedRoute category='Workflow' subCategory='' name='workflow-list'>
        <WorkflowManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create/user-groups",
    element: (
      <ProtectedRoute name='quiz' subCategory='' category='community'>
        <CreateUserGroup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update/user-groups",
    element: (
      <ProtectedRoute name='user-groups' subCategory='' category='community'>
        <CreateUserGroup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/community/user-groups",
    element: (
      <ProtectedRoute name='quiz' subCategory='' category='community'>
        <UserGroupListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-management/user-list",
    element: (
      <ProtectedRoute category='UserManagement' subCategory='users' name='UserManagement'>
        <UserListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-blog",
    element: (
      <ProtectedRoute
        name='page'
        category='public'
        subCategory='public'
        isHeader={false}
        isSideBar={false}>
        <TimeLineBlogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prelem-search",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <SearchPrelem />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prelem-search/about",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <PrelemInfo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prelem-search/preview",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <PrelemPreview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/preview-page/:device",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <PagePreview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-page",
    element: (
      <ProtectedRoute name='page' category='page' subCategory='' isSideBar={false} isHeader={false}>
        <EditPage></EditPage>
      </ProtectedRoute>
    ),
  },
];
