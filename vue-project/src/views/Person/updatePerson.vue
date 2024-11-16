<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
// do not use same name with ref
const form = reactive({
  name: '',
  desc: '',
  date1: '',
  sex: '',
})

const router = useRouter()


import { ArrowLeft, Upload } from '@element-plus/icons-vue'

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue'

//上传用户头像涉及的变量
let fileList = ref<{ item: any }[]>([]); //文件列表
let uploadDisabled = ref(false); //如果多于一个就不显示控件


const uploadFile = async (item) => {
  //上传头像的处理，上传图片list里面东西就+1，大于等于1就开启判断css
  fileList.value.push({ item });
  uploadDisabled.value = fileList.value.length >= 1 ? true : false;
  console.log(uploadDisabled.value)
};

//删除图片
const handleRemove = () => {
  //清空list
  fileList.value = [];
  //让原本的样式生效！
  uploadDisabled.value = false;
};

import type { UploadFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)


const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}



import { setUserAPI } from '../../api/user';
import useUserInfoStore from '../../stores/userInfo.js'

const userInfo = useUserInfoStore();

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const onSubmit = async() => {
  console.log("9999"+imageUrl.value)
  //console.log(fileList)
  await calculateAge();
  await setUserAPI({
    nickname: form.name,
    info: form.desc,
    sex: form.sex,
    age: age.value,
    id: userInfo.info.id,
    avatar: imageUrl.value
  })

  router.push('/person')

}

const age = ref<string | null>(null);   // 计算出的年龄（字符串类型）

const calculateAge = () => {
  if (!form.date1) {
    age.value = null; // 如果生日未选择，年龄为空
    return;
  }

  const today = new Date();
  const birthDate = new Date(form.date1);

  let calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // 如果当前日期还没到生日，则减1岁
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    calculatedAge--;
  }

  age.value = calculatedAge >= 0 ? `${calculatedAge} ` : "0 "; // 转为字符串并加上“岁”
};

import type { ElUpload } from "element-plus";

// 为 `uploadAttach` 定义类型
const uploadAttach = ref<InstanceType<typeof ElUpload> | null>(null);
</script>

<template>
    <div class="update-box">
        <el-page-header :icon="ArrowLeft" @Back="router.push('/person')">
            <template #content>
                <h1>个人设置</h1>
            </template>
        </el-page-header>
        <div class="set-box">
            <el-form class="set-form" :model="form" label-width="auto" style="max-width: 600px" >
                <el-form-item label="昵称">
                <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="简介">
                <el-input v-model="form.desc" type="textarea" style="width: 500px"
                :rows="7" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="0">男</el-radio>
                        <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日">
                <el-col :span="24">
                    <el-date-picker
                    v-model="form.date1"
                    type="date"
                    placeholder="选择您的生日"
                    style="width: 100%"  
                    />
                </el-col>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>

<!-- 上传头像 -->

<el-upload
    action="#"
    ref="uploadAttach"
    class="upload_demo"
    :class="{ 'none-up': uploadDisabled }"
    list-type="picture-card"
    :on-remove="handleRemove"
    :http-request="uploadFile"
    :on-success="handleAvatarSuccess"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="uploadAttach?.handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
        <!-- 头像放大展示 -->
        <el-dialog v-model="dialogVisible">
            <img style="max-width: 80%; height: auto;" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

        </div>

        


    </div>
</template>

<style lang="less" scoped>
    .update-box {
        margin-left: 50px;
    }
    .set-box {
        display: flex;
        flex-direction: row;
        margin-top: 50px;



    }

    .none-up :deep(.el-upload--picture-card) {
        display: none;
        
    }

    .set-form {
        margin-right: 100px;
    }


</style>

<style>

    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: flex;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>



