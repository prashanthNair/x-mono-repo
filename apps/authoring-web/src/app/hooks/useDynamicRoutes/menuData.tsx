import { Content } from "@platformx/content";
import {
  ApprovalStatus,
  ArticleIcon,
  CookieIcon,
  CourseIcon,
  EventsIcon,
  FeatureStarIcon,
  FooterMenuUpdated,
  HamburgerMenuIcon,
  HeaderMenuUpdated,
  MediaIcon,
  MyDashboardIcon,
  PagesIcon,
  PollIcon,
  PostIconMenu,
  QuizIcon,
  SitesIcon,
  UsersIcon,
  VODIcon,
} from "@platformx/utilities";
import { WorkflowManagement } from "@platformx/workflow-management";

const ContentRoutes = {
  url: "",
  Title: "content",
  id: "content",
  Menu: [
    {
      MenuName: "Article",
      Icon: ArticleIcon,
      url: "/content/article",
      id: "article",
      category: "content",
      subCategory: "article",
      component: <Content></Content>,
    },
    {
      MenuName: "VOD",
      Icon: VODIcon,
      url: "/content/vod",
      category: "content",
      subCategory: "vod",
      id: "vod",
      component: <Content></Content>,
    },
    {
      MenuName: "Quiz",
      Icon: QuizIcon,
      url: "/content/quiz",
      category: "content",
      subCategory: "quiz",
      id: "quiz",
      component: <Content></Content>,
    },
    {
      MenuName: "Poll",
      Icon: PollIcon,
      url: "/content/poll",
      category: "content",
      subCategory: "poll",
      id: "poll",
      component: <Content></Content>,
    },
    {
      MenuName: "Profile",
      Icon: PollIcon,
      url: "content/profile",
      category: "content",
      subCategory: "profile",
      id: "profile",
      component: <Content></Content>,
    },
    {
      MenuName: "Events",
      Icon: EventsIcon,
      url: "/content/event",
      category: "content",
      subCategory: "event",
      id: "events",
      component: <Content></Content>,
    },
    {
      MenuName: "Courses",
      Icon: CourseIcon,
      url: "/content/course",
      category: "content",
      subCategory: "",
      id: "course",
      component: <Content></Content>,
    },
    // {
    //   MenuName: 'Community',
    //   Icon: Community,
    //   url: '/content/community',
    //   category: 'content',
    //   subCategory: '',
    //   id: 'Community',
    //   component:<Content></Content> ,
    // },
  ],
};

export const MenuData = [
  {
    Title: "dashboard",
    id: "dashboard",
    category: "dashboard",
    subCategory: "",
    Menu: [
      {
        MenuName: "My Dashboard",
        Icon: MyDashboardIcon,
        url: "/dashboard",
        id: "dashboard",
        category: "dashboard",
        subCategory: "",
      },
      // {
      //   MenuName: "Prelem",
      //   Icon: MyDashboardIcon,
      //   url: "/prelem",
      //   id: "prelem",
      //   category: "dashboard",
      //   subCategory: "",
      // },
    ],
  },
  {
    Title: "pages",
    id: "page",
    url: "/page-list",
    Menu: [
      {
        MenuName: "Pages",
        Icon: PagesIcon,
        url: "/sitepage",
        id: "pages",
        category: "page",
        subCategory: "",
        component: <Content></Content>,
      },
    ],
  },
  ContentRoutes, // TODO: remove this once API is ready
  {
    Title: "Community",
    id: "community",
    roles: ["admin", "Super Admin"],
    Menu: [
      {
        MenuName: "Community",
        Icon: SitesIcon,
        url: "/community/space",
        id: "community_space",
        category: "Community",
        subCategory: "spaces",
        roles: ["admin", "Super Admin"],
      },
    ],
  },
  {
    url: "",
    Title: "post",
    id: "post",

    Menu: [
      {
        MenuName: "All Posts",
        Icon: PostIconMenu,
        url: "/post/social-share-list",
        id: "all_posts",
        category: "Post",
        subCategory: "",
      },
    ],
  },
  {
    url: "/user-management/user-list",
    Title: "user_management",
    id: "usermanagement",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "Users",
        Icon: UsersIcon,
        url: "/user-management/user-list",
        id: "users",
        category: "UserManagement",
        subCategory: "users",
      },
    ],
  },
  {
    url: "/workflow/workflow-list",
    Title: "workflow",
    id: "workflow",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "workflow management",
        Icon: ApprovalStatus,
        url: "/workflow/workflow-list",
        id: "workflow_management",
        category: "Workflow",
        subCategory: "",
        component: <WorkflowManagement />,
      },
    ],
  },
  {
    url: "",
    Title: "menu",
    id: "menu",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "Menu",
        Icon: HamburgerMenuIcon,
        url: "/navtree",
        id: "menu",
        category: "Menu",
        subCategory: "",
        roles: ["admin"],
      },
    ],
  },
  {
    url: "",
    Title: "site_setting",
    id: "sitesetting",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "Footer Setting",
        Icon: FooterMenuUpdated,
        url: "/site-setting/footer-setting",
        id: "Footer_Setting",
        category: "SiteSetting",
        subCategory: "FooterSetting",
      },
      {
        MenuName: "Media Handle",
        Icon: MediaIcon,
        url: "/site-setting/media-handle",
        id: "media_handle",
        category: "SiteSetting",
        subCategory: "MediaHandle",
      },
      {
        MenuName: "Cookie Policy",
        Icon: CookieIcon,
        url: "/site-setting/cookie-setting",
        id: "cookie_policy",
        category: "SiteSetting",
        subCategory: "CookieSetting",
      },
      {
        MenuName: "Header Setting",
        Icon: HeaderMenuUpdated,
        url: "/site-setting/header-setting",
        id: "header_setting",
        category: "SiteSetting",
        subCategory: "HeaderSetting",
      },
      {
        MenuName: "Global Setting",
        Icon: HeaderMenuUpdated,
        url: "/site-setting/global-setting",
        id: "global_setting",
        category: "SiteSetting",
        subCategory: "GlobalSetting",
      },
      {
        MenuName: "Feature Setting",
        Icon: FeatureStarIcon,
        url: "/site-setting/feature-flag",
        id: "feature_flag_setting",
        category: "SiteSetting",
        subCategory: "GlobalSetting",
      },
    ],
  },
  {
    Title: "Sites",
    id: "site",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "Sites",
        Icon: SitesIcon,
        url: "/sites/site-listing",
        id: "Sites",
        roles: ["admin"],
        category: "Site",
        subCategory: "Sites",
      },
    ],
  },
];
