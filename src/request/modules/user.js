import myAxios from "../http/index"
import qs from "qs"
export const GetUserInfo = (paramsList) => {
  return myAxios({
    url: '/api/userInfo',
    method: 'get',
    params: paramsList,
    description:"用户信息",
    headers: {
      'Content-Type': 'application/json'
    }
  }, {
    loading: true,
    repeat_request_cancel: false,
    code_message_show:false
  },
  {
    text: '加载中...'
  }
  )
}

export const UserLogin = (paramsList) => {
  return myAxios({
    url: '/api/login',
    method: 'post',
    data: paramsList,
    description:"登录",
    headers: {
      'Content-Type': 'application/json'
    }
  }, {
    loading: true,
    repeat_request_cancel: false,
    code_message_show:false
  },
  {
    text: '登录中...'
  }
  )
}

export default {
    GetUserInfo,
    UserLogin
}