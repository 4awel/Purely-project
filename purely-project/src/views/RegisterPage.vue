<script>
import axios from 'axios';
export default {
    data() {
        return {
            isVisibleReg: true,
            isAlertAdres: false,
            isAlertPasswordNav: false,
            adres: '',
            firstPassword: '',
            secondPassword: '',
        }
    },
    methods: {
        next(evt) {
            evt.preventDefault()
            if (this.adres == '') {
                this.isAlertAdres = true
            } else {
                this.isVisibleReg = false
            }
        },
        exit() {
            isVisibleReg = true;
        },

        async sendRegister() {
            await axios.post('/registers', {
                email: this.adres,
                password: this.firstPassword,
                isRegistred: true,
                products: []
            })
        },

        registred(evt) {
            evt.preventDefault();
            if (this.firstPassword.length < 6 || this.secondPassword.length < 6 && this.firstPassword == '' || this.secondPassword == '') {
                this.isAlertPasswordNav = true;
            } else if (this.firstPassword != this.secondPassword) {
                this.isAlertPasswordNav = true;
            } else {
                this.sendRegister()
                this.$router.push({ name: 'main' });
            }
        }
    }
}
</script>
<template>
    <div class="container">

        <!-- Форма с вводом новых данных -->
        <form v-if="isVisibleReg"
            style=" background-color: #fff; padding: 50px; box-shadow: 0 0 8px rgb(59, 59, 59); border-radius: 14px;">
            <div style="font-size: 20px; padding: 0  0 10px 0; text-align: center;">
                <b>Регистрация</b>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Адрес эл. почты</label>
                <input :class="{ 'border-red': isAlertAdres }" v-model="adres" type="email" class="form-control"
                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите адрес эл. почты">
            </div>
            <div class="btn-scale">
                <button @click="next" class="btn-buy">Далее</button>
            </div>
            <div v-if="isAlertAdres" class="alert alert-danger" role="alert">
                Поле не заполнено! Пожалуйста введите<br> адрес электронной почты
            </div>
        </form>



        <!-- Повторение пароля -->

        <form @submit="registred" v-if="!isVisibleReg"
            style=" background-color: #fff; padding: 50px; box-shadow: 0 0 8px rgb(59, 59, 59); border-radius: 14px;">
            <div style="font-size: 20px; padding: 0  0 10px 0; text-align: center;">
                <b>Регистрация</b>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Пароль</label>
                <input v-model="firstPassword" :class="{ 'border-red': isAlertPasswordNav }" type="password"
                    class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Пароль должен состоять из 6 символов">
            </div>
            <p></p>
            <div class="form-group">
                <label for="exampleInputPassword1">Повторите пароль</label>
                <input v-model="secondPassword" :class="{ 'border-red': isAlertPasswordNav }" type="password"
                    class="form-control" id="exampleInputPassword1" placeholder="Повторите пароль">
            </div>
            <div class="btn-scale">
                <button @click="exit" class="btn-buy-exit">Назад</button>
                <button type="submit" class="btn-buy">Зарегистрироваться</button>
            </div>
            <div v-if="isAlertPasswordNav" class="alert alert-danger" role="alert">
                Пароли не совпадают, убедитесь, что они верны!
            </div>
        </form>
    </div>
</template>
<style>
.border-red {
    border-color: rgb(223, 106, 106);
}

.container {
    background-color: #dfdfdf;
    padding: 200px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
}

.btn-scale {
    display: flex;
    justify-content: right;
}

.btn-buy {
    display: inline;
    margin: 8px;
    color: #fff;
    font-size: 14px;
    background-color: #eeb720;
    padding: 10px 40px;
    border: none;
    transition: all 500ms;
}

.btn-buy:hover {
    cursor: pointer;
    color: #929292;
    /* transform: scale(108%); */
    background-color: #af7d21;
}

.btn-buy-exit {
    display: inline;
    margin: 8px;
    color: #fff;
    font-size: 14px;
    background-color: #666666;
    padding: 10px 40px;
    border: none;
    transition: all 500ms;
}

.btn-buy-exit:hover {
    cursor: pointer;
    color: #d3d3d3;
    /* transform: scale(108%); */
    background-color: #424242;
}
</style>