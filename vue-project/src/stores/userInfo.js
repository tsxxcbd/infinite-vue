import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { registerAPI, loginAPI, getUserAPI } from '@/api/user.js'

const useUserInfoStore = defineStore('userInfo', () => {
    //定义状态相关的内容

    const info = ref({
        id: 0,
        name: '亲爱的用户',
        token:'',
        sex:'',
        desc: '',
        nickname:'',
        age: '',
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkYRMy3ifBgjxbF_p-NU1eyIpB8WZ_FQqB7YTV5SVPd8rCvVVI"
    })


    const login = async (data) => {
        const res = await loginAPI(data)
        info.value.id = res.data.id,
        info.value.name = res.data.name,
        info.value.token = res.data.token
    }

    const register = async (data) => {
        const res = await registerAPI(data)
    }

    const clearUserInfo = () => {
        info.value = {}
    }

    const getUserInfo = async(id) => {
        const res = await getUserAPI(id)
        if(res.code == 200) {
            console.log("55888")
            info.value.nickname = res.data.nickname 
            info.value.age = res.data.age
            info.value.sex = res.data.sex
            info.value.desc = res.data.info
            info.value.photo = res.data.avatar
            console.log("55777")
            
        }
    }

    return { info, login, register, clearUserInfo, getUserInfo }

}, { persist: true })

export default useUserInfoStore;