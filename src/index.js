/* @flow */

import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {clearAuthTokens, IAuthTokens, setAuthTokens, useAuthTokenInterceptor} from 'axios-jwt';
import { install } from './install'
import {IAxiosJwtHandlerOptions} from '../types';


const defaultTransformer = (response: AxiosResponse): IAuthTokens => ({
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token
});

export const login = (tokens: IAuthTokens): void => setAuthTokens;
export const logout = (): void => clearAuthTokens;

export default class AxiosJwtHandler {
    static install: () => void;

    refreshEndpoint: string;
    loginEndpoint: string;
    instance: AxiosInstance;
    app: any;

    constructor(options: IAxiosJwtHandlerOptions) {
        this.app = null;
        this.refreshEndpoint = options.refresh_endpoint;
        this.loginEndpoint = options.login_endpoint;
        this.instance = options.instance || axios.create();
        this.transformer = options.transformer || defaultTransformer;
        this.login = login;
        this.logout = logout;

        useAuthTokenInterceptor(this.instance, {
            requestRefresh: this.refresh
        });
    }

    refresh(): Promise<string> {
        return new Promise((resolve, reject) => {
            axios.post(this.refreshEndpoint)
                .then((response) => {
                    return resolve(this.transformer(response));
                }, reject)
        })
    }
}

AxiosJwtHandler.install = install;
