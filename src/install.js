/* @flow */
export let _Vue;

export function install (Vue, options = {}) {
    const customProperty = options.customProperty || '$instance';
    // Used to avoid multiple mixins being setup
    // when in dev mode and hot module reload
    // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
    if (install.installed && _Vue === Vue) return;
    install.installed = true;

    Vue.mixin({
        beforeCreate(): void {
            // Bind to root VM
            if (this.$options.axiosJwtHandler !== undefined) {
                this.$options.axiosJwtHandler.init(Vue);
                this._axiosJwtHandlerRoot = this;
                this._axiosJwtHandler = this.$options.axiosJwtHandler;
                this._axiosJwtHandler.init(this);
            } else {
                // Bind child to root vm's axios jwt handler.
                this._axiosJwtHandlerRoot = (this.$parent && this.$parent._axiosJwtHandlerRoot)
            }
        }
    });

    Object.defineProperty(Vue.prototype, customProperty, {
        get() { return this._axiosJwtHandlerRoot._axiosJwtHandler.instance; }
    });
    Object.defineProperty(Vue.prototype, '$axiosJwtHandler', {
        get() { return this._axiosJwtHandlerRoot._axiosJwtHandler; }
    });
}
