import _Vue from "vue";
import {StoreOptions} from 'vuex';

import './vue';
import './vuex';

import {AxiosInstance, AxiosResponse} from "axios";
import {IAuthTokens} from "axios-jwt";

export declare class AxiosJwtHandler {
    constructor(options: IAxiosJwtHandlerOptions);

    readonly app: any;
    readonly instance?: AxiosInstance;
    readonly eventBus: _Vue;

    login(tokens: IAuthTokens): void;
    logout(): void;
    refresh(refresh: string): Promise<string>;
    init(app: _Vue): AxiosJwtHandler;
    transformer(response: AxiosResponse): IAuthTokens;
}

export declare interface IAxiosJwtHandlerOptions {
    store?: StoreOptions<any>;
    instance?: AxiosInstance;
    refresh_endpoint: string;
    login_endpoint?: string;
    transformer?: (response: AxiosResponse) => IAuthTokens;
}

export declare function install(Vue: typeof _Vue): void;
