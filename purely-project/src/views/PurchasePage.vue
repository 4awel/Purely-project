<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            service: '',
        }
    },
    mounted() {
        this.loadService();
        // this.loadUsers()
    },
    methods: {
        async loadService() {
            const response = await axios('/services/id', {
                params: {
                    id: this.$route.params.id
                }
            });
            this.service = response.data;
            console.log(this.service)
        },

        async getProducts() {
            let iso = dayjs();
            let day = iso.format('DD.MM.YYYY HH:mm:ss');
            await axios.post('/products/send', {
                title: this.service.title,
                price: this.service.price,
                timer: true,
                date: day,
            });
        },

        goBuy(evt) {
            evt.preventDefault();
            this.getProducts();
            this.$router.push({name: 'buy', params: {
                id: this.service.id
            }});
        }
    }
}
</script>

<template>
    <div id="info" class="container-learn-parallax">
        <div class="priority-parallax">
            <div class="learn-infotext-header">
                <div class="item-infotext">
                    <div class="info-about-service">
                        <b style="color: #cfa053ea; display: flex; justify-content: center; padding: 20px 0;"
                            class="title-service">{{ service.title }}</b>
                        <hr style="margin: 0 120px;">
                        <div style="padding: 40px; text-align: center;"><span style="font-size: 4vh; color: #808080;">{{
                            service.description }}</span></div>
                        <hr style="margin: 0 120px;">
                        <b
                            style="display: flex; font-size: 3vw; justify-content: center; align-items: center; color: #6b655e;">Цена
                            услуги: {{ service.price }} руб./мес.</b>

                        <div class="bt-scale">
                            <form @submit="goBuy">
                                <button  type="submit" class="bt-buy" style="background-color: #eeb720;">
                                    Купить за {{ service.price }} руб
                                </button>
                            </form>
                        </div>
                        <div style="display: flex; justify-content: center;">
                            <span style="text-align: center; color: #8d8d8d; font-size: 12px;" class="span-submit">Нажимая на кнопку, Вы принимаете <a
                                    style="text-decoration: underline orange; color: #8d8d8d;" href="#">Положение</a> и
                                <a style="text-decoration: underline orange; color: #8d8d8d;" href="#">Согласие</a>
                                на
                                обработку
                                персональных
                                данных.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask"></div>
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

.container-learn-parallax {
    background-image: url(https://phonoteka.org/uploads/posts/2021-09/1631660882_63-phonoteka-org-p-moika-fon-krasivo-65.jpg);
    height: 800px;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    color: #333333;
    font-size: 60px;
    align-items: center;
    position: relative;
}

.container-learn-parallax .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(222, 227, 231, 0.89);
    z-index: 2;
}

.priority-parallax {
    z-index: 5;
}

.learn-infotext-header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}

.info-about-service {
    background-color: #fff;
    margin: 10vw;
    padding: 8vh;
    box-shadow: 0 0 14px 0px #96a4b1;
    border-radius: 14px;
}

.title-service {
    display: flex;
    font-size: 28px
}
</style>