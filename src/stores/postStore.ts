import { defineStore } from 'pinia'
import { Post } from '../types'

export const usePostStore = defineStore ('post', {
    state : () => ({
        posts : JSON.parse(localStorage.getItem('posts') || '[]') as Post[],
        currentPost : null as Post | null,
        currentPage : 1,
        postsPerPage : 10
    }),
    getters : {
        getPosts : (state) => state.posts,
        getCurrentPost : (state) => state.currentPost,
        paginatedPosts : (state) => {
            const start  = (state.currentPage - 1) * state.postsPerPage;
            const end = start + state.postsPerPage;
            return state.posts.slice(start,end)
        },
        totalPages : (state) => Math.ceil(state.posts.length / state.postsPerPage)
    },
    actions : {
        fetchPosts() {
            
            // this.posts = Array.from({length :100}, (_, index) => ({
            //     id : index + 1,
            //     title : `게시글 제목 ${index + 1}`,
            //     content : `게시글 ${index + 1} 의 내용입니다. `,
            //     author : `작성자 ${index % 5 + 1}`,
            //     date : new Date(Date.now() - Math.floor(Math.random() * 10000000000))
            // }));

            this.posts = JSON.parse(localStorage.getItem('posts') || '[]');
        },
        selectPost(postId : number) {
            this.currentPost = this.posts.find(p => p.id === postId) || null;
        },
        setCurrentPage(page : number) {
            this.currentPage = page;
        },

        addPost(newPost : Omit<Post, 'id'>) {
            const id = this.posts.length > 0 ? Math.max(...this.posts.map(p => p.id)) + 1 : 1;
            this.posts.unshift({ ...newPost, id});
            this.savePosts();
        },

        savePosts() {
            localStorage.setItem('posts' , JSON.stringify(this.posts));
        }
    }
})