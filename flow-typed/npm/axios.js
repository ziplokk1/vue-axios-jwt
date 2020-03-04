import {IAuthTokenInterceptorConfig} from 'axios-jwt';

declare module 'axios' {
    declare function post(config?: any): any;
    declare function create(config?: any): any;
    declare interface AxiosInstance {}
    declare class AxiosResponse {
        data: any
    }
    declare class Axios implements AxiosInstance {
        create(config?: AxiosRequestConfig): Axios;
        post(config?: AxiosRequestConfig): AxiosResponse;
    }
}

declare module 'axios-jwt' {
    declare interface IAuthTokens {
        refreshToken: string,
        accessToken: string
    }
    declare function useAuthTokenInterceptor(axios: any, config: any): void;
    declare function clearAuthTokens(): void;
    declare function setAuthTokens(tokens: IAuthTokens): void;
}
