<template>
	<div class="w-full">
		<h1 class="title">
			Список користувачів
		</h1>
		<div class="p-6">
			<div class="pb-4 flex items-start gap-2 text-orange-700">
				<span class="material-symbols-outlined">
					info
				</span>
				<span>
					"Обрання" користувача означає, що наступні дії ви будете робити від його імені, Ви можете змінити користувача в будь який момент
				</span>
			</div>
			<div class="users-list">
				<UserCard v-for="user in users" :user="user" class="basis-[200px]" @user-selected="onUserSelect"/>
			</div>
			<Pagination v-if="totalPages>1" :pages="totalPages" v-model="currentPage" class="mx-auto w-fit "/>
		</div>
		<Loader class="fixed top-0 left-0 bottom-0 right-0 bg-black/40" v-if="isLoading"/>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import {useAsyncData, useRoute, useRouter, useRuntimeConfig} from 'nuxt/app';
import UserCard from "../../../components/UserCard.vue";
import Pagination from "../../../components/Pagination.vue";
import {useUserStore} from "../../../stores/userStore.js";
import Loader from "../../../components/Loader.vue";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

//data
const config = useRuntimeConfig();
const currentPage = ref(undefined);
const limit = ref(10)

currentPage.value = parseInt(route.params.page, 10) ?? 1;

const { data, pending: isLoading, refreshUserList } = useAsyncData(
	() => {
		const url = `${config.public.BASE_URL}/user/list`;
		const params = { page: currentPage.value, limit: limit };
		return $fetch(url, { params });
	}
);


//methods
const getUsers = async () => {
	await refreshUserList();
};

const onUserSelect = (user)=>{
	userStore.setSelectedUser(user);
	router.push({name : "user-id", params : {id : user.id}})
}

//computed
const usersCount = computed(() => {
	return data.value?.totalRecords || 0;
});
const totalPages = computed(() => {
	return Math.ceil(data.value?.totalRecords/limit.value);
});


const users = computed(()=>{
	return data.value?.users;
})

//watch
watch(currentPage, (newPage) => {
	router.replace({ name: route.name, params: { ...route.params, page : newPage } });
	getUsers(newPage);
});


onMounted(() => {
	if (!route.params.page) {
		router.replace({ name: route.name, params: { page : 1 } });
	}
});

</script>

<style scoped>

.users-list{
	@apply flex flex-wrap gap-6 mb-6;
}

</style>
