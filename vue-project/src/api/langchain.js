import request from '@/utils/request.js'

export const chatAPI = (inputText) => {
    return request.get('/llm/chat?input="'+inputText+'"');
}