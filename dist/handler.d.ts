import { IAuthTokens } from "axios-jwt";
import { AxiosInstance } from "axios";
import { AxiosJwtRequestOptions, IAxiosJwtHandler } from "./types";
import { VueConstructor } from "vue";
declare class AxiosJwtHandler implements IAxiosJwtHandler {
    private readonly refreshEndpoint;
    private readonly loginEndpoint?;
    readonly instance: AxiosInstance;
    constructor(args: AxiosJwtRequestOptions);
    private transformer;
    login(tokens: IAuthTokens): void;
    logout(): void;
    refresh(): Promise<string>;
    static install(Vue: VueConstructor, args: AxiosJwtRequestOptions): void;
}
export default AxiosJwtHandler;
//# sourceMappingURL=handler.d.ts.map