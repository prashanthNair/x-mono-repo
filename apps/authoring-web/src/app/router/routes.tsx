import { Dashboard } from '@platformx/dashboard'
import { CreateUser, UserListing } from '@platformx/user-management'
import { CreateCourse } from '@platformx/content'
import {
  WorkflowDetails,
  WorkflowManagement,
} from '@platformx/workflow-management'
import { ProtectedRoute } from './ProtectedRoute'
import { RouteConfig } from './routes.type'
import { CreateContent } from "@platformx/content"
export const routes: RouteConfig[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute
        category="dashboard"
        subCategory="dashboard"
        name="dashboard"
      >
        {' '}
        <Dashboard />{' '}
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute
        category="dashboard"
        subCategory="dashboard"
        name="dashboard"
      >
        {' '}
        <Dashboard />{' '}
      </ProtectedRoute>
    ),
  },
  {
    path: '/user-management/user-list',
    element: (
      <ProtectedRoute
        category="user-list"
        subCategory="user-list"
        name="user-list"
      >
        {' '}
        <UserListing></UserListing>
      </ProtectedRoute>
    ),
  },
  {
    path: '/workflow/workflow-list',
    element: (
      <ProtectedRoute name="article" subCategory="article" category="content">
        <WorkflowManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: '/workflow/workflow-details',
    element: (
      <ProtectedRoute name="article" subCategory="article" category="content">
        <WorkflowDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: 'user-management/user-create',
    element: (
      <ProtectedRoute
        name="user"
        category="UserManagement"
        subCategory=""
        isHeader={false}
        isSideBar={false}
      >
        <CreateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create",
    element: (
      <ProtectedRoute name='quiz' subCategory='quiz' category='content'>
        <CreateContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create",
    element: (
      <ProtectedRoute  name='course'
      subCategory='course'
      category='content'>
        <CreateContent />
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
        isSideBar={false}
        >
        <CreateCourse />
      </ProtectedRoute>
    ),
  },

  // {
  //   path: "/content",
  //   element: <ProtectedRoute category="content" subCategory="content" name="page" >  <Content></Content> </ProtectedRoute>,

  // },
  // {
  //   path: "/dashboard",
  //   element: <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard" >  Dashboard </ProtectedRoute>,

  // },
  // {
  //   path: "content/article",
  //   element: (
  //     <ProtectedRoute name='article' subCategory='article' category='content'>
  //       <Content />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/error",
  //   element: <Error errorCode={404} errorMessage="Page not found" />,
  // }
]
