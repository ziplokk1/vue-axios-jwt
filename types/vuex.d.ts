import {StoreOptions} from 'vuex';

import { AxiosJwtHandler } from './index';
import {AxiosInstance} from 'axios';


declare module 'vuex/types/index' {
    interface StoreOptions<S> {
        store?: Store<S>;
        $axiosJwtHandler?: AxiosJwtHandler;
    }
}

export declare class Store<S> {
    constructor(options: StoreOptions<S>);
    $axiosJwtHandler?: AxiosJwtHandler;
    $instance?: AxiosInstance
}

declare module 'vuex/types/index' {
    interface StoreOptions<S> {
        store?: Store<S>;
        axiosJwtHandler?: AxiosJwtHandler
    }
}

