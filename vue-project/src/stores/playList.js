import {defineStore} from 'pinia'
import {ref} from 'vue'
import useUserInfoStore from './userInfo.js'
import {                
  deleteCreateListAPI,
  addSongToListAPI,getLikeSongsAPI,getLikeListAPI,getCreateListAPI,
    addCreateListAPI
 } from '../api/playlist'

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
        likeSongs.value = res.data
    }

      
    const getLikeList = async()=>{
        const res = await getLikeListAPI(userStore.info.id);
        likeList.value = res.data
    }


    const getCreateList = async()=>{
        const res = await getCreateListAPI(userStore.info.id);
        createList.value = res.data
    }

    const delCreateList = async (id) => {
        await deleteCreateListAPI(id);
        await getCreateList()
    }

    const addCreateList = async(data) => {
        await addCreateListAPI(data)
        await getCreateList()
    } 

    const addSongToList = async(data) => {
        await addSongToListAPI(data)
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
