import axios from 'axios'

const errorResponse = {
  success: false,
  message: '网络连接超时'
}

const getBaseRequestConfig = (baseURL) => {
  return {
    baseURL,
    timeout: 10000
  }
}

/**
 * axios请求成功的处理回调
 */
const requestSuccessHandler = function (config) {
  let rowStr = JSON.stringify(config.data || {})
  config.data = rowStr
  return config
}

const requestErrorHandler = function (error) {
  return Promise.resolve(errorResponse)
}

const responseSuccessHandler = function (response) {
  return response.data
}

const responseErrorHandler = function (error) {
  if (error.response) {
    // 请求已经发出去，服务器返回错误
    console.log(error.response)
  } else {
    // 请求没有发出去，网络错误等
    console.log('Error', error.message)
  }

  return Promise.resolve(errorResponse)
}

/**
 * 创建一个base请求
 */
const createBaseRequest = (baseURL) => {
  const req = axios.create(getBaseRequestConfig(baseURL))
  // Add a request interceptor
  req.interceptors.request.use(requestSuccessHandler, requestErrorHandler)

  // Add a response interceptor
  req.interceptors.response.use(responseSuccessHandler, responseErrorHandler)
  return req
}

export const cnodeapi = createBaseRequest('https://cnodejs.org/api/v1')
