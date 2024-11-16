<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

const songs = ref([])
const listName = ref('haofan')
const listProfile = ref('dasbfjkbwiuvgbiuvbudfwr') 

import { getListAPI, delOneSongAPI, addLikeListAPI } from '../../api/playlist';
import { Delete, Star } from '@element-plus/icons-vue';

onMounted(()=> {
    getList()
})


const getList = async () => {
    const res =await getListAPI(route.params.id)
    songs.value = res.data.songList
    listName.value = res.data.name
    listProfile.value = res.data.profile
}

const delSong = async (currentsongId) => {
    await delOneSongAPI({
        id: route.params.id,
        songId: currentsongId
    })
    await getList()
}


import { useRoute } from 'vue-router'
const route = useRoute()


import useUserInfoStore from '../../stores/userInfo.js'
import { ElMessageBox, ElMessage,  } from 'element-plus'

const userInfo = useUserInfoStore();

const likeList = async() => {
    const res = await addLikeListAPI({
        createLike: false,
        id: userInfo.info.id,
        playlistId: route.params.id
    })
    if(res.code == 200) {
        ElMessage({
        type: 'success',
        message: "收藏成功"
        })
    }
    else {
        ElMessage({
        type: 'warning',
        message: "已收藏该歌单"
        })
    }
}

</script>

<template>
    <div class="list-box">
        <div class="list-top">
            <div class="list-title">
                <h1>{{listName}}</h1>
                <h2>{{listProfile}}</h2>
            </div>
            <el-button  type="primary" :icon="Star" @click="likeList">收藏</el-button>
        </div>
        <el-table :data="songs" height="350" class="songs" :header-cell-style="{
        background: 'transparent',
        height: '45px', border: 'none'
        }">
            <el-table-column prop="songName" label="歌曲" width="350px" />
            <el-table-column prop="artist" label="歌手" width="320px" />
            <el-table-column prop="album" label="专辑" width="300px" />
            <el-table-column label="操作" width="300px">
                <template v-slot="scope">
                    <el-button :icon="Delete" class="delete" background='transparent' circle
                    @click="delSong(scope.row.id)" /> 
                </template>
            </el-table-column>
        </el-table>
    </div>


</template>

<style lang="less" scoped>
    h1 {
        margin-left: 30px;
    }

    h2 {
        margin-left: 30px;
        margin-top: 30px;
        margin-bottom: 50px;
        font-weight: 500;
    }

    .list-top {
        display: flex;
        flex-direction: row; 

        .el-button {
            margin-top: 50px;
            margin-left: 100px;
        }
    }
</style>
