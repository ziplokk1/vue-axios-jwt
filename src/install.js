import axios from "axios";
import {useAuthTokenInterceptor} from "axios-jwt";



export let _Vue;

function axiosJwtBind () {
    var options = this.$options;
    // store injection
    if (options.store) {
        this.$store = typeof options.store === 'function'
            ? options.store()
            : options.store;
    } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
    }
}

export function install (Vue) {
    // Used to avoid multiple mixins being setup
    // when in dev mode and hot module reload
    // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
    if (install.installed && _Vue === Vue) return;
    install.installed = true;

    // add interceptor to your axios instance
    useAuthTokenInterceptor(handler.instance, {requestRefresh: handler.refresh});

    Vue.mixin({
        beforeCreate(): void {
            if (this.$options.axiosJwtHandler !== undefined) {
                this._axiosJwtHandlerRoot = this;
                this._axiosJwtHandler = this.$options.axiosJwtHandler;
                this._axiosJwtHandler.init(this);
            } else {
                this._axiosJwtHandlerRoot = (this.$parent && this.$parent._axiosJwtHandlerRoot)
            }
        }
    });

    Object.defineProperty(Vue.prototype, '$instance', {
        get() { return this._axiosJwtHandlerRoot._axiosJwtHandler.instance; }
    });
    Object.defineProperty(Vue.prototype, '$axiosJwtHandler', {
        get() { return this._axiosJwtHandlerRoot._axiosJwtHandler; }
    });
}
