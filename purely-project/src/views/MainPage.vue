<script>
import axios from 'axios'
export default {
    data() {
        return {
            services: [],
            isRegistred: false,
            phone: '',
            username: '' 
        }
    },
    mounted() {
        this.loadService();
        this.loadAccountUsers()
    },
    methods: {
        async loadService() {
            const response = await axios('/services');
            this.services = response.data
            console.log(this.services)
        },
        goPurchase(service) {
            this.$router.push({
                name: 'purchase', params: {
                    id: service._id
                }
            });
            console.log(service._id)
        }, 
        async loadAccountUsers () {
            let response = await axios('/users/account');
            // console.log(response.data)
            if (response.data.isRegistred == true) {
                this.isRegistred = true
            }
        },
        async senfData(evt) {
            evt.preventDefault();
            await axios.post('/register/phone', {
                username: this.username,
                phone: this.phone
            });
            this.phone = '';
            this.username = ''
        }
    }
}        
</script>


<template>
    <!-- <main> -->
    <!-- Контейнер с изображение и загаловком -->
    <div class="container-headerimg">
        <div class="headerimg">
            <div class="container-headerimg-info">
                <div class="text-headerimg">
                    <div class="header1-headerimg">
                        <h1 class="wow slideInUp">Круглосуточная автомойка</h1>
                    </div>
                    <div class="header3-headerimg">
                        <span id="p-headerimg-h3">Мойка автомобилей, оказываем сопутствующие услуги. Чистка салона,
                            полировка, удаление битумных
                            пятен, мойка двигателя и др.
                        </span>
                    </div>
                </div>
                <div class="group-btn-header-headerimg">
                    <!-- <div class="btn-headerimg"></div>
                    <div class="btn-headerimg"></div>
                    <div class="btn-headerimg"></div> -->
                    <a href="#enroll" style="text-decoration: none;"><button
                            class="btn-headerimg-orange">Записаться</button></a>
                </div>
                <div class="btn-info-headerimg">
                    <span>Нажимая на кнопку, Вы принимаете <a class="a-headerimg" href="#">Положение</a> и <a
                            class="a-headerimg" href="#">Согласие</a> на обработку персональных данных.</span>
                </div>
            </div>
            <div class="container-headerimg-blur"></div>
        </div>
    </div>
    <!-- Контайнер с инф-цией о компании -->
    <div class="container-infocompany">
        <div class="text-infocompany">
            <span>Почему выбирают именно нашу автомойку</span>
        </div>
        <div class="header2-infocompany">
            <h2>Автомойка «Purely» – это</h2>
        </div>
        <div class="group-img-info">
            <div class="img-info">
                <img style="width: 180px;" src="../assets/successcar.png" alt="">
                <h3>Доступные расценки</h3>
                <span>Мы предлагаем обучение по уникальной авторской методике</span>
            </div>
            <div class="img-info">
                <img style="width: 180px;" src="../assets/successcar.png" alt="">
                <h3>Тщательная очистка</h3>
                <span>Для каждого ученика мы разрабатываем индивидуальную программу обучения</span>
            </div>
            <div class="img-info">
                <img style="width: 180px;" src="../assets/successcar.png" alt="">
                <h3>Удобное расположение</h3>
                <span>Наши ученики успешно сдают все международные экзамены</span>
            </div>
        </div>
    </div>

    <!-- Контейнер с услугами -->
    <div class="container-service">
        <div id="service" class="service-span">
            <span>Выберите необходимую услугу</span>
        </div>
        <div class="service-header">
            <h2>Услуги круглосуточной автомойки</h2>
        </div>
        <div class="section-service">
            <div style="display: flex; z-index: 49; padding: 50px;" v-if="!isRegistred" class="alert alert-info" role="alert">
                Чтобы совершать покупки на сайте, Вам нужно войти или создать аккаунт!
            </div>
            <section v-if="isRegistred" @click="goPurchase(item)" v-for="(item, index) in services">
                <img :src="'src/assets/' + item.image + '.jpg'" alt="">
                <div class="padding-at-img"></div>
                <div class="info-service">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                    <span>Стоимость – {{ item.price }} руб./месяц</span>
                </div>
            </section>
        </div>
    </div>

    <div id="info" class="container-learn-parallax">
        <div class="priority-parallax">
            <div class="learn-infotext-header">
                <div class="item-infotext">
                    <div class="item">
                        <div class="header-learn-text">
                            <p>В чем состоит наша главная цель</p>
                            <span>Наша деятельность</span>
                            <p>Наша автомойка позволяет:</p>
                        </div>
                        <div class="under-header-learn-text">
                            <p>– снизить затраты времени на чистку</p>
                            <p>– иметь идеальную цену среди всех автомоек в вашем городе</p>
                            <p>– особенность платить в месяц тем самым не беспокоясь о постоянных платежей</p>
                            <p>– качественное качество мытья и методики в новой био-химчистки</p>
                            <p>– дружелюбный персонал который делает свою работу максимально качественно
                            </p>
                        </div>
                    </div>
                </div>
                <form @submit="senfData">
                    <div class="item-infotext">
                        <div class="item-padd">
                            <div class="input-learn-well">
                                <p>Запишитесь на мойку через нашего менеджера</p>
                                <p>«Purely»</p>
                                <div class="container-input-well">
                                    <label style="font-size: 16px; color: #8d8d8d; padding: 8px 0; display: flex;"
                                        for="">Введите имя</label>
                                    <div class="well">
                                        <input v-model="username" class="input-well" type="text" placeholder="Введите имя">
                                    </div>
                                    <label style="font-size: 16px; color: #8d8d8d; padding: 8px 0; display: flex;"
                                        for="">Введите номер телефона</label>
                                    <label style="font-size: 12px; color: #8d8d8d; padding: 3px 0; display: flex;"
                                        for="">Наш
                                        менеджер Вам перезвонит</label>
                                    <div class="well">
                                        <input v-model="phone" class="input-well" type="number" placeholder="xxx-xxx-xxx">
                                    </div>
                                    <button type="submit" class="input-submit-btn-orange">Записаться</button>
                                    <span style="color: #8d8d8d" class="span-submit">Нажимая на кнопку, Вы принимаете <a
                                            style="text-decoration: underline orange; color: #8d8d8d" href="#">Положение</a>
                                        и <a style="text-decoration: underline orange; color: #8d8d8d" href="#">Согласие</a>
                                        на обработку
                                        персональных
                                        данных.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="mask"></div>
    </div>

    <!-- Контейнер информация достижений -->
    <div class="conatiner-info-succes">
        <div class="succes-textinfo">
            <div class="succes-textinfo-span">
                <span>Каких успехов достигла наша автомойка</span>
            </div>
            <div class="succes-textinfo-h2">
                <h2>Об автомойке в цифрах</h2>
            </div>
        </div>
        <div class="succes-info-img-group">
            <div class="img-succes">
                <img width="180px" src="../assets/petrol_can_icon_227553.svg" alt="">
                <h3>Более 2000</h3>
                <span>учеников, которые успешно прошли обучение в нашей онлайн-школе</span>
            </div>
            <div class="img-succes">
                <img width="180px" src="../assets/orangecar.png" alt="...">
                <h3>От 140</h3>
                <span>учеников, которые успешно прошли обучение в нашей онлайн-школе</span>
            </div>
            <div class="img-succes">
                <img width="180px" src="../assets/policecar.png" alt="...">
                <h3>Более 600</h3>
                <span>учеников, которые успешно прошли обучение в нашей онлайн-школе</span>
            </div>
        </div>
    </div>

    <!-- Контейнер с инф-цией об обучении -->
    <div class="container-learn-parallax">
        <div class="priority-parallax">
            <div class="learn-infotext-header">
                <div class="item-infotext">
                    <div class="item">
                        <div class="header-learn-text">
                            <p>Какие варианты лучших услуг мы предлагаем</p>
                            <span>Об услугах:</span>
                        </div>
                        <div class="under-header-learn-text">
                            <p>Экспресс-мойка - самый лучший по своей цене услуга, так как проводится быстрая мойка с
                                помощью автоматизированной мойки</p>
                            <p>Двухфазная мойка - лучший в плане качества мойка, но времени займет чуть больше чем у
                                экспресс-мойкм</p>
                            <p style="color: orange;">Примичание! Любую услугу Вы можете заключить с нашим менеджером!</p>
                        </div>
                    </div>
                </div>
                <form @submit="senfData" id="enroll">
                    <div class="item-infotext">
                        <div class="item-padd">
                            <div class="input-learn-well">
                                <p>Запишитесь на мойку через нашего менеджера</p>
                                <p>«Purely»</p>
                                <div class="container-input-well">
                                    <label style="font-size: 16px; color: #8d8d8d; padding: 8px 0; display: flex;"
                                        for="">Введите имя</label>
                                    <div class="well">
                                        <input v-model="username" class="input-well" type="text" placeholder="Введите имя">
                                    </div>
                                    <label style="font-size: 16px; color: #8d8d8d; padding: 8px 0; display: flex;"
                                        for="">Введите номер телефона</label>
                                    <label style="font-size: 12px; color: #8d8d8d; padding: 3px 0; display: flex;"
                                        for="">Наш
                                        менеджер Вам перезвонит</label>
                                    <div class="well">
                                        <input v-model="phone" class="input-well" type="number" placeholder="xxx-xxx-xxx">
                                    </div>
                                    <button type="submit" class="input-submit-btn-orange">Записаться</button>
                                    <span style="color: #8d8d8d" class="span-submit">Нажимая на кнопку, Вы принимаете <a
                                            style="text-decoration: underline orange; color: #8d8d8d;"
                                            href="#">Положение</a> и
                                        <a style="text-decoration: underline orange; color: #8d8d8d;" href="#">Согласие</a>
                                        на
                                        обработку
                                        персональных
                                        данных.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="mask"></div>
    </div>
    <!-- </main> -->
</template>


<style>
.headerimg {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(https://kartinkin.net/uploads/posts/2021-07/1625503646_33-kartinkin-com-p-fon-dlya-avtomoiki-krasivie-foni-35.jpg);
    background-size: cover;
}

.container-headerimg-blur {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    z-index: 0;
}

.container-headerimg-info {
    z-index: 2;
}

.container-headerimg {
    color: #fff;
}


.btn-info-headerimg {
    font-size: calc(var(--sizeindexlitle));
    padding: 0 65px;
    text-align: center;
}

.a-headerimg {
    color: #fff;
    text-decoration: underline orange;

}

.a-headerimg:hover {
    color: orange;
}

:root {
    --sizeindexheader: calc(2.5vw + 2.5vh);
    --sizeindexparagraf: calc(1.2vw + 1.2vh);
    --sizeindexlitle: calc(1px + 1vh);
    --sizeindexnormal: calc(1vw + 1vh);
    --sizeindexmedium: calc(1.4vw + 1.4vh)
}

h1 {
    line-height: 30px;
    font-weight: normal;
    font-size: calc(var(--sizeindexheader));
    padding: 10px 0 0 0;

}

.header3-headerimg {
    padding: 24px;
}

#p-headerimg-h3 {
    font-size: calc(var(--sizeindexparagraf));
    display: flex;
    justify-content: center;
}

.group-btn-header-headerimg {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 20px;

}

.btn-headerimg {
    display: inline;
    margin: 12px;
    background-color: #fff;
    padding: 20px 70px;

}

.btn-headerimg-orange {
    display: inline;
    margin: 8px;
    color: #fff;
    font-size: 18px;
    background-color: #eeb720;
    padding: 15px 60px;
    border: none;
}

.btn-headerimg-orange:hover {
    cursor: pointer;
    transition: all 500ms;
    color: #cccccc;
    background-color: #af7d21;

}

.text-headerimg {
    text-align: center;
}

.container-infocompany {
    padding: 40px;
    transform: calc(var(--sizeindexnormal));
}

.text-infocompany {
    color: #a7a7a7;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header2-infocompany {
    color: #5f5f5f;
    font-size: calc(var(--sizeindexmedium));
    display: flex;
    justify-content: center;
    align-items: center;
}

.group-img-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.img-info {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    width: 240px;
    padding: 20px;
    margin: 16px;
    height: 100%;
}

.img-info h2 {
    color: #5f5f5f;
}

.img-info span {
    color: #a7a7a7;
}

.container-service {
    background-color: #e0e0e0d7;
}

.service-span span {
    font-size: calc(var(--sizeindexparagraf));
    color: #acacac;
    display: flex;
    justify-content: center;
    padding: 20px;
}

.service-header {
    font-size: calc(var(--sizeindexnormal));
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333;
}

.section-service {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

section {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    margin: 16px;
    height: 100%;
    transition: all 500ms;
    /* display: flex;
    flex-wrap: wrap; */
}

section:hover {
    transform: scale(108%);
    cursor: pointer;
}

.padding-at-img {
    padding: 6px 0;
}

section img {
    width: 100%;
}

.info-service span {
    color: #5f5f5f;
    font-weight: bold;
}

.info-service h3 {
    color: #8d8d8d;
}

.info-service p {
    color: #a7a7a7;
}

@media (max-width: 900px) {
    .info-service span {
        color: #5f5f5f;
        font-weight: bold;
        font-size: calc(var(--sizeindexnormal));
    }

    .info-service h3 {
        color: #8d8d8d;
        font-size: calc(var(--sizeindexnormal));
    }

    .info-service p {
        color: #a7a7a7;
        font-size: calc(var(--sizeindexnormal));
        ;
    }
}

.conatiner-info-succes {
    background-color: #fff;
}

.succes-textinfo {
    text-align: center;
}

.succes-textinfo-span {
    color: #8d8d8d;
    padding: 30px 0 0 0;
    font-size: calc(var(--sizeindexparagraf));
}

.succes-textinfo-h2 {
    color: #333333;
    font-size: calc(var(--sizeindexmedium));
    padding: 0 0 30px 0;
}

.succes-info-img-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.img-succes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    width: 240px;
    padding: 20px;
    margin: 16px;
    height: 100%;
}

.container-learn-parallax {
    background-image: url(https://kartinkin.net/uploads/posts/2021-07/1625503646_33-kartinkin-com-p-fon-dlya-avtomoiki-krasivie-foni-35.jpg);
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

@media (max-width: 700px) {
    .learn-infotext-header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }

    .container-learn-parallax {
        background-image: url(https://kartinkin.net/uploads/posts/2021-07/1625503646_33-kartinkin-com-p-fon-dlya-avtomoiki-krasivie-foni-35.jpg);
        height: 1200px;
        background-attachment: fixed;
        display: flex;
        justify-content: center;
        color: #333333;
        font-size: 60px;
        align-items: center;
        position: relative;
    }

    .item-infotext {
        display: flex;
    }
}



.under-header-learn-text {
    color: #a8a8a8;
}

.header-learn-text span {
    font-size: calc(var(--sizeindexheader));
    text-align: start;
    color: #333333;
}

.header-learn-text p {
    font-size: calc(var(--sizeindexnormal));
    padding: 20px 0 0 0;
    color: #a8a8a8;
}

.input-learn-well {
    background-color: #fff;
    border: 4px solid #c0cdda;
    margin: 30px 14px;
    padding: 20px;
    height: 40px 0px;
}

.input-learn-well p {
    color: #727272;
    font-size: calc(var(--sizeindexnormal));
    text-align: center;
}

@media (max-width: 700px) {
    .input-learn-well {
        background-color: #fff;
        border: 4px solid #c0cdda;
        margin: 60px 120px;
        padding: 20px;
        height: 40px 0px;
    }

    .header-learn-text span {
        font-size: calc(var(--sizeindexheader));
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333333;
    }

    .header-learn-text p {
        text-align: center;
        font-size: calc(var(--sizeindexmedium));
        padding: 20px 0 0 0;
        color: #a8a8a8;
    }

    .under-header-learn-text {
        color: #a8a8a8;
        text-align: center;
    }
}

@media (max-width: 1200px) {
    .item {
        height: 100%;
        font-size: 20px;
        padding: 400px;
    }
}

.item {
    height: 100%;
    font-size: 20px;
    padding: 0 16px;
}

.input-well {
    border: 1px solid #b9c4cf;
    border-radius: 4px;
    padding: 16px 10px;
    background-color: #c0cdda7e;
    width: 100%;
    font-size: 16px;
}

.well {
    padding: 0 20px 0 0;
}

.input-submit-btn-orange {
    margin: 22px 0 7px 0;
    color: #fff;
    font-size: 18px;
    background-color: #eeb720;
    padding: 15px 60px;
    border: none;
    width: 100%;
}

.input-submit-btn-orange:hover {
    cursor: pointer;
    transition: all 500ms;
    color: #cccccc;
    background-color: #af7d21;
}

.span-submit {
    font-size: calc(var(--sizeindexlitle));
}
</style>