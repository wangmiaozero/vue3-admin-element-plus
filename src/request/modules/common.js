import myAxios from "../http/index"


export const GetResouceList = (paramsList) => {
    return myAxios({
        url: '/api/getResouceList',
        method: 'get',
        data: paramsList,
        description: "获取相关资源推荐",
        headers: {
            'Content-Type': 'application/json'
        }
    }, {
        loading: false,
        repeat_request_cancel: false,
    },
        {
            text: '加载中...'
        }
    )
}


export default {
    GetResouceList
}