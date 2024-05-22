import axios, { AxiosRequestConfig } from 'axios'
const baseConfig = {
    baseURL: '/api/Authentication',
    xsrfHeaderName: 'TOKEN', // default
}
const TOKEN_URL = `${baseConfig.baseURL}/getToken` // '/api/Authentication/getToken'
const TOKEN_KEY = 'OOR_TOKEN'
const EXPIRE_KEY = 'TOKEN_EXPI'
const TOKEN_ERROR = 'Request token failed, please try again.'

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EXPIRE_KEY)
}
const setToken = (token: string, expire: string | number) => {
    // 重新设置token
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(EXPIRE_KEY, `${expire}`)
}
const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

const getTokenExpire = () => {
    return localStorage.getItem(EXPIRE_KEY)
}
const ajax = axios.create(baseConfig)

const requestInterceptors = async (config: AxiosRequestConfig) => {
    // backend expire is accurate to seconds
    const expire = getTokenExpire()//获取过期时间
    const token = getToken()// 获取缓存的token
    const now = new Date().getTime()
    const isExpire = now > Number(expire) * 1000
    if (config.url !== TOKEN_URL && (!token || isExpire)) {
        removeToken()
        await ajax.post(TOKEN_URL) // 去请求新 token
    }
    if (config.headers) {
        config.headers[baseConfig.xsrfHeaderName] = getToken()
    } else {
        config.headers = { [baseConfig.xsrfHeaderName]: getToken() }
    }
    return config
}

// 请求拦截
ajax.interceptors.request.use(
    (config) => {
        // 请求,可以设置所有请求的config,比如设置请求头，添加请求参数...
        return requestInterceptors(config as unknown)
    },
    (error) => {
        //请求 error
        console.log("------Error Request: ------");
        return Promise.reject(error);
    }
)
// 响应拦截
ajax.interceptors.response.use(
    function (response) {
        // 响应结果
        if (!response || !response.data) {
            return Promise.reject('Server response failed. ') // 跳到 响应error
        }
        if (response && response.config.url === TOKEN_URL) {
            // 请求token 返回的数据
            removeToken()
            let token: string = ''
            let expire: number = 0
            if (response.data && response.data.Results) {
                const result = response.data.Results
                token = result.token || '' // token
                expire = result.expireDate || 0 //过期时间
            }
            if (token && expire) {
                setToken(token, expire)
            } else {
                // 返回数据没有 token  或 过期时间
                return Promise.reject(TOKEN_ERROR) // 跳到 响应error
            }
        } else {
            // 非 token 请求( 其他所有请求 ) 返回的数据
        }
        return response
    }, function (error) {
        // 响应error
        // 判断错误类型 可弹窗提醒错误
        return Promise.reject(error)
    })
export default ajax
