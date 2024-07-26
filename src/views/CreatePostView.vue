<template>
    <div class = "create-post-view">
        <h1>새 게시글 작성</h1>
        <CreatePost />
    </div>
</template>
<script lang = "ts">
import { defineComponent } from 'vue'
import CreatePost from '../components/CreatePost.vue'

export default defineComponent({
  name: 'CreatePostView',
  components: {
    CreatePost
  }
});

</script>
<style lang="scss" scoped>

.create-post-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
}
</style>