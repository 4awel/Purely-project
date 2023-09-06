<script>

// Компоненты
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { RouterView } from 'vue-router';

// Главная страница
export default {
	data() {
		return {
			
		}
	},
	components: {
		AppHeader,
		AppFooter,
		RouterView
	}
};


</script>

<template>
	<div class="app" id="main">
		<!-- Шапка -->
		<app-header></app-header>

		<!-- Меняющаяся часть -->
		<router-view></router-view>
		
		<!-- Подвал -->
		<app-footer></app-footer>
	</div>
</template>

<style>

</style>
