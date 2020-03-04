import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { clearAuthTokens, IAuthTokens, setAuthTokens, useAuthTokenInterceptor } from 'axios-jwt';
import { install } from './install'; // More flow shit

const defaultTransformer = response => ({
  accessToken: response.data.access_token,
  refreshToken: response.data.refresh_token
});

export const login = tokens => setAuthTokens;
export const logout = () => clearAuthTokens;
export default class AxiosJwtHandler {
  constructor(options) {
    this.app = null;
    this.refreshEndpoint = options.refresh_endpoint;
    this.loginEndpoint = options.login_endpoint;
    this.instance = options.instance || axios.create();
    this.transformer = options.transformer || defaultTransformer;
    this.login = login;
    this.logout = logout;
  }

  refresh() {
    return new Promise((resolve, reject) => {
      axios.post(this.refreshEndpoint).then(response => {
        return resolve(this.transformer(response));
      }, reject);
    });
  }

}
AxiosJwtHandler.install = install;