import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus';

const currentListStore = defineStore('currentListStore', () => {
    //定义状态相关的内容

    const currentList = ref([])

    const currentFlag = ref(0)

    const addSongToCurrent = async (song) => {
        try {
            // 将歌曲添加到当前列表
            currentList.value.push(song);

            // 显示成功消息
            ElMessage({
                message: '歌曲已成功添加！',  // 消息内容
                type: 'success',  // 消息类型，成功的提示
            });
        } catch (error) {
            // 如果发生错误，显示错误消息
            ElMessage({
                message: '添加歌曲失败！',
                type: 'error',
            });
        }
    }

    // const deleteSong = async (id) => {
    //     //1. 找到要删除的下标值， -splice
    //     //2. 使用数组的过滤方法 -filter
    //     const foundIndex = currentList.value.findIndex(item => item.id === id);

    //     if (foundIndex !== -1) {
    //         currentList.value.splice(foundIndex, 1);
    //         console.log(`Song with id ${id} removed from the list.`);
    //     } else {
    //         console.log(`Song with id ${id} not found in the list.`);
    //     }
    // }

    const deleteSong = async (index) => {
        if (index !== -1) {
            // 使用 splice 删除数组中的歌曲
            currentList.value.splice(index, 1);
            console.log(`Song at index ${index} removed from the list.`);
        } else {
            console.log('Song not found in the list.');
        }
    };


    return {
        currentFlag,
        currentList,
        //getnowSonglist,
        deleteSong,
        addSongToCurrent
    }

}, { persist: true })

export default currentListStore;