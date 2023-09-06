<script>
import axios from 'axios';
export default {
    data() {
        return {
            password: '',
            adres: ''
        }
    },
    mounted() {

    },
    methods: {
        async sendDataLogin() {
            await axios.post('/users', {
                email: this.adres,
                password: this.password,
            });
        },
        goMain() {
            this.sendDataLogin();
            this.$router.push({ name: 'main' });
        }
    }
}
</script>
<template>
    <div class="contaner-login">
        <form @submit="goMain"
            style="  background-color: #fff; padding: 50px; box-shadow: 0 0 8px rgb(59, 59, 59); border-radius: 14px;">
            <div style="font-size: 20px; padding: 0  0 10px 0; text-align: center;">
                <b>Вход</b>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Адрес эл. почты</label>
                <input v-model="adres" :class="{ 'border-red': isAlertError }" type="email" class="form-control"
                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите адрес эл. почты">
            </div>
            <p></p>
            <div class="form-group">
                <label for="exampleInputEmail1">Пароль</label>
                <input v-model="password" :class="{ 'border-red': isAlertError }" type="password" class="form-control"
                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите пароль">
            </div>
            <div class="btn-scale-g">
                <button type="submit" class="btn-buy-g">Вход</button>
            </div>
            <div v-if="isAlertError" class="alert alert-danger" role="alert">
                Данные не верны!
            </div>
        </form>
    </div>
</template>
<style>
.border-red-g {
    border-color: rgb(223, 106, 106);
}

.container-login {
    background-color: #dfdfdf;
    padding: 200px;
    display: flex;
    justify-content: center;
}

.btn-scale-g {
    display: flex;
    justify-content: right;
}

.btn-buy-g {
    display: inline;
    margin: 8px;
    color: #fff;
    font-size: 14px;
    background-color: #eeb720;
    padding: 10px 40px;
    border: none;
    transition: all 500ms;
}

.btn-buy-g:hover {
    cursor: pointer;
    color: #929292;
    /* transform: scale(108%); */
    background-color: #af7d21;
}
</style>