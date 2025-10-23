import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  claimServiceApiUrl: 'https://localhost:7041/api/v1' // Update with your API base URL
};
