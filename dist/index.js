import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { clearAuthTokens, IAuthTokens, setAuthTokens, useAuthTokenInterceptor } from 'axios-jwt';
import { install } from './install';
import _Vue from 'vue'; // More flow shit

export const login = tokens => {
  return setAuthTokens(tokens);
};
export const logout = () => {
  return clearAuthTokens();
};

function tokenTransformer(response) {
  return {
    refreshToken: response.data.refresh_token,
    accessToken: response.data.access_token
  };
}

export default class AxiosJwtHandler {
  constructor(options) {
    this.app = null;
    this.refreshEndpoint = options.refresh_endpoint;
    this.loginEndpoint = options.login_endpoint;
    this.instance = options.instance || axios.create();
    this.transformer = options.transformer || tokenTransformer;
    this.login = login;
    this.logout = logout;
    this.refresh = this.refresh.bind(this);
    this.init = this.init.bind(this);
    this.eventBus = new _Vue({});
  }

  refresh(refresh) {
    return new Promise((resolve, reject) => {
      axios.post(this.refreshEndpoint, {
        refresh: refresh
      }).then(response => {
        return resolve(this.transformer(response).accessToken);
      }, reject);
    });
  }

  init(app) {
    if (this.app) {
      return;
    }

    this.app = app;
    useAuthTokenInterceptor(this.instance, {
      requestRefresh: this.refresh
    });
    return this;
  }

}
AxiosJwtHandler.install = install;