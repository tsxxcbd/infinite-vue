<script>
import {Plus, CaretRight} from '@element-plus/icons-vue'
import { ref,onMounted } from 'vue'
import { ElForm, ElButton, ElInput, ElRow, ElCol } from 'element-plus';
import { chatAPI } from '../api/langchain.js'
import currentListStore from '../stores/currentList.js';
import useListStore from '../stores/playList.js'

export default {
  components: {
    ElForm,
    ElButton,
    ElInput,
    ElRow,
    ElCol,
  },
  data() {
    return {
      inputText: '',
      messages: [
        { id: 1, text: '你好', isMe: false },
        { id: 2, text: 'Hi', isMe: true },
      ],
      resSongId: '',
      //addcurrentsongid: '',
      ans: {},
      id: ''
    };
  }, methods: {
    async handleSend() {
      // 发送消息
      if (this.inputText.trim()) {
        this.messages.push({ id: Date.now(), text: this.inputText, isMe: true });
      }

      // 发送请求并获取回复
      console.log(this.inputText);
      try {
        const response = await chatAPI(this.inputText);
        console.log(response);

        // 解析 JSON 字符串
        // const responseData = JSON.parse(response);
        // 获取 ans 字段的值
        const answerText = response.ans;
        this.resSongId = response.id;
        //this.addcurrentsongid = response.id;
        console.log(answerText);

        // 将回答添加到 messages 数组中
        if (answerText.trim()) {
          this.messages.push({
            id: Date.now(),
            text: answerText,
            isMe: false,
          });
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }

      // 清空输入框
      this.inputText = '';
    },
  },
  setup() {

    const addSongTolistdialogVisible = ref(false);




    const listStore = useListStore()

    onMounted(()=>{
      listStore.getCreateList()
    })

    const addcurrentlistId = ref(0)
    const addcurrentsongId = ref(0)

    const currentList = currentListStore()


    const addToCurrentList = async (id) => {
      const album = ref('')
      const songName = ref('')
      const singer = ref('')
      const songDetailsUrl = ref(`http://localhost:3000/song/detail?ids=${id}`);
        try {
            const response = await fetch(songDetailsUrl.value, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              },
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            //console.log(data)
    
            const song = data.songs[0]; // API返回的数据结构中包含了歌曲详情信息
    
            songName.value = song.name;
            singer.value = song.ar[0].name;
            album.value = song.al.name;
          } catch (error) {
            console.error('获取歌曲详情失败:', error);
          }

        const selectedProps = {
            album: album.value,
            songName: songName.value,
            artist: singer.value,
            songid: id
        }
        currentList.addSongToCurrent(selectedProps)
    }


    return {
      addSongTolistdialogVisible,
      addcurrentsongId,
      addcurrentlistId,
      addToCurrentList,
      listStore
    }

  },


};
</script>
<template>
  <div class="chat-window">
    <!-- 显示聊天消息的容器 -->
    <div class="message-container">
      <div v-for="message in messages" :key="message.id" class="message">
        <div v-if="message.isMe" class="message-text mine">
          {{ message.text }}</div>
        <div v-else class="message-text chat">
          {{ message.text }}</div>
      </div>
    </div>
    <!-- 输入消息的表单 -->
    <el-form @submit.prevent.native="sendMessage" class="input-form">
      <el-row :gutter="30" align="middle" class="form-row">
        <el-col :span="12">
          <el-input  v-model="inputText" placeholder="输入消息" class="inputText" ></el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="handleSend">发送</el-button>
          <el-button @click="addToCurrentList(resSongId)" class="addToCurrent iconfont icon-24gf-playlist4" circle />
          <el-button @click="addSongTolistdialogVisible = true" type="primary" circle class="addToList" >+</el-button>

        </el-col>
      </el-row>
    </el-form>
  </div>



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
        <el-button type="primary" @click="listStore.addSongToList({id: addcurrentlistId, songId: resSongId}), addSongTolistdialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>  

</template>



<style lang="less" scoped>
.addToCurrent {
  margin-left: 40px;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
}

.addToList {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 30px;
}

.chat-window {
  backdrop-filter: blur(10px);
  max-width: 430px;
  margin: 0 auto;
  height: 550px;
  /* 固定高度为500px */
  max-height: 500px;
  /* 设置最大高度为500px */
  overflow-y: auto;
  /* 当内容超出高度时显示纵向滚动条 */
  position: relative;

}


.message {
  padding: 5px;
  margin-bottom: 5px;

}

.message-text {
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #121a2a
}

.mine {
  background-color: #fff;
}



.inputText {
  font-size: 16px;
  border-color: #fff;
}
.el-input {
  --el-input-border-color:#ffffff6d;
}


.chat {
  position: relative;
}
</style>

<style>
.addToList {
  top: 70px;
  background-color: #000;
  font-size: 20px;
}

.input-form {
  position: absolute;
  bottom: 10px;
  /* 距离底部50px */
  left: 45px;
}

.message-container
 {
  max-height: 400px;
  overflow-y: scroll;
 }
 </style>