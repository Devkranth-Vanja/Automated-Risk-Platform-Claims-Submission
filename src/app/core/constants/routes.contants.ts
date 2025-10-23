export const ROUTES = {
  DASHBOARD: '/dashboard',
  CLAIMANTS: {
    BASE: '/claimants',
    NEW: '/claimants/new-claimant',
    LIST: '/claimants/claimant-list',
    EDIT: (claimantId: number) => `/claimants/edit-claimant/${claimantId}`,
  },
  CLAIMS: {
    BASE: '/claims',
    NEW: '/claims/new-claim',
    LIST: '/claims/claim-list',
    DETAILS: (id: number) => `/claims/claim-details/${id}`
  },
  POLICIES: {
    BASE: '/policies',
    LIST: '/policies/list',
    ADD: '/policies/add',
    EDIT: (id: number) => `/policies/edit/${id}`,
    DELETE: '/policies/delete', // optional — you can handle deletion from list view
    DETAILS: (id: number) => `/policies/details/${id}`,
    ACTIVE: '/policies/active',
    EXPIRED: '/policies/expired'
  },
  REPORTS: {
    CLAIMS: '/reports/claims',
    POLICIES: '/reports/policies',
    FINANCIAL: '/reports/financial'
  },
  SETTINGS: {
    PROFILE: '/settings/profile',
    PREFERENCES: '/settings/preferences'
  },
  SUPPORT: {
    HELP: '/support/help',
    FAQ: '/support/faq',
    CONTACT: '/support/contact'
  }
};
