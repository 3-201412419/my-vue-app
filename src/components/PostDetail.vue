<template>
    <div class = "post-detail" v-if = "post">
        <h2 class = "post-detail__title"> {{ post.title}}</h2>
        <div class = "post-detail__meta">
            <span class = "post-detail__author">작성자 : {{ post.author}}</span>
            <span class = "post-detail__date">작성일 : {{ formatDate(post.date)}}</span>
        </div>
        <p class = "post-detail__content" v-html="getContent(post.content)"></p>
        <button @click = "$emit('close')" class = "post-detail__close">닫기</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Post } from '../types';

export default defineComponent({
  name: 'PostDetail',
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  emits: ['close'],
  setup() {
    const formatDate = (date: Date | string): string => {
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
        // Quill 델타 객체를 HTML로 변환
        if ('ops' in content) {
          return (content as any).ops.map((op: any) => {
            if (typeof op.insert === 'string') {
              return op.insert;
            } else if (op.insert && op.insert.image) {
              return `<img src="${op.insert.image}" alt="Embedded Image">`;
            }
            return '';
          }).join('');
        }
        // 다른 형태의 객체라면 JSON 문자열로 변환
        return JSON.stringify(content);
      }
      return '내용 없음';
    };

    return {
      formatDate,
      getContent
    };
  }
});
</script>
<style lang="scss" scoped>
.post-detail {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;

  &__title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  &__meta {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }

  &__content {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    
    :deep(img) {
      max-width: 100%;
      height: auto;
    }

    :deep(p) {
      margin-bottom: 1em;
    }
  }

  &__close {
    margin-top: 20px;
    padding: 8px 16px;
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

</style>