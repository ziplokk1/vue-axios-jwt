/* @flow */
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { clearAuthTokens, IAuthTokens, setAuthTokens, useAuthTokenInterceptor } from 'axios-jwt';
import { install } from './install'

// More flow shit
declare interface IAxiosJwtHandlerOptions {
    instance?: AxiosInstance;
    refresh_endpoint: string;
    login_endpoint?: string;
    transformer?: Promise<IAuthTokens>;
}

const defaultTransformer = (response: AxiosResponse): IAuthTokens => ({
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token
});

export const login = (tokens: IAuthTokens): void => {
    return setAuthTokens(tokens);
};

export const logout = (): void => {
    return clearAuthTokens();
};

export default class AxiosJwtHandler {
    static install: () => void;

    refreshEndpoint: string;
    loginEndpoint: ?string;
    instance: AxiosInstance;
    transformer: any;
    logout: () => void;
    login: (tokens: IAuthTokens) => void;
    app: any;

    constructor(options: IAxiosJwtHandlerOptions) {
        this.app = null;
        this.refreshEndpoint = options.refresh_endpoint;
        this.loginEndpoint = options.login_endpoint;
        this.instance = options.instance || axios.create();
        this.transformer = options.transformer || defaultTransformer;
        this.login = login;
        this.logout = logout;
    }

    refresh(): Promise<string> {
        return new Promise((resolve, reject) => {
            axios.post(this.refreshEndpoint)
                .then((response) => {
                    return resolve(this.transformer(response));
                }, reject)
        })
    }

    init(app: any): void {
        this.app = app;
        useAuthTokenInterceptor(this.instance, {
            requestRefresh: this.refresh
        });
    }
}

AxiosJwtHandler.install = install;
