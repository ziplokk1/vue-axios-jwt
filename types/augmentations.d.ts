import Vue  from 'vue'
import AxiosJwtHandler from './index';
import {AxiosInstance} from 'axios';

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
