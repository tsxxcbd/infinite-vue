<script lang="ts" setup>
import { ref, onMounted} from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage,  } from 'element-plus'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

import type { FormProps } from 'element-plus'
const labelPosition = ref<FormProps['labelPosition']>('right')

const searchResults = ref([])
const addSongTolistdialogVisible = ref(false)

const route = useRoute()

const keyword = ref(route.query.keyword)

onMounted(() => {
  searchAll()
  //searchSinger()
}) 

const selectedOption = ref('overall')

import {searchAPI, searchAlbumAPI, searchSingerAPI, searchEmotionAPI, searchLyricsAPI, searchListnameAPI, searchProfileAPI} from '../../api/search.js'

import {getListAPI} from '../../api/playlist'

const searchAll = async() => {
  isEmotion.value = false

  const res = await searchAPI(keyword.value)
  if(res.code == 200) {
    searchResults.value = res.data
  } else {
    searchResults.value = []
    ElMessage({
        type: 'warning',
        message: res.data
    })
  }

}

const searchSinger = async() => {
  isEmotion.value = false
  isPlayList.value = false

  const res = await searchSingerAPI(keyword.value)

  if(res.code == 200) {
    searchResults.value = res.data
  } else {
    searchResults.value = []
    ElMessage({
        type: 'warning',
        message: res.data
    })
  }
}
const searchAlbum = async() => {
  const res = await searchAlbumAPI(keyword.value)
  isEmotion.value = false
  isPlayList.value = false

  if(res.code == 200) {
    searchResults.value = res.data
  } else {
    searchResults.value = []
    ElMessage({
        type: 'warning',
        message: res.data
    })
  }
}

const searchEmotion = async() => {
  const res = await searchEmotionAPI(keyword.value)
  isEmotion.value = true
  isPlayList.value = false

  if(res.code == 200) {
    searchResults.value = res.data
  } else {
    searchResults.value = []
    ElMessage({
        type: 'warning',
        message: res.data
    })
  }
}

const searchLyrics = async() => {
  isEmotion.value = false
  isPlayList.value = false
  const res = await searchLyricsAPI(keyword.value)

  if(res.code == 200) {
    searchResults.value = res.data
  } else {
    searchResults.value = []
    ElMessage({
        type: 'warning',
        message: res.data
    })
  }
}

const searchListname = async() => {

  const res = await searchListnameAPI(keyword.value)
  isPlayList.value = true
  isEmotion.value = false

  if(res.code == 200) {
    searchResults.value = res.data
  } else {
    searchResults.value = []
    ElMessage({
        type: 'warning',
        message: res.data
    })
  }
}
const searchProfile= async() => {
  
  const res = await searchProfileAPI(keyword.value)
  isPlayList.value = true
  isEmotion.value = false

  if(res.code == 200) {
    searchResults.value = res.data
  } else {
    searchResults.value = []
    ElMessage({
        type: 'warning',
        message: res.data
    })
  }
}

const isEmotion = ref(false)
const isPlayList = ref(false)


import useListStore from '../../stores/playList.js'

const listStore = useListStore()

const addcurrentsongId = ref(0)
const addcurrentlistId = ref(0)

import currentsongStore from '../../stores/currentSong';
import currentListStore from '../../stores/currentList';
const currentSong = currentsongStore()
const currentList = currentListStore()


const handleRowDoubleClick = (row) => {
  currentSong.songId = row.id
  console.log(row.id)
  const selectedProps = {
        album: row.album,
        songName: row.songName,
        artist: row.artist,
        songid: row.id
    }
    currentList.addSongToCurrent(selectedProps)
}

const router = useRouter()

const handleRowDoubleClick2 =(row) => {
//   const listid = parseInt(row.id, 10)
//   console.log(row.id)
//   console.log(listid)
//   const res = await getListAPI(listid)
//   res.data.songList.forEach(item => {
//     const selectedProps = {
//         album: item.album,
//         songName: item.songName, // 确保使用正确的属性名
//         artist: item.artist,
//         songid: item.id // 使用 id 属性作为 songid
//     };
//     currentList.currentList = []
//     currentList.addSongToCurrent(selectedProps);
// });
  router.push(`playlist/${row.id}`)
}


</script>

<template>

  <el-card style="width: 300px; height: 600px">
    <template #header>
    <div class="card-header">
        <span>精简你的搜索</span>
    </div>
    </template>

    <div class="refine">
        <el-radio-group v-model="selectedOption" style="display: flex; flex-direction: column;">
            <el-radio-button label="overall" @click="searchAll">总体</el-radio-button>
            <el-radio-button label="artist" @click="searchSinger">歌手</el-radio-button>
            <el-radio-button label="album" @click="searchAlbum">专辑</el-radio-button>
            <el-radio-button label="lyrics" @click="searchLyrics" >歌词</el-radio-button>
            <el-radio-button label="mood" @click="searchEmotion">心情</el-radio-button>
            <el-radio-button label="playListName" @click="searchListname">歌单名</el-radio-button>
            <el-radio-button label="playListProfile" @click="searchProfile">歌单简介</el-radio-button>
        </el-radio-group>
    </div>
  </el-card>

  <el-table v-if="!isEmotion&&!isPlayList" :data="searchResults" height="650"  class="songs" 
  :header-cell-style="{ background:'transparent',height:'45px',color:'#000000',border:'none'}"
  @row-dblclick="handleRowDoubleClick" >
      <el-table-column prop="songName" label="歌曲" width="300px" />
      <el-table-column prop="artist" label="歌手" width="300px" />
      <el-table-column prop="album" label="专辑" width="300px" />
      <el-table-column label="操作" width="100px">
          <template v-slot="scope">
          <el-button :icon="Plus" style="border: none;"  circle @click="addSongTolistdialogVisible=true, addcurrentsongId=scope.row.id"/>
          </template>
      </el-table-column>
  </el-table>

  <el-table v-if="isEmotion" :data="searchResults" height="650" class="songs" 
  :header-cell-style="{ background:'transparent', height:'45px', color:'#000000', border:'none' }"
  @row-dblclick="handleRowDoubleClick" >
  <el-table-column prop="songName" label="歌曲" width="200px" />
  <el-table-column prop="artist" label="歌手" width="150px" />
  <el-table-column prop="album" label="专辑" width="150px" />
  <el-table-column label="心情" width="400px">
      <template v-slot="scope">
          <span>
              {{ scope.row.emotion.substring(16, scope.row.emotion.length - 3) }}
          </span>
      </template>
  </el-table-column>
  <el-table-column label="操作" width="150px">
      <template v-slot="scope">
        <el-button :icon="Plus" style="border: none;"  circle @click="addSongTolistdialogVisible=true, addcurrentsongId=scope.row.id"/>
      </template>
  </el-table-column>
  </el-table>

  <el-table v-if="isPlayList" :data="searchResults" height="650" class="songs" 
      :header-cell-style="{ background:'transparent', height:'45px', color:'#000000', border:'none' }"
      @row-dblclick="handleRowDoubleClick2">
      <el-table-column prop="name" label="歌单名" width="250px" />
      <el-table-column prop="number" label="歌曲数" width="250px" />
      <el-table-column prop="profile" label="简介" width="400px" />
      <el-table-column prop="creatorname" label="创建者" width="200px" />
  </el-table>

  <el-dialog v-model="addSongTolistdialogVisible" title="添加该歌曲到歌单" width="30%">
    <span>
      <el-form :label-position="labelPosition" label-width="100px" :model="listStore.createList" style="max-width: 460px">
        <el-form-item label="要添加的歌单">
          <el-select v-model="addcurrentlistId" placeholder="请选择">
            <el-option 
                v-for= "item in listStore.createList"
                :key = "item.id"
                :label= "item.name"
                :value= "item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addSongTolistdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="listStore.addSongToList({id: addcurrentlistId, songId: addcurrentsongId}), addSongTolistdialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>  

</template>
  

<style lang="less" >



.el-card {
    margin-top: 30px;
}

.refine {
    display: flex;
    flex-direction: column;

    .el-radio-button {
    align-items: center;

    }
    .el-radio-button__inner {
      display: flex;
      align-items: center;
    width: 200px;
    height: 60px;
    border-radius: 4px 0px 0px 4px;
    border: 1px solid rgba(0, 0, 0, 0) !important;
    border-radius: 2px !important;
    font-size: 18px;
    line-height: 60px;
    outline: none;
    box-shadow: none;
}


}



.demo-tabs {
  color: #FFFFFF;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 70px;
  margin-right: 70px;
  font-size: 16px;
}

.demo-tabs>.el-tabs__item.is-active {
  color: #2E8CAC;

}

.el-tabs__item {
  color: #fff;
}

.el-tabs__item.is-active {
  color: #2E8CAC;
}

.el-tabs__item:hover {
  color: #2E8CAC;
}



.el-tabs__active-bar {
  background-color: #2E8CAC;
  text-align: center;
  width: 100px !important;
  /* 不加important  不会生效，important会覆盖行内样式权限级别*/
  left: 4.8%;
  /* 根据实际情设置，尽量居中就行*/
}


.songs {
    margin-left: 60px;
  background-color: transparent;
  
}


.el-table th>.cell {
  color: #7F7F7F;
  font-size: 16px;
}



.el-table tr {
  background-color: transparent;
  color: white;
  font-size: 16px;
  height: 60px;


}

.el-table td.el-table__cell {
  border: 0px;
}



.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: rgba(38, 38, 38, 0.75) !important;
  color: white !important;
}


.image1 {
  width: 230px;
  height: 230px;
  display: block;
}

.albumInfo {
  background-color: transparent;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}

.image {
  width: 120px;
  height: 120px;
}

.delete {
  border: none;
}
</style>