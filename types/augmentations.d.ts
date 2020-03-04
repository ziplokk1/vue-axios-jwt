import Vue from 'vue';
import {AxiosInstance} from 'axios';
import {AxiosJwtHandler} from './vue-axios-jwt';

declare module 'vue/types/vue' {

    interface Vue {
        $axiosJwtHandler: AxiosJwtHandler;
        $instance: AxiosInstance;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        axiosJwtHandler?: AxiosJwtHandler
    }
}
