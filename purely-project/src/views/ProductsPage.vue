<script>
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
        }
    },
    mounted() {
        this.loadProducts()
    },
    methods: {
        async loadProducts() {
            const response = await axios('/users/account')
            this.products = response.data.products;
        }
    },

}
</script>
<template>
    <div class="container-products">
        <h2 style="font-size: 45px; color: #eeb720;">Товары:</h2>
        <div v-for="(item, index) in products" class="products">
            <div style="display: flex; flex-direction: column;">
                <span>Название</span>
                <span>Цена</span>
                <span>Дата покупки</span>
                <span>Срок действия</span>
            </div>
            <div style="display: flex; flex-direction: column;">
                <b>{{ item.title }}</b>
                <span style="color: #c79818">{{ item.price }} руб</span>
                <span style="color: #c79818">{{ item.date }}</span>
                <span style="color: #c79818">24:59:43:39</span>
            </div>
        </div>
    </div>
</template>
<style>
.container-products {
    padding: 100px;

}

.products {
    box-shadow: 0 1px 6px black;
    border-radius: 16px;
    padding: 30px;
    margin: 12px 0;
    display: flex;
    justify-content: space-between;
}
</style>