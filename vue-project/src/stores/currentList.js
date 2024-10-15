import { defineStore } from 'pinia'
import { ref } from 'vue'

const currentListStore = defineStore('currentListStore', () => {
    //定义状态相关的内容

    const currentList = ref([])

    const currentFlag = ref(0)

    const addSongToCurrent = async (song) => {
        await currentList.value.push(song)
    }

    const deleteSong = async (id) => {
        //1. 找到要删除的下标值， -splice
        //2. 使用数组的过滤方法 -filter
        const foundIndex = currentList.value.findIndex(item => item.id === id);

        if (foundIndex !== -1) {
            currentList.value.splice(foundIndex, 1);
            console.log(`Song with id ${id} removed from the list.`);
        } else {
            console.log(`Song with id ${id} not found in the list.`);
        }
    }

    return {
        currentFlag,
        currentList,
        //getnowSonglist,
        deleteSong,
        addSongToCurrent
    }

}, { persist: true })

export default currentListStore;