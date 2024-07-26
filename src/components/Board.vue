<template>
    <div class="board">
        <h2 class="board__title">{{ title }}</h2>
        <ul class="board__list">
            <li
                v-for="post in paginatedPosts"
                :key="post.id"
                class="board__item"
                @click="goToPostDetail(post.id)">
                <h3 class="board__title">{{ post.title }}</h3>
                <p class="board__item-content" v-html="sanitizedContentPreview(post.content)"></p>
                <div class="board__item-meta">
                    <span class="board__item-author">{{ post.author }}</span>
                    <span class="board__item-date">{{ formatDate(post.date) }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {useRouter} from 'vue-router';
    import {usePostStore} from '../stores/postStore';
    import {storeToRefs} from 'pinia';
    import DOMPurify from 'dompurify';

    export default defineComponent({
        name: 'Board',
        props: {
            title: {
                type: String,
                required: true
            }
        },
        setup() {
            const postStore = usePostStore();
            const router = useRouter();

            const {paginatedPosts} = storeToRefs(postStore);

            const goToPostDetail = (postId : number) => {
                postStore.selectPost(postId);
                router.push({
                    name: 'PostDetail',
                    params: {
                        id: postId.toString()
                    }
                });
            };

            const formatDate = (date : Date | string): string => {
                return new Date(date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            };

            const getContentPreview = (content: any): string => {
      if (typeof content === 'string') {
        return content.substring(0, 100) + (content.length > 100 ? '...' : '');
      } else if (typeof content === 'object' && content !== null && 'ops' in content) {
        let preview = '';
        let charCount = 0;
        for (let op of content.ops) {
          if (typeof op.insert === 'string') {
            let text = op.insert;
            let style = '';
            if (op.attributes) {
              if (op.attributes.bold) style += 'font-weight: bold;';
              if (op.attributes.italic) style += 'font-style: italic;';
              if (op.attributes.underline) style += 'text-decoration: underline;';
              if (op.attributes.color) style += `color: ${op.attributes.color};`;
            }
            if (style) {
              text = `<span style="${style}">${text}</span>`;
            }
            preview += text;
            charCount += op.insert.length;
          } else if (op.insert && op.insert.image) {
            preview += '[이미지] ';
            charCount += 8;
          }
          if (charCount >= 100) break;
        }
        return preview.substring(0, 100) + (charCount > 100 ? '...' : '');
      }
      return '내용 없음';
    };

    const sanitizedContentPreview = (content : any): string => {
      const rawPreview = getContentPreview(content);
      return DOMPurify.sanitize(rawPreview);
    }

    return { 
      paginatedPosts, 
      goToPostDetail, 
      formatDate,
      getContentPreview,
      sanitizedContentPreview 
    };
  }
});
</script>

<style lang="scss" scoped="scoped">
    $primary-color: #3498db;
    $secondary-color: #2ecc71;
    $text-color: #333;
    $background-color: #f9f9f9;

    .board__item-content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; // 최대 3줄까지 표시
        -webkit-box-orient: vertical;
    }

    .board {
        font-family: Arial, sans-serif;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: $background-color;

        &__title {
            color: $primary-color;
            font-size: 24px;
            margin-bottom: 20px;
        }

        &__list {
            list-style-type: none;
            padding: 0;
        }

        &__item {
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            padding: 15px;
            cursor: pointer;
            transition: box-shadow 0.3s ease;

            &:hover {
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            }

            &-title {
                color: $primary-color;
                font-size: 18px;
                margin-bottom: 10px;
            }

            &-content {
                color: $text-color;
                margin-bottom: 10px;
            }

            &-meta {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #777;
            }

            &-author {
                font-weight: bold;
            }

            &-date {
                font-style: italic;
            }
        }
    }
</style>