import { errorHandle } from './http-code'
import { http } from './index'
// 封装 请求
const axios = {
  async get (url, data) {
    try {
      let res = await http.get(url, { params: data })
      // console.log(res)
      // res = res.data
      return new Promise(resolve => {
        if (res.code === 0) {
          // console.log(res)
          resolve(res)
        } else {
          errorHandle(res)
          resolve(res)
        }
      })
    } catch (err) {
      // msg({ message: '服务器出错' })
      errorHandle(err)
      // console.log(err)
      return Promise.reject(err)
      // return new Promise((resolve, reject) => {
      //   reject(err)
      // })
    }
  },
  async post (url, data, params) {
    try {
      let res = await http.post(url, JSON.stringify(data), {
        params: params
      })
      // res = res.data
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      // return (e.message)
      // msg({ message: '服务器出错' })
      errorHandle(err)
      // console.log(err)
      return Promise.reject(err)
    }
  }
}

const request = async ({ url, params, data, method = 'GET', headers = {} }) => {
  try {
    let res = await http({
      url,
      method,
      params,
      data,
      headers
    })
    return res
    // return new Promise((resolve, reject) => {
    //   if (res.code === 0) {
    //     resolve(res)
    //   } else {
    //     reject(res)
    //   }
    // })
  } catch (err) {
    // return (e.message)
    // msg({ message: '服务器出错' })
    errorHandle(err)
    // console.log(err)
    return err
  }
}

const get = async (url, data) => {
  try {
    let res = await http.get(url, { params: data })
    return res
    // console.log(res)
    // res = res.data
    // return new Promise((resolve, reject) => {
    //   if (res && res.code === 0) {
    //     // console.log(res)
    //     resolve(res)
    //   } else {
    //     reject(res)
    //   }
    // })
  } catch (err) {
    // msg({ message: '服务器出错' })
    errorHandle(err)
    console.log(err)
    return err
    // return Promise.reject(err)
  }
}
const post = async (url, data) => {
  try {
    let res = await http.post(url, JSON.stringify(data))
    return res
  } catch (err) {
    errorHandle(err)
    return err
  }
}
const put = async (url, data) => {
  try {
    let res = await http.put(url, JSON.stringify(data))
    return res
  } catch (err) {
    errorHandle(err)
    return err
  }
}
const del = async (url, data) => {
  try {
    let res = await http.delete(url, JSON.stringify(data))
    return res
  } catch (err) {
    errorHandle(err)
    return err
  }
}

// 文件上传
// headers: {'Content-Type': 'multipart/form-data'}
const uploadFile = async ({ url, params, data, method = 'POST', headers = {'Content-Type': 'multipart/form-data'} }) => {
  try {
    let res = await http({
      url,
      method,
      params,
      data,
      headers
    })
    return res
  } catch (err) {
    errorHandle(err)
    return err
  }
}

export { http, request, get, post, put, del, uploadFile, axios }
