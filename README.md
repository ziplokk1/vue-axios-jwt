# Descrition

Vue Wrapper For [Axios-Jwt](https://github.com/jetbridge/axios-jwt)

# Configuration

## Parameters

### Required

----

#### refresh_endpoint {string}

The endpoint to obtain a new access token using the 
refresh token. (e.x. `/api/v1/auth/token/refresh/`)


### Optional

---

#### login_endpoint {string}

The endpoint to log the user in via some kind of
credentials. (e.x. `/api/v1/auth/login`)

---


#### instance {axios}

The axios instance you want to use for making calls to
the API. 

If one is not specified, then it will create an instance
via `axios.create()`.

This is useful if you want to specify a different base
URL or some other axios configurations.

---

#### transformer {function => object}

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

# Usage

```javascript
import Vue from 'vue';
import VueAxiosJwt from 'vue-axios-jwt';

Vue.use(VueAxiosJwt);

const axiosJwtHandler = new AxiosJwtHandler({refresh_endpoint: '/api/v1/auth/token/refresh/'});

const app = new Vue({
    // ... other junk
    axiosJwtHandler
}).$mount('#app');
```

```vue
<template>
    <div>
        <span>Hello {{ user }}</span>
    </div>
</template>

<script>
export default {
    name: 'Example',
    data() {
        return {
            user: ''
        }
    },
    mounted() {
        this.$axios.get('/api/v1/user/')
            .then(response => { this.user = response.data.user });
    }
}
</script>
```

## Using it in other places

```javascript
/**
* src/apiClient.js
*/
import AxiosJwtHandler from 'vue-axios-jwt';
const handler = new AxiosJwtHandler({refresh_endpoint: '/api/v1/auth/refresh/'});
export default handler.instance;
```

```javascript
/**
* src/main.js
*/
import apiClient from './apiClient';
apiClient.post('/api/v1/something/', {data: {ayy: 'lmao'}});
```

The above structure is nice when you have your vuex store in different modules
and need to make XHR requests within the actions.
