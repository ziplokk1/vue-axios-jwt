import {AxiosInstance} from "axios";
import {IAuthTokens} from "axios-jwt";
import Vue, {PluginFunction} from 'vue';


export declare class AxiosJwtHandler {
    constructor(options: IAxiosJwtHandlerOptions);

    readonly app: Vue;
    readonly instance?: AxiosInstance;

    login(tokens: IAuthTokens): void;
    logout(): void;
    refresh(): Promise<string>;
    init(): void;

    static install: PluginFunction<never>;
}

export interface IAxiosJwtHandlerOptions {
    instance?: AxiosInstance;
    refresh_endpoint: string;
    login_endpoint?: string;
    transformer?: Promise<IAuthTokens>;
}
