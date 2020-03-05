import Vue, {ComponentOptions} from 'vue';

import {AxiosInstance} from 'axios';
import {AxiosJwtHandler} from './index';


declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        axiosJwtHandler?: AxiosJwtHandler
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $axiosJwtHandler: AxiosJwtHandler;
        $axios: AxiosInstance;
    }
}
