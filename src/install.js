/* @flow */
import axios from 'axios';
export let _Vue;

let v;

export function install (Vue) {

    // Used to avoid multiple mixins being setup
    // when in dev mode and hot module reload
    // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
    if (install.axios_installed && v === _Vue) return;
    install.axios_installed = true;

    Vue.mixin({
        beforeCreate() {
            // Bind to root component
            if (this.$options.axiosJwtHandler) {
                this._axiosHandlerRoot = this;
                this._axiosJwtHandler = this.$options.axiosJwtHandler.init(this);
            } else {
                this._axiosHandlerRoot = (this.$parent && this.$parent._axiosHandlerRoot) || this
            }

            axios.interceptors.response.use(response => {
                return response;
            }, e => {
                // emit to parent
                if (400 <= e.response.status < 500) {
                    this.$emit('http-error', e);
                    return Promise.reject(e);
                }
                // Emit to main app event bus.
                this.$root.$emit('http-error', e);
                return Promise.reject(e);
            });
        }
    });

    Object.defineProperty(Vue.prototype, '$axiosJwtHandler', {
        get() { return this._axiosHandlerRoot._axiosJwtHandler; }
    });

    Object.defineProperty(Vue.prototype, '$axios', {
        get() { return this._axiosHandlerRoot._axiosJwtHandler.instance; }
    });
    v = _Vue;
}

