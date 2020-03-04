### Usage

```javascript
import Vue from 'vue';
import VueAxiosJwt from 'vue-axios-jwt';

Vue.use(VueAxiosJwt);

const axiosJwtHandler = new AxiosJwtHandler({refresh_endpoint: '/api/v1/auth/token/refresh/', instance});

const app = new Vue({
    // ... other junk
    axiosJwtHandler
}).$mount('#app');
```

### Configuration

#### Required parameters.

----

##### refresh_endpoint {string}

The endpoint to obtain a new access token using the 
refresh token. (e.x. `/api/v1/auth/token/refresh/`)

---

##### login_endpoint {string} [*optional*]

---

##### instance {AxiosInstance} [*optional*]

The axios instance you want to use for making calls to
the API. 

If one is not specified, then it will create an instance
via `axios.create()`.

This is useful if you want to specify a different base
URL or some other axios configurations.

---

##### transformer {function<Object>} [*optional*]

A callable object which takes an AxiosResponse and
returns an object such as `{accessToken: 'string', refreshToken: 'string'}`.

The default implementation is: 

*typescript*
```typescript
import {AxiosResponse} from 'axios';
import {IAuthTokens} from 'axios-jwt';

const defaultTransformer = (response: AxiosResponse): IAuthTokens => ({
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token
});
```

Or if you prefer ES6...

*javascript*
```javascript
const defaultTransformer = (response) => ({
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token
})
```
