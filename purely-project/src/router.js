import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import MainPage from './views/MainPage.vue';
import PurchasePage from './views/PurchasePage.vue';
import BuyPage from './views/BuyPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import LoginPage from './views/LoginPage.vue';
import ProductsPage from './views/ProductsPage.vue';

export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainPage,
        },
        {
            path: '/purchase/:id',
            name: 'purchase',
            component: PurchasePage
        },
        {
            path: '/buy/:id',
            name: 'buy',
            component: BuyPage 
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/products',
            name: 'products',
            component: ProductsPage
        }
    ]
})