"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_jwt_1 = require("axios-jwt");
var axios_1 = __importDefault(require("axios"));
var axios_jwt_2 = require("axios-jwt");
var AxiosJwtHandler = /** @class */ (function () {
    function AxiosJwtHandler(args) {
        this.refreshEndpoint = args.refresh_endpoint;
        this.loginEndpoint = args.login_endpoint;
        this.instance = args.instance || axios_1.default;
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
        this.transformer = this.transformer.bind(this);
    }
    // ToDo: Make transformer configurable.
    AxiosJwtHandler.prototype.transformer = function (response) {
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token
        };
    };
    AxiosJwtHandler.prototype.login = function (tokens) {
        axios_jwt_1.setAuthTokens(tokens);
    };
    AxiosJwtHandler.prototype.logout = function () {
        return axios_jwt_2.clearAuthTokens();
    };
    AxiosJwtHandler.prototype.refresh = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.instance.post(_this.refreshEndpoint)
                .then(function (response) {
                return resolve(response.data.refresh_token);
            });
        });
    };
    AxiosJwtHandler.install = function (Vue, args) {
        var instance = args.instance || axios_1.default;
        var handler = new AxiosJwtHandler(args);
        // add interceptor to your axios instance
        axios_jwt_1.useAuthTokenInterceptor(handler.instance, { requestRefresh: handler.refresh });
        // Used to avoid multiple mixins being setup
        // when in dev mode and hot module reload
        // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
        // @ts-ignore
        if (Vue.$_axios_jwt_installed)
            return;
        // @ts-ignore
        Vue.$_axios_jwt_installed = true;
        Vue.prototype.$axiosJwt = instance;
    };
    return AxiosJwtHandler;
}());
exports.default = AxiosJwtHandler;
//# sourceMappingURL=handler.js.map