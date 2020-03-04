import { useAuthTokenInterceptor } from "axios-jwt";
export let _Vue;
export function install(Vue) {
  // Used to avoid multiple mixins being setup
  // when in dev mode and hot module reload
  // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
  if (install.installed && _Vue === Vue) return;
  install.installed = true;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.axiosJwtHandler !== undefined) {
        useAuthTokenInterceptor(this.instance, {
          requestRefresh: this.refresh
        });
        this._axiosJwtHandlerRoot = this;
        this._axiosJwtHandler = this.$options.axiosJwtHandler;

        this._axiosJwtHandler.init(this);
      } else {
        this._axiosJwtHandlerRoot = this.$parent && this.$parent._axiosJwtHandlerRoot;
      }
    }

  });
  Object.defineProperty(Vue.prototype, '$instance', {
    get() {
      return this._axiosJwtHandlerRoot._axiosJwtHandler.instance;
    }

  });
  Object.defineProperty(Vue.prototype, '$axiosJwtHandler', {
    get() {
      return this._axiosJwtHandlerRoot._axiosJwtHandler;
    }

  });
}