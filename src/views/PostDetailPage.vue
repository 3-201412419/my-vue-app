<template>
  <div class="post-detail-page" v-if="currentPost">
    <div class="post-header">
      <h1 class="post-title">{{ currentPost.title }}</h1>
      <div class="post-meta">
        <span class="post-author">
          <i class="fas fa-user"></i>
          {{ currentPost.author }}
        </span>
        <span class="post-date">
          <i class="fas fa-calendar-alt"></i>
          {{ formatDate(currentPost.date) }}
        </span>
      </div>
    </div>
    <div class="post-content" v-html="sanitizedContent"></div>
    <div class="post-actions">
      <button @click="goBack" class="btn btn-back">
        <i class="fas fa-arrow-left"></i>
        목록으로 돌아가기
      </button>
    </div>
  </div>
  <div v-else class="post-not-found">
    <h2>게시물을 찾을 수 없습니다.</h2>
    <p>요청하신 게시물이 존재하지 않거나 삭제되었을 수 있습니다.</p>
    <button @click="goBack" class="btn btn-back">
      <i class="fas fa-arrow-left"></i>
      목록으로 돌아가기
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '../stores/postStore';
import DOMPurify from 'dompurify';

export default defineComponent({
  name: 'PostDetailPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const postStore = usePostStore();

    const currentPost = computed(() => postStore.getCurrentPost);

    const sanitizedContent = computed(() => {
      if (currentPost.value) {
        const content = getContent(currentPost.value.content);
        return DOMPurify.sanitize(content);
      }
      return '';
    });

    onMounted(async () => {
      const postId = Number(route.params.id);
      postStore.selectPost(postId);
    });

    const formatDate = (date: Date | string) => {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const getContent = (content: string | object): string => {
  if (typeof content === 'string') {
    return content;
  } else if (typeof content === 'object' && content !== null) {
    if ('ops' in content) {
      return (content as any).ops.map((op: any) => {
        if (typeof op.insert === 'string') {
          let text = op.insert;
          if (op.attributes) {
            if (op.attributes.bold) text = `<strong>${text}</strong>`;
            if (op.attributes.italic) text = `<em>${text}</em>`;
            if (op.attributes.underline) text = `<u>${text}</u>`;
            if (op.attributes.strike) text = `<s>${text}</s>`;
            if (op.attributes.size) text = `<span style="font-size: ${op.attributes.size};">${text}</span>`;
            // 추가 속성에 대한 처리를 여기에 추가할 수 있습니다.
          }
          return text;
        } else if (op.insert && op.insert.image) {
          return `<img src="${op.insert.image}" alt="Embedded Image">`;
        }
        return '';
      }).join('');
    }
    return JSON.stringify(content);
  }
  return '내용 없음';
};

    const goBack = () => {
      router.push({ name: 'Board' });
    };

    return { currentPost,  sanitizedContent, formatDate, goBack, getContent };
  }
});
</script>
<style lang = "scss" scoped>

.post-detail-page, .post-not-found {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.post-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;

  .post-author, .post-date {
    display: flex;
    align-items: center;

    i {
      margin-right: 0.5rem;
    }
  }
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 2rem;

  :deep(img){
    max-width : 100%;
    height : auto;
  }

  :deep(blockquote){
    border-left :4px solid #ccc;
    margin-bottom : 5px;
    margin-top : 5px;
    padding-left : 16px;
  }

  :deep(pre){
    background-color : #f0f0f0;
    border-radius : 3px;
    padding : 10px;
    overflow-x : auto;
  }
}

.post-actions {
  text-align: center;
}

.btn {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &-back {
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
    }
  }

  i {
    margin-right: 0.5rem;
  }
}

.post-not-found {
  text-align: center;

  h2 {
    font-size: 1.8rem;
    color: #e74c3c;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }
}
</style>