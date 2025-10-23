import { NavigationItem } from 'src/app/shared/model/NavigationItems';
import { ROUTES } from 'src/app/core/constants/routes.contants';

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard-group',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-dashboard',
    children: [
      {
        id: 'dashboard',
        title: 'Overview',
        type: 'item',
        url: ROUTES.DASHBOARD,
        icon: 'ti ti-layout-dashboard'
      }
    ]
  },
  {
    id: 'claims-group',
    title: 'Claims',
    type: 'group',
    icon: 'icon-claims',
    children: [
      {
        id: 'claims',
        title: 'Claims Management',
        type: 'collapse',
        icon: 'ti ti-file-description',
        children: [
          {
            id: 'new-claim',
            title: 'New Claim',
            type: 'item',
            url: ROUTES.CLAIMS.NEW,
            icon: 'ti ti-plus'
          },
          {
            id: 'claim-list',
            title: 'Claim List',
            type: 'item',
            url: ROUTES.CLAIMS.LIST,
            icon: 'ti ti-list'
          }
        ]
      }
    ]
  },
  {
    id: 'policies-group',
    title: 'Policies',
    type: 'group',
    icon: 'icon-policies',
    children: [
      {
        id: 'policies',
        title: 'Manage Policies',
        type: 'collapse',
        icon: 'ti ti-briefcase',
        children: [
          {
            id: 'add-policy',
            title: 'Add Policy',
            type: 'item',
            url: ROUTES.POLICIES.ADD,
            icon: 'ti ti-plus'
          },
          {
            id: 'policy-list',
            title: 'All Policies',
            type: 'item',
            url: ROUTES.POLICIES.LIST,
            icon: 'ti ti-list'
          }
        ]
      }
    ]
  },
  {
    id: 'claimants-group',
    title: 'Claimants',
    type: 'group',
    icon: 'icon-users',
    children: [
      {
        id: 'claimants',
        title: 'Manage Claimants',
        type: 'collapse',
        icon: 'ti ti-users',
        children: [
          {
            id: 'add-claimant',
            title: 'Add Claimant',
            type: 'item',
            url: ROUTES.CLAIMANTS.NEW,
            icon: 'ti ti-user-plus'
          }
          ,
          {
            id: 'claimant-list',
            title: 'Claimant List',
            type: 'item',
            url: ROUTES.CLAIMANTS.LIST,
            icon: 'ti ti-list'
          }
        ]
      }
    ]
  },
  {
    id: 'reports-group',
    title: 'Reports',
    type: 'group',
    icon: 'icon-reports',
    children: [
      {
        id: 'reports',
        title: 'Reports',
        type: 'collapse',
        icon: 'ti ti-chart-line',
        children: [
          {
            id: 'claims-reports',
            title: 'Claims Reports',
            type: 'item',
            url: ROUTES.REPORTS.CLAIMS,
            icon: 'ti ti-file-analytics'
          },
          {
            id: 'policies-reports',
            title: 'Policies Reports',
            type: 'item',
            url: ROUTES.REPORTS.POLICIES,
            icon: 'ti ti-folder'
          },
          {
            id: 'financial-reports',
            title: 'Financial Reports',
            type: 'item',
            url: ROUTES.REPORTS.FINANCIAL,
            icon: 'ti ti-currency-dollar'
          }
        ]
      }
    ]
  },
  {
    id: 'settings-group',
    title: 'Settings',
    type: 'group',
    icon: 'icon-settings',
    children: [
      {
        id: 'settings',
        title: 'User Settings',
        type: 'collapse',
        icon: 'ti ti-settings',
        children: [
          {
            id: 'profile-settings',
            title: 'Profile',
            type: 'item',
            url: ROUTES.SETTINGS.PROFILE,
            icon: 'ti ti-user'
          },
          {
            id: 'preferences',
            title: 'Preferences',
            type: 'item',
            url: ROUTES.SETTINGS.PREFERENCES,
            icon: 'ti ti-adjustments'
          }
        ]
      }
    ]
  },
  {
    id: 'support-group',
    title: 'Support',
    type: 'group',
    icon: 'icon-support',
    children: [
      {
        id: 'support',
        title: 'Help & Support',
        type: 'collapse',
        icon: 'ti ti-help-circle',
        children: [
          {
            id: 'help',
            title: 'Help Center',
            type: 'item',
            url: ROUTES.SUPPORT.HELP,
            icon: 'ti ti-life-buoy'
          },
          {
            id: 'faq',
            title: 'FAQ',
            type: 'item',
            url: ROUTES.SUPPORT.FAQ,
            icon: 'ti ti-question-mark'
          },
          {
            id: 'contact-support',
            title: 'Contact Support',
            type: 'item',
            url: ROUTES.SUPPORT.CONTACT,
            icon: 'ti ti-phone'
          }
        ]
      }
    ]
  }
];
