import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { clearAuthTokens, IAuthTokens, setAuthTokens } from 'axios-jwt';
import { install } from './install';
import { IAxiosJwtHandlerOptions } from '../types';

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
    this.instance = options.instance || axios;
    this.transformer = options.transformer || defaultTransformer;
    this.login = login;
    this.logout = logout;
  }

  refresh() {
    return new Promise((resolve, reject) => {
      this.instance.post(this.refreshEndpoint).then(response => {
        return resolve(this.transformer(response));
      }, reject);
    });
  }

}
AxiosJwtHandler.install = install;