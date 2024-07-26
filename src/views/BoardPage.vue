<template>
    <div class="board-page">
        <h1 class = "board-page__title"> 게시판 페이지</h1>
        <router-link to="/create" class = "btn-create">새 게시물 작성</router-link>
        <Board :title = "'커뮤니티 게시판'" />
        <Pagination  :currentPage = "currentPage" :totalPages = "totalPages" @pageChanged = "onPageChange" />
    </div>
</template>

<script lang = "ts">
    import { defineComponent , onMounted, computed } from 'vue';
    import Board from '../components/Board.vue';
    import { usePostStore } from '../stores/postStore';
    import Pagination from '../components/Pagination.vue';


    export default defineComponent({
        name : 'BoardPage',
        components : {
            Board,
            Pagination
        },

        setup() {
            const postStore = usePostStore();

            onMounted(() => {
                postStore.fetchPosts();
                postStore.setCurrentPage(1);
            })

            const currentPage = computed(() => postStore.currentPage);
            const totalPages = computed(() => postStore.totalPages);

            const onPageChange = (page : number) =>{
                postStore.setCurrentPage(page);
            }

            return {
                currentPage,
                totalPages,
                onPageChange
            }
        }

    });

</script>

<style lang = "scss" scoped>
.board-page {
    padding :20px;

    &__title {
        font-size : 28px;
        color : #333;
        margin-bottom : 20px;
    }

    .btn-create {
        display : inline-block;
        margin-bottom : 20px;
        padding : 10px 15px;
        background-color : #2ecc71;
        color : white;
        text-decoration : none;
        border-radius : 4px;
    }

}

</style>