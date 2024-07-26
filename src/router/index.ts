import { createRouter, createWebHistory, RouteRecordRaw}  from 'vue-router'
import Home from '../views/Home.vue'
import BoardPage from '../views/BoardPage.vue'
import PostDetailPage from '../views/PostDetailPage.vue'
import CreatePostView  from '../views/CreatePostView.vue'

const routes : Array<RouteRecordRaw> = [
    {
        path : '/',
        name : 'Home',
        component : Home
    },
    {
        path : '/board',
        name : 'Board',
        component : BoardPage
    },
    {
        path : '/post/:id',
        name : 'PostDetail',
        component : PostDetailPage,
        props : true
    },
    {
        path : '/create',
        name : 'CreatePost',
        component : CreatePostView
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router

