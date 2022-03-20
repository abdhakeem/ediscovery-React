import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import AccountSettings from './content/pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Authentication = Loader(
  lazy(() => import('src/content/authentication/login'))
);
const Register = Loader(
  lazy(() => import('src/content/authentication/register'))
);

// Dashboards

const Cases = Loader(lazy(() => import('src/content/dashboards/Cases')));
const Documents = Loader(
  lazy(() => import('src/content/dashboards/Documents'))
);
const Files = Loader(lazy(() => import('src/content/dashboards/Files')));
const Search = Loader(lazy(() => import('src/content/dashboards/Search')));
const View = Loader(lazy(() => import('src/content/dashboards/View')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Authentication />
      },
      {
        path: 'login',
        element: <Authentication />
      },
      {
        path: 'register',
        children: [
          {
            path: '/',
            element: <Register />
          }
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboards/cases" replace />
      },
      {
        path: 'cases',
        element: <Cases />
      },
      {
        path: 'cases/:token',
        element: <Cases />
      },
      {
        path: 'case/:caseid',
        element: <Documents />
      },
      {
        path: 'files/:caseid/:docid',
        element: <Files />
      },
      {
        path: 'search/:caseid',
        element: <Search />
      },
      {
        path: 'search/:caseid/:docid',
        element: <Search />
      },
      {
        path: 'search/:caseid/:docid/:fileid',
        element: <Search />
      },
      {
        path: 'view/:caseid/:docid/:fileid/:filename',
        element: <View />
      }
    ]
  },
  {
    path: 'settings',
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <AccountSettings />
      }
    ]
  }
];

export default routes;
