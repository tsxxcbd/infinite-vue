import request from '@/utils/request.js'


export const getLikeSongsAPI = (id) => {
    return request({
        url:`/api/PlayList/UserlikedSong/${id}`,
        method: 'GET',
    })
}
export const getLikeListAPI = (id) => {
    return request({
        url:`/api/PlayList/UserLikelists/${id}`,
        method: 'GET',
    })
}
export const getCreateListAPI = (id) => {
    return request({
        url:`/api/PlayList/UserCreatelists/${id}`,
        method: 'GET',
    })
}


export const deleteCreateListAPI = (id) => {
    return request({
        url:`/api/PlayList/deletelist/${id}`,
        method: 'DELETE',
    })
}

export const addCreateListAPI = (data) => {
    return request({
        url:'/api/PlayList/newlist',
        method: 'POST',
        data
    })
}

export const addSongToListAPI = (data) => {
    return request({
        url:'/api/PlayList/addonesong',
        method: 'POST',
        data
    })
}

export const addLikeSongAPI = (data) => {
    return request({
        url:'/api/PlayList/Likesong',
        method: 'POST',
        data
    })
}

export const delLikeSongAPI = (data) => {
    return request({
        url:'/api/PlayList/Dislikesong',
        method: 'DELETE',
        data
    })
}

export const getListAPI = (id) => {
    return request({
        url:`/api/PlayList/${id}`,
        method: 'GET',
    })
}

export const delOneSongAPI = (data) => {
    return request({
        url:`/api/PlayList/deleteonesong`,
        method: 'DELETE',
        data
    })
}


export const addLikeListAPI = (data) => {
    return request({
        url:`/api/PlayList/likelist`,
        method: 'POST',
        data
    })
}