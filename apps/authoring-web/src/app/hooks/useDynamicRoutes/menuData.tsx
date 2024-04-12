import { Space } from "@platformx/community";
import { Content } from "@platformx/content";
import {
  ApprovalStatus,
  ArticleIcon,
  CookieIcon,
  BookIcon,
  EventsIcon,
  FeatureStarIcon,
  FooterMenuUpdated,
  HamburgerMenuIcon,
  HeaderMenuUpdated,
  GlobalSetting,
  MediaIcon,
  VideoNav,
  MyDashboardIcon,
  PagesIcon,
  PollIcon,
  PostIconMenu,
  QuizIcon,
  SitesIcon,
  UserEngagmentIcon,
  UsersIcon,
  VODIcon,
  Webmaster,
  TagIcon,
  GroupUsersIcon,
  communitySpaceIcon,
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
      Icon: ArticleIcon,
      url: "/content/profile",
      category: "content",
      subCategory: "",
      id: "Profile",
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
      Icon: BookIcon,
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
        MenuName: "Overview",
        Icon: MyDashboardIcon,
        url: "/dashboard/overview",
        id: "overview",
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
  {
    Title: "reports",
    id: "reports",
    Menu: [
      {
        MenuName: "User Engagement",
        Icon: UserEngagmentIcon,
        url: "/reports/user-engagement",
        id: "user_engagement",
        category: "reports",
        subCategory: "",
      },
      {
        MenuName: "Web Master",
        Icon: Webmaster,
        url: "/reports/web-master",
        id: "web_master",
        category: "reports",
        subCategory: "",
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
        Icon: communitySpaceIcon,
        url: "/community/space",
        id: "community_space",
        category: "Community",
        subCategory: "spaces",
        roles: ["admin", "Super Admin"],
        component: <Space />,
      },
      {
        MenuName: "User groups",
        Icon: GroupUsersIcon,
        url: "/community/user-groups",
        id: "User Groups",
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
        component: <WorkflowManagement></WorkflowManagement>,
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
        Icon: GlobalSetting,
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
      {
        MenuName: "Tags",
        Icon: TagIcon,
        url: "/site-setting/tags",
        id: "tags_categories",
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
  {
    url: "",
    Title: "Assets",
    id: "assets",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "images",
        Icon: MediaIcon,
        url: "/asset/images",
        id: "Images",
        category: "Assets",
        subCategory: "",
      },
      {
        MenuName: "videos",
        Icon: VideoNav,
        url: "/asset/videos",
        id: "Videos",
        category: "Assets",
        subCategory: "",
      },
      // {
      //   MenuName: "Document",
      //   Icon: MediaIcon,
      //   url: "/asset/docs",
      //   id: "Document",
      //   category: "Assets",
      //   subCategory: "",
      // },
    ],
  },
];
