export const environment = {
  production: true,
  apiUrl: $ENV.API_URL,
  apiEndpoint: '/api',
  odataEndpoint: '/odata/',
  appName: 'Reyhan Accounting',
  i18nPrefix: '',
  defaultLanguage: 'fa',
  supportedLanguages: ['en', 'fa'],
  appConfig: {
    checkUpdatePeriod: 1000 * 60 * 60 * 6, // 6 hours
    defaultTabPage: 'desktop'
  }
};
