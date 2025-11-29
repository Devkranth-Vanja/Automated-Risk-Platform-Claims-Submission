import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  claimServiceApiUrl: 'http://localhost:8085/api/v1' // Update with your API base URL
};
