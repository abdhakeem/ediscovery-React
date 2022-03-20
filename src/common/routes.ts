const Separator = '/';

//Page name only
export const Page = {
  Login: 'login',
  Dashboard: 'dashboards',
  MyCases: 'cases',
  Case: 'case',
  AccSettings: 'settings'
};

//Full url of each Page
export const eDiscoveryUrl = {
  Login: Separator + Page.Login,
  Dashboard: Separator + Page.Dashboard,
  MyCases: Separator + [Page.Dashboard, Page.MyCases].join(Separator),
  Case: Separator + [Page.Dashboard, Page.Case].join(Separator),
  AccSettings: Separator + Page.AccSettings
};
