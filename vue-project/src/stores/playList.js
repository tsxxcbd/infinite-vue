import {defineStore} from 'pinia'
import {ref} from 'vue'
import useUserInfoStore from './userInfo.js'
import {                
  deleteCreateListAPI,
  addSongToListAPI,getLikeSongsAPI,getLikeListAPI,getCreateListAPI,
    addCreateListAPI
 } from '../api/playlist'
import { ElMessage } from 'element-plus'
const useListStore = defineStore('useListStore',()=>{
    //定义状态相关的内容
    const userStore = useUserInfoStore()

    const likeSongs = ref([])
    const likeList = ref([])
    const createList = ref([
        {
            id: 1,
            name: 'List 1',
            profile: 'Profile 1',
            number: 0,
            creatorname: null
        },
    ])

    const getLikeSongs = async()=>{
        console.log("55555")
        const res = await getLikeSongsAPI(userStore.info.id);
        if(res.code == 200) {
            likeSongs.value = res.data

        }
    }

      
    const getLikeList = async()=>{
        const res = await getLikeListAPI(userStore.info.id);
        if(res.code == 200) {
            likeList.value = res.data
        }
    }


    const getCreateList = async()=>{
        const res = await getCreateListAPI(userStore.info.id);
        if(res.code == 200) {
            createList.value = res.data
        } else {
            ElMessage({
                type: "warning",
                message: "暂无数据"
            })
        }
    }

    const delCreateList = async (id) => {
        await deleteCreateListAPI(id);
        await getCreateList()
    }

    const addCreateList = async(data) => {
        const res = await addCreateListAPI(data)
        if(res.code == 200) {
            ElMessage({
                type: "success",
                message: "创建歌单成功"
            })
        } else {
            ElMessage({
                type: "warning",
                message: "创建歌单失败"
            })
        }
        await getCreateList()
    } 

    const addSongToList = async(data) => {
        const res = await addSongToListAPI(data)
        if(res.code == 200) {
            ElMessage({
                type: "success",
                message: res.message
            })
        } else {
            ElMessage({
                type: "warning",
                message: res.message
            })
        }
        await getCreateList()
    }


      


    return {
        likeSongs,
        likeList,
        createList,
        getLikeList,
        getLikeSongs,
        getCreateList,
        delCreateList,
        addCreateList,
        addSongToList
    }

},{persist:true})

export default useListStore;
