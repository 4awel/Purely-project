<script>
import axios from 'axios';
export default {
    data() {
        return {
            active: false,
            open: false,
            isRegistred: false,
            username: ''
        }
    },
    mounted() {
        this.loadAccountUsers()
    },
    methods: {
        burgerMenu() {
            this.active = !this.active;
            this.open = !this.open;
        },
        goMain() {
            this.$router.push({ name: 'main' });
        },
        goRegister() {
            this.$router.push({ name: 'register' });
        },
        goLogin() {
            this.$router.push({ name: 'login' });
        },
        async loadAccountUsers() {
            let response = await axios('/users/account');
            // console.log(response.data)
            if (response.data.isRegistred == true) {
                this.isRegistred = true
                this.username = response.data.email
            }
        },
        goProducts() {
            this.$router.push({name: 'products'})
        }
    }
}
</script>
<template>
    <header>
        <!-- меню сайта -->
        <nav :class="{ 'open': open }" class="nav-header">
            <ul>
                <li @click="goMain" class="a-nav"><a href="#main">Главная</a></li>
                <li @click="goMain" class="a-nav"><a href="#service">Услуги</a></li>
                <li @click="goMain" class="a-nav"><a href="#info">Об автомойке</a></li>
                <li v-if="isRegistred" @click="goProducts"  class="a-nav-login">Покупки</li>
                <li v-if="isRegistred" class="a-nav-login">{{ username }}</li>
                <li v-if="!isRegistred" @click="goLogin" class="a-nav-login">Вход</li>
                <li v-if="!isRegistred" @click="goRegister" class="a-nav-login">Зарегистрироваться</li>
            </ul>
        </nav>
        <!-- бургер меню -->
        <div @click="burgerMenu" :class="{ 'active': active }" class="burger">
            <span></span>
        </div>
    </header>
</template>

<style>
html {
    font-family: sans-serif;
}

body {
    margin: 0;
}

header {
    display: flex;
    color: #333333;
    background-color: #fff;
    position: sticky;
    top: 0;
    box-shadow: 0 0 3.5px 0px #333333;
    padding: 4px 40px;
    justify-content: center;
    align-items: center;
    z-index: 50;
}

.open {
    display: flex !important;
}

.nav-header {
    display: flex;
    width: 700px;
    padding: 0 10px;
}

.nav-header ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: space-between;
}

.a-nav {
    font-size: 16px;
    text-decoration: none;
    padding: 0 4px;
    cursor: pointer;
}

.a-nav a {
    text-decoration: none;
    color: #333333;
}

.a-nav-login {
    color: #eeb720;
}

.a-nav-login:hover {
    color: #af7d21;
    cursor: pointer;
}

.a-nav,
a:hover {
    transition: all 500ms;
    color: #8d8d8d;
}

.burger {
    display: none;
    position: relative;
    z-index: 50;
    align-items: center;
    justify-content: flex-end;
    width: 30px;
    height: 20px;
    cursor: pointer;
}

.burger span {
    height: 2px;
    width: 100%;
    transform: scale(1);
    background-color: #8d8d8d;
}

.burger::before,
.burger::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: #8d8d8d;
    transition: all 0.3s ease 0s;
}

.burger::before {
    top: 0;
}

.burger::after {
    bottom: 0;
}

.burger.active span {
    transform: scale(0);
}

.burger.active::before {
    top: 50%;
    transform: rotate(-45deg) translate(0, -50%);
}

.burger.active::after {
    bottom: 50%;
    transform: rotate(45deg) translate(0, 50%);
}

@media (max-width: 900px) {
    .burger {
        display: flex;
    }

    .a-nav {
        color: #8d8d8d;
    }

    .a-nav:hover {
        color: #fff;
    }

    .nav-header {
        display: none;
        flex-direction: column;
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 50;
        overflow-y: auto;
        padding: 50px 40px;
        background-color: rgba(0, 0, 0, 0.9);
        animation: burgerAnimation 0.4%;
    }

    .nav-header ul {
        flex-direction: column;
        row-gap: 30px;
    }

    @keyframes burgerAnimation {
        from {
            opacity: 0
        }

        to {
            opacity: 1
        }
    }
}
</style>