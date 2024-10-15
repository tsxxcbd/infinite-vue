// 导入 axios 实例
import request from '@/utils/request.js'


//总体查询歌曲
export const searchAPI = (keyword) => {
    return request ({
        url:`/api/search/${keyword}`,
        method: 'GET'
    })
};

export const searchSingerAPI = (keyword) => {
    return request ({
        url:`/api/search/artist/${keyword}`,
        method: 'GET'
    })
};
export const searchAlbumAPI = (keyword) => {
    return request ({
        url:`/api/search/album/${keyword}`,
        method: 'GET'
    })
};
export const searchEmotionAPI = (keyword) => {
    return request ({
        url:`/api/search/emotion/${keyword}`,
        method: 'GET'
    })
};
export const searchLyricsAPI = (keyword) => {
    return request ({
        url:`/api/search/lyrics/${keyword}`,
        method: 'GET'
    })
};
export const searchListnameAPI = (keyword) => {
    return request ({
        url:`/api/search/listname/${keyword}`,
        method: 'GET'
    })
};export const searchProfileAPI = (keyword) => {
    return request ({
        url:`/api/search/profile/${keyword}`,
        method: 'GET'
    })
};