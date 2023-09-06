<script>
import axios from 'axios';

export default {
    data() {
        return {

        }
    },
    methods: {
        goMainBuy() {
            this.$router.push({path: '/'})        
        }
    }
}
</script>

<template>
    <div style="display: flex; justify-content: center; color: #fff; background-color: rgb(155, 155, 155); padding: 100px;">
        <p style="font-size: 7vh;">Благодарим, Вас, за покупку!</p>
    </div>
    <p style="display: flex; justify-content: center; color: #060606; font-size: 4vh;">Товар можно посмотреть в разделе: <a style="color: #ca7834;" href="/products">"покупки"</a></p>
    <div class="bt-scale">
        <button @click="goMainBuy" class="bt-buy">Купить еще</button>
    </div>
</template>
<style>
.bt-scale {
    display: flex;
    justify-content: center;
}

.bt-buy {
    display: inline;
    margin: 8px;
    color: #fff;
    font-size: 18px;
    background-color: #eeb720;
    padding: 15px 60px;
    border: none;
    transition: all 500ms;
}

.bt-buy:hover {
    cursor: pointer;
    color: #929292;
    transform: scale(108%);
}
</style>