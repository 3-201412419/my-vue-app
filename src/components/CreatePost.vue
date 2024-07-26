<template>
    <div class = "create-post">
        <h2>새 게시글 작성</h2>
        <form @submit.prevent = "submitPost">
            <div class = "form-group">
                <label for = "title">제목</label>
                <input type = "text" id = "title" v-model = "title" required>
            </div>
            <div class = "form-group" v-if="isMounted">
                <label for = "content">내용</label>
                <QuillEditor v-model:content="content" :options="editorOptions"/>
            </div>
            <div class = "form-group">
                <label for = author>작성자</label>
                <input type = "text" id = "author" v-model = "author" required>
            </div>
            <button type = "submit" class = "btn-submit">게시글 작성</button>
        </form>
    </div>
</template>

<script lang ="ts">
import {defineComponent , ref, onMounted } from 'vue';
import { useRouter} from 'vue-router';
import { usePostStore } from '../stores/postStore';
import DOMPurify from 'dompurify';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default defineComponent ({
    name : 'CreatePost',
    components : {
      QuillEditor,
    },
    setup() {
        const router = useRouter();
        const postStore = usePostStore();
        const isMounted = ref(false);

        const title = ref('');
        const content = ref('');
        const author = ref('');

        

        onMounted(() => {
          isMounted.value = true;
        })

        const editorOptions = {
          thmeme : 'snow',
          modules : {
            toolbar : [
              ['bold', 'italic', 'underline' , 'strike'],
              ['blockquote', 'code-block'],
              [{'header': 1}, {'header' : 2}],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script' : 'sub'}, {'script': 'super'}],
              [{'indent' : '-1'}, {'indent': '+1'}],
              [{'direction' : 'rt1'}],
              [{'size' : ['small', false, 'large', 'huge']}],
              [{'header' : [1,2,3,4,5,6,false]}],
              [{'color' : []}, {'background' : [] }],
              [{'font' : [] }],
              [{'align' : [] }],
              ['clean'],
              ['link', 'image']
            ]
          },
          placeholder : '내용을 입력해주세요',
          readonly : false,
          bounds : document.body,
        };

        const submitPost = () => {
            const sanitizedContent = DOMPurify.sanitize(content.value);
            const newPost = {
                title : title.value,
                content : sanitizedContent,
                author : author.value,
                date : new Date()
            };

            postStore.addPost(newPost);
            router.push({ name : 'Board', query : {newPost : 'true'}});
        };

        return { title , content , author , submitPost, editorOptions, isMounted}
    }
});
</script>
<style lang="scss" scoped>
    .create-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;


  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }


  }

  .btn-submit {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #2980b9;
    }
  }
}

:deep(.ql-container) {
  height: 300px;
}

</style>