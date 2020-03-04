/* @flow */
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { clearAuthTokens, IAuthTokens, setAuthTokens, useAuthTokenInterceptor } from 'axios-jwt';
import { install } from './install';

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
        this.refresh = this.refresh.bind(this);
        this.init = this.init.bind(this);
    }

    refresh(): Promise<string> {
        return new Promise((resolve, reject) => {
            axios.post(this.refreshEndpoint)
                .then((response) => {
                    return resolve(this.transformer(response));
                }, reject);
        });
    }

    init(app: any): void {
        this.app = app;
        useAuthTokenInterceptor(this.instance, {
            requestRefresh: this.refresh
        });

        // Emit an error that can be intercepted in the UI from the root
        // VM.
        axios.interceptors.response.use(response => {
            return response;
        }, e => {
            if (e.response.status >= 500) {
                this.$emit('requestError', e);  // emit to the local component scope
                app.$root.$emit('requestError', e);  // emit to the global bus.
            }
            return Promise.reject(e);
        });
    }
}

AxiosJwtHandler.install = install;
